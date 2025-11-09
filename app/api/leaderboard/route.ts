import { NextResponse } from 'next/server';

// Mock leaderboard data (replace with database later)
const mockLeaderboard = [
  { rank: 1, username: "FounderFan2024", teamName: "Silicon Valley Elite", wins: 8, losses: 1, points: 2150 },
  { rank: 2, username: "TechTitan", teamName: "Unicorn Hunters", wins: 7, losses: 2, points: 2040 },
  { rank: 3, username: "VCViking", teamName: "Portfolio Winners", wins: 7, losses: 2, points: 1980 },
  { rank: 4, username: "StartupStar", teamName: "The Disruptors", wins: 6, losses: 3, points: 1875 },
  { rank: 5, username: "InnovatorX", teamName: "Growth Hackers", wins: 6, losses: 3, points: 1820 },
];

export async function GET() {
  try {
    return NextResponse.json(mockLeaderboard);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}