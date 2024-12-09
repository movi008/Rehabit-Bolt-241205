import { useState, useCallback } from 'react';
import { AppError, logError } from '../lib/errors';

export function useErrorHandler() {
  const [error, setError] = useState<AppError | null>(null);

  const handleError = useCallback((error: unknown) => {
    if (error instanceof AppError) {
      setError(error);
      logError(error);
    } else if (error instanceof Error) {
      const appError = new AppError({
        code: 'UNEXPECTED_ERROR',
        message: error.message,
        timestamp: Date.now(),
        details: { stack: error.stack }
      });
      setError(appError);
      logError(appError);
    } else {
      const appError = new AppError({
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        timestamp: Date.now(),
        details: { error }
      });
      setError(appError);
      logError(appError);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError
  };
}