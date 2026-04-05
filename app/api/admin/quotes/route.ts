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

  try {
    await updateQuoteHandled(id, handled);
  } catch (e) {
    console.error("Failed to update quote:", e);
    return NextResponse.json({ error: "Failed to update quote." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
