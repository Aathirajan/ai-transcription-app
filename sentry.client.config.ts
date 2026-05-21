// This file configures the initialization of Sentry for error reporting
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,

  // Enable debug mode in development
  debug: process.env.NODE_ENV === "development",

  // Environment
  environment: process.env.NODE_ENV,

  // Ignore certain errors
  ignoreErrors: [
    "NetworkError when attempting to fetch resource.",
    "Failed to fetch",
    "ChunkLoadError",
    "Loading chunk",
  ],

  // Filter out certain events
  beforeSend(event, hint) {
    // Filter out 404s for static assets
    const error = hint.originalException;
    if (error && typeof error === 'object' && 'message' in error) {
      const errorMessage = (error as { message: string }).message;
      if (errorMessage.includes("404")) {
        return null;
      }
    }
    return event;
  },

  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,

  // Replay settings
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,

  // Integrate with Next.js
  integrations: [
    Sentry.replayIntegration(),
    Sentry.browserTracingIntegration(),
  ],
});
