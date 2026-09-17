import { NextResponse } from "next/server";

// GET /api/cv/download
// Public route. Rate-limited by hashed IP (see cv_downloads table) plus
// a global daily cap, per the agreed abuse-prevention plan.
export async function GET(request: Request) {
  return NextResponse.json({ error: "Not implemented yet" }, { status: 501 });
}
