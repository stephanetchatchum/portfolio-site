import { NextResponse } from "next/server";

// POST /api/cv/generate
// Body: { type: "general" } or { type: "tailored", jobDescription: string }
// 1. Auth check (admin only — this route is never called by public visitors)
// 2. Fetch base_cv + all projects from Supabase
// 3. Call the AI provider to structure/tailor the content
// 4. Save as a new generated_cvs row, return it
export async function POST(request: Request) {
  return NextResponse.json({ error: "Not implemented yet" }, { status: 501 });
}
