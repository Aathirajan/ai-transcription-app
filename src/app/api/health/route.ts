import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";

export const dynamic = "force-dynamic";

interface ServiceStatus {
  status: "healthy" | "unhealthy" | "degraded";
  latency?: number;
  message?: string;
}

export async function GET() {
  const startTime = Date.now();
  const services: Record<string, ServiceStatus> = {};
  let overallStatus: "ok" | "degraded" | "error" = "ok";

  // Check database
  try {
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    services.database = {
      status: "healthy",
      latency: Date.now() - dbStart,
    };
  } catch (error) {
    services.database = {
      status: "unhealthy",
      message: error instanceof Error ? error.message : "Database connection failed",
    };
    overallStatus = "error";
  }

  // Check Redis (if configured)
  if (process.env.REDIS_URL) {
    try {
      const redisStart = Date.now();
      if (redis) {
        await redis.ping();
        services.redis = {
          status: "healthy",
          latency: Date.now() - redisStart,
        };
      } else {
        services.redis = {
          status: "unhealthy",
          message: "Redis client not initialized",
        };
        overallStatus = "degraded";
      }
    } catch (error) {
      services.redis = {
        status: "unhealthy",
        message: error instanceof Error ? error.message : "Redis connection failed",
      };
      overallStatus = "degraded";
    }
  } else {
    services.redis = {
      status: "healthy",
      message: "Not configured (optional)",
    };
  }

  // Check Deepgram (if configured)
  if (process.env.DEEPGRAM_API_KEY) {
    services.deepgram = {
      status: "healthy",
      message: "API key configured",
    };
  } else {
    services.deepgram = {
      status: "degraded",
      message: "API key not configured - transcription will use mock data",
    };
    if (overallStatus === "ok") overallStatus = "degraded";
  }

  // Check Stripe (if configured)
  if (process.env.STRIPE_SECRET_KEY) {
    services.stripe = {
      status: "healthy",
      message: "API key configured",
    };
  } else {
    services.stripe = {
      status: "degraded",
      message: "API key not configured - payments disabled",
    };
  }

  // Check AdSense (if configured)
  if (process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID) {
    services.adsense = {
      status: "healthy",
      message: "Client ID configured",
    };
  } else {
    services.adsense = {
      status: "degraded",
      message: "Client ID not configured - ads disabled",
    };
  }

  const response = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    uptime: process.uptime?.() || 0,
    latency: Date.now() - startTime,
    services,
    environment: process.env.NODE_ENV || "development",
  };

  const statusCode = overallStatus === "ok" ? 200 : overallStatus === "degraded" ? 200 : 503;

  return NextResponse.json(response, { status: statusCode });
}
