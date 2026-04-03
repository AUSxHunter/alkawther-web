import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { getAvailabilityOverrides, setAvailabilityOverrides } from "@/lib/admin-store";

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
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  await setAvailabilityOverrides(body);
  return NextResponse.json({ ok: true });
}
