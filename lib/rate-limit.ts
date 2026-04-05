import { kv } from "@vercel/kv";

const MAX_ATTEMPTS = 5;
const WINDOW_SECS = 15 * 60; // 15 minutes

/** Returns true if the request is allowed, false if rate-limited. */
export async function checkRateLimit(ip: string): Promise<boolean> {
  const key = `rate-limit:${ip}`;
  const count = await kv.incr(key);
  if (count === 1) {
    await kv.expire(key, WINDOW_SECS);
  }
  return count <= MAX_ATTEMPTS;
}

export async function clearRateLimit(ip: string): Promise<void> {
  await kv.del(`rate-limit:${ip}`);
}
