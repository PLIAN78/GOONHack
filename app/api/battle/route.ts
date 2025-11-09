// app/api/battle/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

type Founder = { id: number; name: string; company: string };

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const body = await req.json();
    const draftedTeam: Founder[] = body.draftedTeam;
    const opponentTeam: Founder[] = body.opponentTeam || [];

    if (!Array.isArray(draftedTeam) || draftedTeam.length === 0) {
      return NextResponse.json(
        { error: "draftedTeam is required and must be a non-empty array" },
        { status: 400 }
      );
    }

    const userPrompt = `
You are simulating a week-long LinkedIn fantasy founder battle between two teams.

Player's Team:
${draftedTeam.map((f) => `${f.id}: ${f.name} (${f.company})`).join(", ")}

Opponent Team:
${opponentTeam.map((f) => `${f.id}: ${f.name} (${f.company})`).join(", ")}

Generate:
1. 15-25 realistic LinkedIn activities for the week (posts, comments, funding announcements, media features, milestones)
2. Engagement metrics (likes, comments, shares) for each activity
3. Point values for each activity
4. Final stats for each founder on BOTH teams

Important rules:
- Every founder ID listed above (from both teams) MUST appear exactly once in "founderStats".
- Activities can involve founders from either team.

Return ONLY a JSON object (no markdown, no explanations) in this format:
{
  "activities": [
    {
      "id": "act_1",
      "founderId": 1,
      "founderName": "Elon Musk",
      "type": "post",
      "description": "Shared thoughts on AI safety",
      "points": 45,
      "timestamp": "2025-11-03T10:30:00Z",
      "engagement": { "likes": 45000, "comments": 2300, "shares": 890 }
    }
  ],
  "founderStats": [
    {
      "founderId": 1,
      "totalPoints": 185,
      "activities": 4,
      "topPerformance": "Viral post about Mars mission"
    }
  ]
}
`;

    const result = await model.generateContent(userPrompt);
    const text = result.response.text();

    const cleanJson = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    let data: any;
    try {
      data = JSON.parse(cleanJson);
    } catch (err) {
      console.error("Gemini output parse error:", { raw: text });
      return NextResponse.json(
        {
          error: "Failed to parse JSON from Gemini",
          snippet: text.slice(0, 300),
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in /api/battle:", error);
    return NextResponse.json(
      { error: "Server error in /api/battle", message: error.message },
      { status: 500 }
    );
  }
}
