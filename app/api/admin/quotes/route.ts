import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { getQuotes, updateQuoteHandled } from "@/lib/admin-store";

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

  return NextResponse.json(await getQuotes());
}

export async function PATCH(req: NextRequest) {
  const deny = await requireAuth();
  if (deny) return deny;

  const { id, handled } = await req.json().catch(() => ({}));
  if (typeof id !== "string" || typeof handled !== "boolean") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  await updateQuoteHandled(id, handled);
  return NextResponse.json({ ok: true });
}
