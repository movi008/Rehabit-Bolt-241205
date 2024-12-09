import { openAIService } from './openai';
import { elevenLabsService } from './elevenlabs';
import { lumaService } from './luma';
import { aiModels } from '../../config/ai-models';

export interface AIGenerationProgress {
  script: boolean;
  voiceover: boolean;
  images: boolean;
  video: boolean;
}

export interface AIGenerationResult {
  script: string;
  voiceoverUrl: string;
  images: string[];
  videoUrl: string;
  duration: number;
}

export const aiService = {
  async generateScript(prompt: string) {
    if (!aiModels.text.enabled) {
      throw new Error('Text generation is disabled');
    }
    return openAIService.generateScript(prompt);
  },

  async generateImages(prompt: string, count: number = 1) {
    if (!aiModels.image.enabled) {
      throw new Error('Image generation is disabled');
    }
    return openAIService.generateImages(prompt, count);
  },

  async generateVoiceover(text: string) {
    if (!aiModels.voice.enabled) {
      throw new Error('Voice generation is disabled');
    }
    return elevenLabsService.generateVoiceover(text);
  },

  async generateVideo(images: string[], audioUrl: string, duration: number) {
    if (!aiModels.video.enabled) {
      throw new Error('Video generation is disabled');
    }
    return lumaService.generateVideo(images, audioUrl, duration);
  }
};

export async function generateVisionContent(
  prompt: string,
  onProgress?: (progress: AIGenerationProgress) => void
): Promise<AIGenerationResult> {
  try {
    // Generate script
    onProgress?.({ script: true, voiceover: false, images: false, video: false });
    const scriptResult = await aiService.generateScript(prompt);

    // Generate voiceover
    onProgress?.({ script: true, voiceover: true, images: false, video: false });
    const voiceoverResult = await aiService.generateVoiceover(scriptResult.script);

    // Generate images
    onProgress?.({ script: true, voiceover: true, images: true, video: false });
    const imageResult = await aiService.generateImages(prompt);

    // Generate video
    onProgress?.({ script: true, voiceover: true, images: true, video: true });
    const videoResult = await aiService.generateVideo(
      imageResult.images,
      voiceoverResult.audioUrl,
      voiceoverResult.duration
    );

    return {
      script: scriptResult.script,
      voiceoverUrl: voiceoverResult.audioUrl,
      images: imageResult.images,
      videoUrl: videoResult.videoUrl,
      duration: videoResult.duration
    };
  } catch (error) {
    console.error('Vision Content Generation Error:', error);
    throw new Error('Failed to generate vision content');
  }
}