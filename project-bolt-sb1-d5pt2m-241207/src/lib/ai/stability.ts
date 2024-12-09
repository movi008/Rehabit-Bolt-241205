import axios from 'axios';
import { env } from '../../config/env';

interface GenerateImageResponse {
  images: string[];
  error?: string;
}

class StabilityService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = env.STABILITY_API_KEY;
    this.baseUrl = 'https://api.stability.ai/v1';
    
    if (!this.apiKey) {
      console.warn('Stability API key is not configured. Using fallback demo mode.');
    }
  }

  async generateImages(prompt: string, count: number = 1): Promise<GenerateImageResponse> {
    try {
      if (!this.apiKey) {
        // Demo mode: Return a placeholder image
        return {
          images: ['https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=400&h=400']
        };
      }

      const response = await axios.post(
        `${this.baseUrl}/generation/text-to-image`,
        {
          text_prompts: [{ text: prompt }],
          samples: count,
          height: 512,
          width: 512,
          steps: 30,
          cfg_scale: 7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      const images = response.data.artifacts.map((artifact: { base64: string }) => 
        `data:image/png;base64,${artifact.base64}`
      );

      return { images };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        throw new Error(`Stability API error: ${message}`);
      }
      throw error;
    }
  }
}

export const stabilityService = new StabilityService();