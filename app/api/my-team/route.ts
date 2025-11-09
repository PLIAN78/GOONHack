import { NextResponse } from 'next/server';
import { myTeam } from '@/data/founders';

export async function GET() {
  try {
    return NextResponse.json(myTeam);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 });
  }
}