import { redisClient } from '../utils/redisClient';

const RATE_LIMIT = 100;
const WINDOW_SECONDS = 60;

export const checkRateLimit = async (identifier: string, resource: string) => {
  const key = `rate:${identifier}:${resource}`;
  
  const count = await redisClient.incr(key);

  if (count === 1) {
    await redisClient.expire(key, WINDOW_SECONDS);
  }

  if (count > RATE_LIMIT) {
    const ttl = await redisClient.ttl(key);
    return {
      allowed: false,
      retryAfterSeconds: ttl > 0 ? ttl : WINDOW_SECONDS,
    };
  }

  return {
    allowed: true,
    remaining: RATE_LIMIT - count,
    limit: RATE_LIMIT,
    windowSeconds: WINDOW_SECONDS,
  };
};
