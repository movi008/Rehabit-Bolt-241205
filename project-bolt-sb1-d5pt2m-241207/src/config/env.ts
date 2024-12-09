export const env = {
  // API Keys
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || '',
  ELEVENLABS_API_KEY: import.meta.env.VITE_ELEVENLABS_API_KEY || '',
  STABILITY_API_KEY: import.meta.env.VITE_STABILITY_API_KEY || '',
  LUMA_API_KEY: import.meta.env.VITE_LUMA_API_KEY || '',

  // AWS Configuration
  AWS_REGION: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  AWS_BUCKET_NAME: import.meta.env.VITE_AWS_BUCKET_NAME || '',
  AWS_ACCESS_KEY_ID: import.meta.env.VITE_AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || '',

  // API URLs
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
} as const;