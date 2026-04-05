import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { checkRateLimit, clearRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!(await checkRateLimit(ip))) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in 15 minutes." },
      { status: 429 }
    );
  }

  const { password } = await req.json().catch(() => ({ password: "" }));

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { error: "Admin not configured." },
      { status: 500 }
    );
  }

  // Constant-time comparison to prevent timing attacks
  const encoder = new TextEncoder();
  const a = encoder.encode(password);
  const b = encoder.encode(adminPassword);
  const lengthsMatch = a.length === b.length;
  const padded = lengthsMatch ? b : encoder.encode(adminPassword.padEnd(password.length, "\0"));
  let equal = lengthsMatch;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== padded[i]) equal = false;
  }

  if (!equal) {
    return NextResponse.json(
      { error: "Incorrect password." },
      { status: 401 }
    );
  }

  await clearRateLimit(ip);

  const session = await getAdminSession();
  session.isAuthenticated = true;
  await session.save();

  return NextResponse.json({ ok: true });
}
