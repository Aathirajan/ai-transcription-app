import Redis from 'ioredis';

// Singleton Redis client
const getRedisClient = () => {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    console.warn('REDIS_URL not configured, using in-memory rate limiting');
    return null;
  }

  const redis = new Redis(redisUrl, {
    maxRetriesPerRequest: 3,
    retryStrategy: (times) => {
      if (times > 3) {
        console.error('Redis connection failed after 3 retries');
        return null;
      }
      return Math.min(times * 100, 3000);
    },
    reconnectOnError: (err) => {
      console.error('Redis reconnect on error:', err);
      return true;
    },
  });

  redis.on('connect', () => {
    console.log('Connected to Redis');
  });

  redis.on('error', (err) => {
    console.error('Redis error:', err);
  });

  return redis;
};

export const redis = getRedisClient();

// Rate limiter using Redis
export const checkRateLimit = async (
  key: string,
  limit: number = 5,
  windowSeconds: number = 60
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> => {
  if (!redis) {
    // Fallback to in-memory rate limiting
    return checkInMemoryRateLimit(key, limit, windowSeconds);
  }

  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const redisKey = `ratelimit:${key}`;

  try {
    const [current, resetAt] = await Promise.all([
      redis.get(redisKey),
      redis.get(`${redisKey}:reset`),
    ]);

    if (!current) {
      // First request in window
      await Promise.all([
        redis.set(redisKey, '1', 'EX', windowSeconds),
        redis.set(`${redisKey}:reset`, String(now + windowMs), 'EX', windowSeconds),
      ]);

      return {
        allowed: true,
        remaining: limit - 1,
        resetAt: now + windowMs,
      };
    }

    const count = parseInt(current, 10);

    if (count >= limit) {
      // Rate limited
      const reset = resetAt ? parseInt(resetAt, 10) : now + windowMs;
      return {
        allowed: false,
        remaining: 0,
        resetAt: reset,
      };
    }

    // Increment counter
    await redis.incr(redisKey);

    return {
      allowed: true,
      remaining: limit - count - 1,
      resetAt: resetAt ? parseInt(resetAt, 10) : now + windowMs,
    };
  } catch (error) {
    console.error('Redis rate limit error:', error);
    // Fallback to in-memory on error
    return checkInMemoryRateLimit(key, limit, windowSeconds);
  }
};

// In-memory fallback (for development)
const inMemoryRateLimit = new Map<string, { count: number; resetTime: number }>();

const checkInMemoryRateLimit = (
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } => {
  const now = Date.now();
  const record = inMemoryRateLimit.get(key);

  if (!record || now > record.resetTime) {
    inMemoryRateLimit.set(key, { count: 1, resetTime: now + windowMs });
    return {
      allowed: true,
      remaining: limit - 1,
      resetAt: now + windowMs,
    };
  }

  if (record.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.resetTime,
    };
  }

  record.count++;
  return {
    allowed: true,
    remaining: limit - record.count,
    resetAt: record.resetTime,
  };
};
