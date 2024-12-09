import axios from 'axios';
import { env } from '../../config/env';
import { aiModels } from '../../config/ai-models';
import { handleAIServiceError, handleApiError, AppError, ErrorCode } from '../errors';

const api = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export interface GenerateScriptResponse {
  script: string;
  tokens: number;
}

export interface GenerateImageResponse {
  images: string[];
  error?: string;
}

export const openAIService = {
  async generateScript(prompt: string): Promise<GenerateScriptResponse> {
    try {
      if (!env.OPENAI_API_KEY) {
        throw new AppError({
          code: ErrorCode.AI_SERVICE_UNAVAILABLE,
          message: 'OpenAI API key is not configured',
          source: 'openai',
          timestamp: Date.now()
        });
      }

      const response = await api.post('/chat/completions', {
        model: aiModels.text.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert vision script writer, skilled at creating compelling and inspiring narratives.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      return {
        script: response.data.choices[0].message.content,
        tokens: response.data.usage.total_tokens
      };
    } catch (error) {
      const appError = handleAIServiceError(error, 'OpenAI');
      throw appError;
    }
  },

  async generateImages(prompt: string, count: number = 1): Promise<GenerateImageResponse> {
    try {
      if (!env.OPENAI_API_KEY) {
        throw new AppError({
          code: ErrorCode.AI_SERVICE_UNAVAILABLE,
          message: 'OpenAI API key is not configured',
          source: 'openai',
          timestamp: Date.now()
        });
      }

      const response = await api.post('/images/generations', {
        model: aiModels.image.model,
        prompt,
        n: count,
        size: '1024x1024',
        quality: 'standard',
        response_format: 'b64_json'
      });

      const images = response.data.data.map((image: { b64_json: string }) => 
        `data:image/png;base64,${image.b64_json}`
      );

      return { images };
    } catch (error) {
      const appError = handleAIServiceError(error, 'OpenAI');
      throw appError;
    }
  }
};