// Simple logger utility - use console for now
export const logger = {
  error: (msg: string, meta?: Record<string, unknown>) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`, meta || '');
  },
  warn: (msg: string, meta?: Record<string, unknown>) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${msg}`, meta || '');
  },
  info: (msg: string, meta?: Record<string, unknown>) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${msg}`, meta || '');
  },
  debug: (msg: string, meta?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${msg}`, meta || '');
    }
  },
};
