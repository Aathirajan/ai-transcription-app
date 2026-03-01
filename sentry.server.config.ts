// This file configures the initialization of Sentry for error reporting
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
  tracesSampleRate: 1.0,

  // Enable debug mode in development
  debug: process.env.NODE_ENV === "development",

  // Environment
  environment: process.env.NODE_ENV,

  // Ignore certain errors
  ignoreErrors: [
    "NetworkError when attempting to fetch resource.",
    "Failed to fetch",
  ],

  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,

  // Integrate with Next.js
  integrations: [
    Sentry.httpIntegration(),
  ],
});
