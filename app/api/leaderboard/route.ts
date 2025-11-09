import { NextResponse } from "next/server";
import { myTeam } from "@/data/founders";

export async function GET() {
  // sort by points, highest first
  const sorted = [...myTeam].sort((a, b) => b.points - a.points);

  // add rank for each
  const withRank = sorted.map((player, index) => ({
    rank: index + 1,
    ...player,
  }));

  return NextResponse.json(withRank);
}
