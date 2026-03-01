// Production environment configuration
// Use this file for production environment

export const config = {
  env: 'production',
  isDev: false,
  isProd: true,

  // API
  apiUrl: process.env.NEXTAUTH_URL || 'https://freetranscriptai.com',

  // Rate limiting (strict for production)
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
    logRequests: false,
    logErrors: true,
  },
};
