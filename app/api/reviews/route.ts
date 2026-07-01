import { NextResponse } from "next/server";

interface ReviewPayload {
  authorName?: string;
  rating?: number;
  comment?: string;
  packId?: string;
  locale?: string;
}

// Stockage en mémoire pour le MVP — en production, les avis passent par la file
// de modération du CMS (moderation_status) avant publication (§3 du blueprint).
const pendingReviews: (ReviewPayload & { id: string; createdAt: string })[] = [];

export async function POST(request: Request) {
  const payload = (await request.json()) as ReviewPayload;

  if (!payload.authorName || !payload.rating || !payload.comment) {
    return NextResponse.json({ error: "authorName, rating and comment are required" }, { status: 400 });
  }

  const record = {
    ...payload,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  pendingReviews.push(record);

  return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
}

export async function GET() {
  return NextResponse.json({ count: pendingReviews.length, reviews: pendingReviews });
}
