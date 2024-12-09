import { env } from './env';

export type AIProvider = 'openai' | 'stability' | 'elevenlabs' | 'luma';

export interface AIModelConfig {
  provider: AIProvider;
  model: string;
  enabled: boolean;
  apiKey: string;
}

export interface AIModelsConfig {
  image: AIModelConfig;
  text: AIModelConfig;
  voice: AIModelConfig;
  video: AIModelConfig;
}

export const aiModels: AIModelsConfig = {
  image: {
    provider: 'openai',
    model: 'dall-e-3',
    enabled: true,
    apiKey: env.OPENAI_API_KEY
  },
  text: {
    provider: 'openai',
    model: 'gpt-4',
    enabled: true,
    apiKey: env.OPENAI_API_KEY
  },
  voice: {
    provider: 'elevenlabs',
    model: 'eleven_monolingual_v1',
    enabled: true,
    apiKey: env.ELEVENLABS_API_KEY
  },
  video: {
    provider: 'luma',
    model: 'default',
    enabled: true,
    apiKey: env.LUMA_API_KEY
  }
};