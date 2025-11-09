// app/api/my-team/route.ts
import { NextResponse } from "next/server";
import { myTeam } from "@/data/founders";

export async function GET() {
  return NextResponse.json(myTeam);
}
