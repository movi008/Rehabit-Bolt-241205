import axios from 'axios';
import { env } from '../config/env';

const api = axios.create({
  baseURL: env.API_URL,
});

// AI Service Interfaces
interface GenerateScriptResponse {
  script: string;
  tokens: number;
}

interface GenerateVoiceoverResponse {
  audioUrl: string;
  duration: number;
}

interface GenerateVisualsResponse {
  images: string[];
}

interface GenerateVideoResponse {
  videoUrl: string;
  duration: number;
}

// AI Service Functions
export const aiService = {
  async generateScript(prompt: string): Promise<GenerateScriptResponse> {
    const response = await api.post('/api/generate/script', { prompt }, {
      headers: { 'Authorization': `Bearer ${env.OPENAI_API_KEY}` }
    });
    return response.data;
  },

  async generateVoiceover(text: string): Promise<GenerateVoiceoverResponse> {
    const response = await api.post('/api/generate/voiceover', { text }, {
      headers: { 'Authorization': `Bearer ${env.ELEVENLABS_API_KEY}` }
    });
    return response.data;
  },

  async generateVisuals(script: string): Promise<GenerateVisualsResponse> {
    const response = await api.post('/api/generate/visuals', { script }, {
      headers: { 'Authorization': `Bearer ${env.RUNWAYML_API_KEY}` }
    });
    return response.data;
  },

  async generateVideo(images: string[], audioUrl: string): Promise<GenerateVideoResponse> {
    const response = await api.post('/api/generate/video', { 
      images, 
      audioUrl 
    }, {
      headers: { 'Authorization': `Bearer ${env.LUMA_API_KEY}` }
    });
    return response.data;
  }
};