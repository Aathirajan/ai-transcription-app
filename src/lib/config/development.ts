// Development environment configuration
// Use this file for local development overrides

export const config = {
  env: 'development',
  isDev: true,
  isProd: false,

  // API
  apiUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',

  // Rate limiting (more relaxed for dev)
  rateLimit: {
    windowMs: 60 * 1000, // 1 minute
    max: 10, // 10 requests per window in dev
  },

  // Features
  features: {
    adsEnabled: true,
    analyticsEnabled: false,
  },

  // Debug
  debug: {
    logRequests: true,
    logErrors: true,
  },
};
