import { NextResponse } from "next/server";

interface ContactRequestPayload {
  type?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  preferredContact?: string;
  message?: string;
  budgetRange?: string;
  travelDatesHint?: string;
  packId?: string;
  locale?: string;
  sourcePage?: string;
}

// Stockage en mémoire pour le MVP — à remplacer par le CMS/base de données (§4 du blueprint)
// et le déclenchement des notifications email/WhatsApp décrit dans la spec.
const contactRequests: (ContactRequestPayload & { id: string; createdAt: string })[] = [];

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactRequestPayload;

  if (!payload.fullName || !payload.phone) {
    return NextResponse.json({ error: "fullName and phone are required" }, { status: 400 });
  }

  const record = {
    ...payload,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  contactRequests.push(record);

  return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
}

export async function GET() {
  return NextResponse.json({ count: contactRequests.length, requests: contactRequests });
}
