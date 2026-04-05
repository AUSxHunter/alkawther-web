import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { getQuotes, updateQuoteHandled, updateQuoteTrashed, deleteQuote } from "@/lib/admin-store";

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

  const body = await req.json().catch(() => ({}));
  const { id } = body;
  if (typeof id !== "string") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  try {
    if (typeof body.handled === "boolean") {
      await updateQuoteHandled(id, body.handled);
    } else if (typeof body.trashed === "boolean") {
      await updateQuoteTrashed(id, body.trashed);
    } else {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }
  } catch (e) {
    console.error("Failed to update quote:", e);
    return NextResponse.json({ error: "Failed to update quote." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const deny = await requireAuth();
  if (deny) return deny;

  const { id } = await req.json().catch(() => ({}));
  if (typeof id !== "string") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  try {
    await deleteQuote(id);
  } catch (e) {
    console.error("Failed to delete quote:", e);
    return NextResponse.json({ error: "Failed to delete quote." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
