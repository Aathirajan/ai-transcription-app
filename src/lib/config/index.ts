import { config as developmentConfig } from './development';
import { config as stagingConfig } from './staging';
import { config as productionConfig } from './production';

// Environment-aware config export
const env = process.env.NODE_ENV || 'development';

const configs = {
  development: developmentConfig,
  staging: stagingConfig,
  production: productionConfig,
};

export const config = configs[env as keyof typeof configs] || developmentConfig;

export type Config = typeof developmentConfig;
