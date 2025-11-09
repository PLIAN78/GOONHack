import { NextResponse } from "next/server";

const waiverWire = [
  {
    id: 6,
    name: "Brian Chesky",
    company: "Airbnb",
    position: "RB",
    followers: "1.2M",
    engagement: 8.7,
    points: 130,
    image: "https://via.placeholder.com/150",
    linkedinUrl: "#",
  },
  {
    id: 7,
    name: "Whitney Wolfe Herd",
    company: "Bumble",
    position: "WR",
    followers: "900K",
    engagement: 9.1,
    points: 125,
    image: "https://via.placeholder.com/150",
    linkedinUrl: "#",
  },
  {
    id: 8,
    name: "Patrick Collison",
    company: "Stripe",
    position: "QB",
    followers: "750K",
    engagement: 8.9,
    points: 135,
    image: "https://via.placeholder.com/150",
    linkedinUrl: "#",
  },
];

export async function GET() {
  return NextResponse.json(waiverWire);
}
