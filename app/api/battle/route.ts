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

    if (!Array.isArray(draftedTeam) || draftedTeam.length === 0) {
      return NextResponse.json(
        { error: "draftedTeam is required and must be a non-empty array" },
        { status: 400 }
      );
    }

    const userPrompt = `
You are simulating a week-long LinkedIn fantasy founder battle. Generate realistic LinkedIn activities and engagement data for a matchup.

Player's Team:
${draftedTeam.map((f) => `${f.id}: ${f.name} (${f.company})`).join(", ")}

Generate:
1. 15-25 realistic LinkedIn activities for the week (posts, comments, funding announcements, media features, milestones)
2. Engagement metrics (likes, comments, shares)
3. Point values for each activity
4. Final stats for each founder
5, make sure both team have a chance to win.

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

    // 🔽🔽🔽 POST-PROCESSING: make opponent win sometimes 🔽🔽🔽

    if (Array.isArray(data.founderStats)) {
      const founderStats = data.founderStats as {
        founderId: number;
        totalPoints: number;
        activities: number;
        topPerformance: string;
      }[];

      const isPlayerFounder = (id: number) =>
        draftedTeam.some((f) => f.id === id);

      const playerScore = founderStats
        .filter((s) => isPlayerFounder(s.founderId))
        .reduce((sum, s) => sum + (Number(s.totalPoints) || 0), 0);

      const opponentScore = founderStats
        .filter((s) => !isPlayerFounder(s.founderId))
        .reduce((sum, s) => sum + (Number(s.totalPoints) || 0), 0);

      // Decide desired outcome for this simulation
      // ~35% player win, ~35% opponent win, ~30% natural
      const r = Math.random();
      let target: "player" | "opponent" | "natural" = "natural";
      if (r < 0.35) target = "player";
      else if (r < 0.70) target = "opponent";
      else target = "natural";

      const boostSide = (
        side: "player" | "opponent",
        currentPlayerScore: number,
        currentOpponentScore: number
      ) => {
        const playerWinning = currentPlayerScore > currentOpponentScore;
        const opponentWinning = currentOpponentScore > currentPlayerScore;

        if (
          (side === "opponent" && opponentWinning) ||
          (side === "player" && playerWinning)
        ) {
          // already in desired state
          return;
        }

        const diff =
          side === "opponent"
            ? currentPlayerScore - currentOpponentScore
            : currentOpponentScore - currentPlayerScore;

        const targetExtra = diff + 50; // win by ~50 pts margin
        const targets = founderStats.filter((s) =>
          side === "player"
            ? isPlayerFounder(s.founderId)
            : !isPlayerFounder(s.founderId)
        );

        if (targets.length === 0) return;

        const perFounderBoost = Math.ceil(targetExtra / targets.length);

        for (const s of targets) {
          s.totalPoints = (Number(s.totalPoints) || 0) + perFounderBoost;
        }
      };

      if (target === "opponent") {
        boostSide("opponent", playerScore, opponentScore);
      } else if (target === "player") {
        boostSide("player", playerScore, opponentScore);
      }
      // if target === "natural", do nothing
    }

    // 🔼🔼🔼 END POST-PROCESSING 🔼🔼🔼

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in /api/battle:", error);
    return NextResponse.json(
      { error: "Server error in /api/battle", message: error.message },
      { status: 500 }
    );
  }
}
