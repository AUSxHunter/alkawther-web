import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin-session";
import { getAvailabilityOverrides, setAvailabilityOverrides } from "@/lib/admin-store";

const availabilitySchema = z.record(
  z.enum(["available", "limited", "enquire", "out-of-stock"])
);

async function requireAuth() {
  const session = await getAdminSession();
  if (!session.isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const deny = await requireAuth();
  if (deny) return deny;

  const overrides = await getAvailabilityOverrides();
  return NextResponse.json(overrides);
}

export async function POST(req: NextRequest) {
  const deny = await requireAuth();
  if (deny) return deny;

  const body = await req.json().catch(() => null);
  const parsed = availabilitySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid availability data" }, { status: 400 });
  }

  await setAvailabilityOverrides(parsed.data);
  return NextResponse.json({ ok: true });
}
