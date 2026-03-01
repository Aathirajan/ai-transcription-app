// This file configures Sentry for Edge/Runtime environments
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  tracesSampleRate: 1.0,
  debug: process.env.NODE_ENV === "development",
  environment: process.env.NODE_ENV,
});
