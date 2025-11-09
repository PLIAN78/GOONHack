import { NextResponse } from "next/server";
import { myTeam } from "@/data/founders";

export async function GET() {
  const teamSize = myTeam.length;
  const totalPoints = myTeam.reduce((sum, f) => sum + f.points, 0);
  const avgEngagement =
    myTeam.reduce((sum, f) => sum + f.engagement, 0) / teamSize;

  // simple leaderboard here too
  const leaderboard = [...myTeam]
    .sort((a, b) => b.points - a.points)
    .map((f, index) => ({
      rank: index + 1,
      ...f,
    }));

  return NextResponse.json({
    teamSize,
    totalPoints,
    avgEngagement: Number(avgEngagement.toFixed(1)),
    leaderboard,
  });
}
