import axios from 'axios';
import { env } from '../../config/env';
import { handleAIServiceError, AppError, ErrorCode } from '../errors';

const api = axios.create({
  baseURL: 'https://api.lumalabs.ai/v1',
  headers: {
    'Authorization': `Bearer ${env.LUMA_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export interface GenerateVideoResponse {
  videoUrl: string;
  duration: number;
}

export const lumaService = {
  async generateVideo(
    images: string[],
    audioUrl: string,
    duration: number
  ): Promise<GenerateVideoResponse> {
    try {
      if (!env.LUMA_API_KEY) {
        throw new AppError({
          code: ErrorCode.AI_SERVICE_UNAVAILABLE,
          message: 'Luma API key is not configured',
          source: 'luma',
          timestamp: Date.now()
        });
      }

      // Create a video project
      const projectResponse = await api.post('/projects', {
        title: 'Vision Video',
        duration
      });

      const projectId = projectResponse.data.id;

      // Upload images as scenes
      const scenes = await Promise.all(images.map(async (image, index) => {
        const sceneResponse = await api.post(`/projects/${projectId}/scenes`, {
          image,
          duration: duration / images.length,
          transition: 'crossfade',
          position: index
        });
        return sceneResponse.data.id;
      }));

      // Add audio track
      await api.post(`/projects/${projectId}/audio`, {
        url: audioUrl,
        volume: 1.0
      });

      // Render video
      const renderResponse = await api.post(`/projects/${projectId}/render`, {
        format: 'mp4',
        quality: 'high',
        resolution: '1080p'
      });

      return {
        videoUrl: renderResponse.data.url,
        duration
      };
    } catch (error) {
      const appError = handleAIServiceError(error, 'Luma Labs');
      throw appError;
    }
  }
};