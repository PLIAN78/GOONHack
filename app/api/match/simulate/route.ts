import { NextResponse } from 'next/server';

type Founder = {
  id: number;
  name: string;
  company: string;
  position: string;
  followers: string;
  engagement: number;
  points: number;
  image: string;
  linkedinUrl: string;
};

type SimulateMatchRequest = {
  playerTeam: Founder[];
  week: number;
};

export async function POST(request: Request) {
  try {
    const { playerTeam, week }: SimulateMatchRequest = await request.json();

    if (!playerTeam || playerTeam.length !== 8) {
      return NextResponse.json(
        { error: 'Player team must have exactly 8 founders' },
        { status: 400 }
      );
    }

    // Generate opponent team (you can customize this logic)
    const { myTeam, waiverWire } = await import('@/data/founders');
    const allFounders = [...myTeam, ...waiverWire];
    const playerFounderIds = playerTeam.map(f => f.id);
    const availableFounders = allFounders.filter(f => !playerFounderIds.includes(f.id));
    
    // Randomly select 8 opponents
    const shuffled = availableFounders.sort(() => 0.5 - Math.random());
    const opponentTeam = shuffled.slice(0, 8);

    // Call Claude API to generate battle activities
    const allBattleFounders = [...playerTeam, ...opponentTeam];
    
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [
          {
            role: "user",
            content: `You are simulating a week-long LinkedIn fantasy founder battle for Week ${week}.

Player's Team: ${playerTeam.map(f => `${f.name} (${f.company})`).join(', ')}
Opponent's Team: ${opponentTeam.map(f => `${f.name} (${f.company})`).join(', ')}

Generate realistic LinkedIn activities for the week. Include:
- Posts with engagement (likes, comments, shares)
- Comments on others' posts
- Funding announcements
- Media mentions
- Company milestones

Point values should be based on:
- Post engagement: 1 point per 1000 likes
- Viral post (>100K engagement): +50 bonus
- Major announcement: +100 points
- Media feature: +25 points

Return ONLY valid JSON (no markdown, no preamble):
{
  "activities": [
    {
      "founderId": 1,
      "founderName": "Elon Musk",
      "type": "post",
      "description": "Shared updates on SpaceX Starship development",
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
      "topPerformance": "Viral post about Mars mission updates"
    }
  ]
}

Generate 20-30 realistic activities with engagement proportional to each founder's follower count.`
          }
        ],
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const contentText = data.content.find((c: any) => c.type === 'text')?.text || '';
    
    // Clean JSON response
    let cleanJson = contentText.trim();
    cleanJson = cleanJson.replace(/```json\n?|\n?```/g, '');
    cleanJson = cleanJson.replace(/^[^{]*/, ''); // Remove any text before first {
    cleanJson = cleanJson.replace(/[^}]*$/, ''); // Remove any text after last }
    
    const battleData = JSON.parse(cleanJson);

    // Calculate scores
    const playerFounderIdsSet = new Set(playerFounderIds);
    
    const playerScore = battleData.founderStats
      .filter((s: any) => playerFounderIdsSet.has(s.founderId))
      .reduce((sum: number, s: any) => sum + s.totalPoints, 0);

    const opponentScore = battleData.founderStats
      .filter((s: any) => !playerFounderIdsSet.has(s.founderId))
      .reduce((sum: number, s: any) => sum + s.totalPoints, 0);

    const winner = playerScore > opponentScore ? 'player' : 
                   opponentScore > playerScore ? 'opponent' : 'tie';

    // Return match results
    return NextResponse.json({
      matchId: `match_${Date.now()}`,
      week,
      playerTeam,
      opponentTeam,
      playerScore,
      opponentScore,
      winner,
      activities: battleData.activities,
      founderStats: battleData.founderStats,
      createdAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Match simulation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to simulate match',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
