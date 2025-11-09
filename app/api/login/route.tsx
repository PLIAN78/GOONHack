// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { createClient } from "@supabase/supabase-js";

// // Create Supabase client
// const supabase = createClient(
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_KEY!
// );

// const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { email, password } = body;

//     if (!email || !password) {
//       return NextResponse.json(
//         { error: "Email and password are required." },
//         { status: 400 }
//       );
//     }

//     // Look up the user in Supabase
//     const { data: user, error } = await supabase
//       .from("player_userdata")
//       .select("*")
//       .eq("email", email)
//       .single();

//     if (error || !user) {
//       return NextResponse.json(
//         { message: "Invalid credentials." },
//         { status: 401 }
//       );
//     }

//     // Compare hashed passwords
//     const isMatch = await bcrypt.compare(password, user.password_hash);
//     if (!isMatch) {
//       return NextResponse.json(
//         { message: "Invalid credentials." },
//         { status: 401 }
//       );
//     }

//     // Create a JWT token
//     const token = jwt.sign({ userId: user.Id_serial }, JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     // Return success with token
//     return NextResponse.json({
//       message: "Login successful",
//       token,
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     return NextResponse.json(
//       { error: "Internal server error." },
//       { status: 500 }
//     );
//   }
// }
