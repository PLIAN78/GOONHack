import { NextResponse } from 'next/server';
import { waiverWire } from '@/data/founders';

export async function GET() {
  try {
    return NextResponse.json(waiverWire);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch waiver wire' }, { status: 500 });
  }
}