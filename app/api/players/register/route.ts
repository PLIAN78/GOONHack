import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

// Helper function to get Supabase client
function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase credentials not configured");
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

export async function POST(req: Request) {
  try {
    // Get Supabase client (will throw if credentials not configured)
    let supabase;
    try {
      supabase = getSupabaseClient();
    } catch (error: any) {
      return NextResponse.json(
        { error: "Server configuration error: Supabase credentials not set. Please configure SUPABASE_URL and SUPABASE_KEY environment variables in .env.local file. See SETUP.md for instructions." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { username, email, password, firstName, lastName } = body;

    // Validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Username, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    if (username.length < 3 || username.length > 100) {
      return NextResponse.json(
        { error: "Username must be between 3 and 100 characters." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUsers, error: checkError } = await supabase
      .from("player_userdata")
      .select("email, username")
      .or(`email.eq.${email},username.eq.${username}`);

    // Handle Supabase connection errors
    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error("Error checking existing user:", checkError);
      return NextResponse.json(
        { error: `Database error: ${checkError.message}. Please check your Supabase configuration.` },
        { status: 500 }
      );
    }

    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json(
        { error: "User with this email or username already exists." },
        { status: 409 }
      );
    }

    // Hash the password
    const password_hash = await bcrypt.hash(password, 10);

    // Insert new user into Supabase
    const { data: newUser, error: insertError } = await supabase
      .from("player_userdata")
      .insert({
        username,
        email,
        password_hash,
        first_name: firstName || null,
        last_name: lastName || null,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error("Registration insert error:", insertError);
      // Provide more helpful error messages
      if (insertError.code === '23505') {
        return NextResponse.json(
          { error: "User with this email or username already exists." },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: `Failed to create user: ${insertError.message}. Please check your Supabase table structure.` },
        { status: 500 }
      );
    }

    // Create a JWT token
    const token = jwt.sign({ userId: newUser.Id_serial }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return success with token
    return NextResponse.json({
      message: "Registration successful",
      token,
      user: {
        id: newUser.Id_serial,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err: any) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error. Please check the server logs." },
      { status: 500 }
    );
  }
}

