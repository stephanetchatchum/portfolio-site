import { NextResponse } from "next/server";

// POST /api/upload
// Admin only. Uploads an image to Supabase Storage and returns its public URL
// for use inside the Tiptap editor.
export async function POST(request: Request) {
  return NextResponse.json({ error: "Not implemented yet" }, { status: 501 });
}
