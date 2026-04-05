import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  isAuthenticated?: boolean;
}

export const sessionOptions = {
  get password() {
    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!secret) throw new Error("ADMIN_SESSION_SECRET environment variable is not set.");
    return secret;
  },
  cookieName: "alkawther-admin",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict" as const,
    maxAge: 60 * 60 * 8, // 8 hours
  },
};

export async function getAdminSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}
