import axios from 'axios';
import { env } from '../../config/env';
import { handleAIServiceError, AppError, ErrorCode } from '../errors';

const api = axios.create({
  baseURL: 'https://api.elevenlabs.io/v1',
  headers: {
    'xi-api-key': env.ELEVENLABS_API_KEY,
    'Content-Type': 'application/json'
  }
});

export interface GenerateVoiceoverResponse {
  audioUrl: string;
  duration: number;
}

export const elevenLabsService = {
  async generateVoiceover(
    text: string,
    voiceId: string = 'pNInz6obpgDQGcFmaJgB'
  ): Promise<GenerateVoiceoverResponse> {
    try {
      if (!env.ELEVENLABS_API_KEY) {
        throw new AppError({
          code: ErrorCode.AI_SERVICE_UNAVAILABLE,
          message: 'ElevenLabs API key is not configured',
          source: 'elevenlabs',
          timestamp: Date.now()
        });
      }

      const response = await api.post(`/text-to-speech/${voiceId}`, {
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.75
        }
      }, {
        responseType: 'arraybuffer'
      });

      // Convert audio buffer to base64
      const audioBase64 = Buffer.from(response.data, 'binary').toString('base64');
      const audioUrl = `data:audio/mpeg;base64,${audioBase64}`;

      // Calculate approximate duration (1 word ≈ 0.4 seconds)
      const wordCount = text.split(/\s+/).length;
      const duration = wordCount * 0.4;

      return {
        audioUrl,
        duration
      };
    } catch (error) {
      const appError = handleAIServiceError(error, 'ElevenLabs');
      throw appError;
    }
  }
};