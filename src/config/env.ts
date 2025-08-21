// Environment Configuration for Admiral's Chronicle

export interface AppConfig {
  appTitle: string
  version: string
  environment: 'development' | 'staging' | 'production' | 'public'
  isPublicBuild: boolean
  featureFlags: {
    showInternalTools: boolean
    showDebugInfo: boolean
    enableAdvancedFeatures: boolean
    showVersionSelector: boolean
  }
  api: {
    baseUrl: string
  }
  branding: {
    showPoweredBy: boolean
    companyName: string
  }
}

// Get environment from Vite
const environment = (import.meta.env.VITE_ENVIRONMENT || import.meta.env.MODE || 'development') as AppConfig['environment']
const isPublicBuild = environment === 'public'

// Create configuration based on environment
export const config: AppConfig = {
  appTitle: 'Admiral\'s Chronicle',
  version: '1.0.0',
  environment,
  isPublicBuild,
  
  featureFlags: {
    // Hide internal tools in public builds
    showInternalTools: !isPublicBuild && environment !== 'production',
    showDebugInfo: environment === 'development',
    enableAdvancedFeatures: !isPublicBuild,
    showVersionSelector: !isPublicBuild
  },
  
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
  },
  
  branding: {
    showPoweredBy: isPublicBuild,
    companyName: 'OS1000 Educational Systems'
  }
}

// Debug logging in development
if (config.featureFlags.showDebugInfo) {
  console.log('🎯 Admiral\'s Chronicle Configuration:', config)
}

export default config