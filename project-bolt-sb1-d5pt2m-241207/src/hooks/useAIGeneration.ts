import { useState, useCallback } from 'react';
import { AppError } from '../lib/errors';
import { aiService } from '../lib/ai';
import { useErrorHandler } from './useErrorHandler';

interface UseAIGenerationOptions {
  onSuccess?: (result: any) => void;
  onError?: (error: AppError) => void;
  retryAttempts?: number;
  retryDelay?: number;
}

export function useAIGeneration(options: UseAIGenerationOptions = {}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const { handleError } = useErrorHandler();
  const [retryCount, setRetryCount] = useState(0);

  const generate = useCallback(async (prompt: string) => {
    try {
      setIsGenerating(true);
      setProgress(0);

      // Simulated progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 1000);

      const result = await aiService.generateScript(prompt);

      clearInterval(progressInterval);
      setProgress(100);
      options.onSuccess?.(result);
      return result;
    } catch (error) {
      clearInterval(progressInterval);
      
      if (error instanceof AppError && error.retryable && retryCount < (options.retryAttempts || 3)) {
        setRetryCount(prev => prev + 1);
        await new Promise(resolve => setTimeout(resolve, options.retryDelay || 2000));
        return generate(prompt);
      }

      const appError = handleError(error);
      options.onError?.(appError);
      throw appError;
    } finally {
      setIsGenerating(false);
      setProgress(0);
      setRetryCount(0);
    }
  }, [options, retryCount]);

  return {
    generate,
    isGenerating,
    progress,
    retryCount
  };
}