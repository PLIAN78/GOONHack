import { NextResponse } from "next/server";
import { waiverWire } from "@/data/founders";

export async function GET() {
  return NextResponse.json(waiverWire);
}
