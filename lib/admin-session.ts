import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  isAuthenticated?: boolean;
}

export const sessionOptions = {
  password: process.env.ADMIN_SESSION_SECRET ?? "fallback-dev-secret-change-in-production-32chars",
  cookieName: "alkawther-admin",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

export async function getAdminSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}
