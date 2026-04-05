import { Redis } from "@upstash/redis";

const MAX_ATTEMPTS = 5;
const WINDOW_SECS = 15 * 60; // 15 minutes

function getRedis() {
  return new Redis({
    url: process.env.UPSTASH_REDIS_KV_REST_API_URL!,
    token: process.env.UPSTASH_REDIS_KV_REST_API_TOKEN!,
  });
}

/** Returns true if the request is allowed, false if rate-limited. */
export async function checkRateLimit(ip: string): Promise<boolean> {
  const redis = getRedis();
  const key = `rate-limit:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, WINDOW_SECS);
  }
  return count <= MAX_ATTEMPTS;
}

export async function clearRateLimit(ip: string): Promise<void> {
  await getRedis().del(`rate-limit:${ip}`);
}
