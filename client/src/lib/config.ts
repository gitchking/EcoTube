// Environment configuration for EcoTube frontend
export const config = {
  // API Configuration
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  
  // Environment settings
  isDevelopment: import.meta.env.VITE_NODE_ENV === 'development',
  isProduction: import.meta.env.VITE_NODE_ENV === 'production',
  
  // Feature flags
  enableDebug: import.meta.env.VITE_ENABLE_DEBUG === 'true' || import.meta.env.NODE_ENV === 'development',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  
  // API settings
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 5000,
  apiVersion: import.meta.env.VITE_API_VERSION || 'v1',
} as const;

// Type for configuration
export type Config = typeof config;

// Debug logging (only in development)
if (config.enableDebug) {
  console.log('🔧 App Configuration:', {
    apiUrl: config.apiUrl,
    environment: config.isProduction ? 'production' : 'development',
    enableDebug: config.enableDebug,
    enableAnalytics: config.enableAnalytics,
  });
}