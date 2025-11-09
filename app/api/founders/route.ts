import { NextResponse } from 'next/server';
import { myTeam, waiverWire } from '@/data/founders';

export async function GET() {
  try {
    // Combine all founders
    const allFounders = [...myTeam, ...waiverWire];
    return NextResponse.json(allFounders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch founders' }, { status: 500 });
  }
}