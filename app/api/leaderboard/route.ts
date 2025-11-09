import { NextResponse } from "next/server";

// For now, reuse the same data as /api/my-team.
// You can copy-paste the same array you used there.
const myTeam = [
  {
    id: 1,
    name: "Elon Musk",
    company: "Tesla, SpaceX",
    position: "QB",
    followers: "150M",
    engagement: 8.5,
    points: 245,
    image: "https://via.placeholder.com/150",
    linkedinUrl: "#",
  },
  {
    id: 2,
    name: "Reid Hoffman",
    company: "LinkedIn, Greylock",
    position: "RB",
    followers: "2.5M",
    engagement: 9.2,
    points: 198,
    image: "https://via.placeholder.com/150",
    linkedinUrl: "#",
  },
  {
    id: 3,
    name: "Sam Altman",
    company: "OpenAI",
    position: "WR",
    followers: "1.8M",
    engagement: 9.8,
    points: 187,
    image: "https://via.placeholder.com/150",
    linkedinUrl: "#",
  },
  {
    id: 4,
    name: "Drew Houston",
    company: "Dropbox",
    position: "TE",
    followers: "850K",
    engagement: 8.1,
    points: 156,
    image: "https://via.placeholder.com/150",
    linkedinUrl: "#",
  },
  {
    id: 5,
    name: "Jensen Huang",
    company: "NVIDIA",
    position: "K",
    followers: "2.1M",
    engagement: 9.5,
    points: 142,
    image: "https://via.placeholder.com/150",
    linkedinUrl: "#",
  },
];

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
