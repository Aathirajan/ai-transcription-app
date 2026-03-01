import Redis from 'ioredis';

// Redis client singleton
let redis: Redis | null = null;

export function getRedis(): Redis | null {
  if (!process.env.REDIS_URL) {
    return null;
  }

  if (!redis) {
    redis = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      retryStrategy: (times) => {
        if (times > 3) {
          console.error('Redis connection failed after 3 retries');
          return null;
        }
        return Math.min(times * 200, 2000);
      },
    });

    redis.on('error', (err) => {
      console.error('Redis error:', err);
    });

    redis.on('connect', () => {
      console.log('Redis connected');
    });
  }

  return redis;
}

// Rate limiter using Redis
export interface RateLimiterOptions {
  key: string;
  limit: number;
  windowMs: number;
}

export async function checkRateLimitRedis(options: RateLimiterOptions): Promise<{
  allowed: boolean;
  remaining: number;
  resetTime: number;
}> {
  const redis = getRedis();

  if (!redis) {
    // Fallback: allow all if Redis is not available
    return {
      allowed: true,
      remaining: options.limit,
      resetTime: Date.now() + options.windowMs,
    };
  }

  const now = Date.now();
  const windowKey = `${options.key}:${Math.floor(now / options.windowMs)}`;
  const resetTime = Math.floor(now / options.windowMs) * options.windowMs + options.windowMs;

  try {
    const current = await redis.incr(windowKey);

    if (current === 1) {
      // Set expiry for new keys
      await redis.expire(windowKey, Math.ceil(options.windowMs / 1000));
    }

    const remaining = Math.max(0, options.limit - current);

    return {
      allowed: current <= options.limit,
      remaining,
      resetTime,
    };
  } catch (error) {
    console.error('Redis rate limit check failed:', error);
    // Fail open - allow request if Redis fails
    return {
      allowed: true,
      remaining: options.limit,
      resetTime,
    };
  }
}

// In-memory rate limiter (fallback for development)
const memoryRateLimitMap = new Map<string, { count: number; resetTime: number }>();
const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW_MS = 60 * 1000; // 1 minute

export function checkRateLimitMemory(ip: string, limit = DEFAULT_LIMIT, windowMs = DEFAULT_WINDOW_MS): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
} {
  const now = Date.now();
  const record = memoryRateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    memoryRateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return {
      allowed: true,
      remaining: limit - 1,
      resetTime: now + windowMs,
    };
  }

  if (record.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  record.count++;
  return {
    allowed: true,
    remaining: limit - record.count,
    resetTime: record.resetTime,
  };
}

// Unified rate limiter that uses Redis in production, memory in development
export async function checkRateLimit(ip: string): Promise<{
  allowed: boolean;
  remaining: number;
  resetTime: number;
}> {
  const redis = getRedis();

  if (redis) {
    return checkRateLimitRedis({
      key: `ratelimit:${ip}`,
      limit: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
    });
  }

  return checkRateLimitMemory(ip);
}

// Cleanup function for graceful shutdown
export async function closeRedis(): Promise<void> {
  if (redis) {
    await redis.quit();
    redis = null;
  }
}
