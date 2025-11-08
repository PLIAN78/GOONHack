export type Founder = {
  id: number;
  name: string;
  company: string;
  position: string;
  followers: string;   // keep as string for UI (e.g. "150M")
  engagement: number;  // 0–10
  points: number;
  image: string;
  linkedinUrl: string;
};

// Your main team (matches frontend structure)
export const myTeam: Founder[] = [
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

// Example "available" founders for waiver wire
export const waiverWire: Founder[] = [
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
];
