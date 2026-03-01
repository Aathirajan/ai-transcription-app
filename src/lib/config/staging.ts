// Staging environment configuration
// Use this file for staging/pre-production environment

export const config = {
  env: 'staging',
  isDev: false,
  isProd: false,

  // API
  apiUrl: process.env.NEXTAUTH_URL || 'https://staging.freetranscriptai.com',

  // Rate limiting (production-like but testable)
  rateLimit: {
    windowMs: 60 * 1000, // 1 minute
    max: 5, // 5 requests per window
  },

  // Features
  features: {
    adsEnabled: true,
    analyticsEnabled: true,
  },

  // Debug
  debug: {
    logRequests: true,
    logErrors: true,
  },
};
