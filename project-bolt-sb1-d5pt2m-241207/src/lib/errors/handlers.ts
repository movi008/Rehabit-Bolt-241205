import { ErrorCode, AppError, ErrorDetails } from './types';
import { env } from '../../config/env';

// Generic error handler for API responses
export function handleApiError(error: any): AppError {
  if (error instanceof AppError) {
    return error;
  }

  const timestamp = Date.now();
  const requestId = generateRequestId();

  // Handle Axios errors
  if (error.isAxiosError) {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 429) {
      return new AppError({
        code: ErrorCode.API_RATE_LIMIT,
        message: 'Rate limit exceeded. Please try again later.',
        source: error.config?.url,
        timestamp,
        requestId,
        details: { status, data }
      });
    }

    if (status === 401 || status === 403) {
      return new AppError({
        code: ErrorCode.AUTH_INSUFFICIENT_PERMISSIONS,
        message: 'Authentication failed or insufficient permissions.',
        source: error.config?.url,
        timestamp,
        requestId,
        details: { status, data }
      });
    }

    return new AppError({
      code: ErrorCode.API_REQUEST_FAILED,
      message: error.message || 'API request failed',
      source: error.config?.url,
      timestamp,
      requestId,
      details: { status, data }
    });
  }

  // Handle network errors
  if (error.name === 'NetworkError' || error instanceof TypeError) {
    return new AppError({
      code: ErrorCode.NETWORK_ERROR,
      message: 'Network connection failed',
      timestamp,
      requestId,
      details: { originalError: error.message }
    });
  }

  // Default error
  return new AppError({
    code: ErrorCode.UNEXPECTED_ERROR,
    message: error.message || 'An unexpected error occurred',
    timestamp,
    requestId,
    details: { originalError: error }
  });
}

// AI Service specific error handler
export function handleAIServiceError(error: any, service: string): AppError {
  const timestamp = Date.now();
  const requestId = generateRequestId();

  // Handle quota/rate limit errors
  if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
    return new AppError({
      code: ErrorCode.AI_QUOTA_EXCEEDED,
      message: `${service} quota exceeded. Please try again later.`,
      source: service,
      timestamp,
      requestId,
      details: { originalError: error }
    });
  }

  // Handle invalid input errors
  if (error.message?.includes('invalid') || error.message?.includes('validation')) {
    return new AppError({
      code: ErrorCode.AI_INVALID_INPUT,
      message: `Invalid input provided to ${service}`,
      source: service,
      timestamp,
      requestId,
      details: { originalError: error }
    });
  }

  // Generic AI service error
  return new AppError({
    code: ErrorCode.AI_GENERATION_FAILED,
    message: `${service} generation failed: ${error.message}`,
    source: service,
    timestamp,
    requestId,
    details: { originalError: error }
  });
}

// Storage error handler
export function handleStorageError(error: any, operation: string): AppError {
  const timestamp = Date.now();
  const requestId = generateRequestId();

  const errorMap: Record<string, ErrorCode> = {
    upload: ErrorCode.STORAGE_UPLOAD_FAILED,
    download: ErrorCode.STORAGE_DOWNLOAD_FAILED,
    delete: ErrorCode.STORAGE_DELETE_FAILED
  };

  return new AppError({
    code: errorMap[operation] || ErrorCode.SYSTEM_ERROR,
    message: `Storage ${operation} operation failed: ${error.message}`,
    source: 'storage',
    timestamp,
    requestId,
    details: { originalError: error }
  });
}

// Validation error handler
export function handleValidationError(errors: Record<string, string[]>): AppError {
  return new AppError({
    code: ErrorCode.VALIDATION_FAILED,
    message: 'Validation failed',
    source: 'validation',
    timestamp: Date.now(),
    requestId: generateRequestId(),
    details: { errors }
  });
}

// Error logging
export function logError(error: AppError): void {
  const errorLog = {
    ...error.toJSON(),
    environment: env.NODE_ENV,
    timestamp: new Date(error.timestamp).toISOString()
  };

  // Log to console in development
  if (env.NODE_ENV === 'development') {
    console.error('Error:', errorLog);
    console.error('Stack:', error.stack);
  }

  // In production, you might want to send this to a logging service
  if (env.NODE_ENV === 'production') {
    // TODO: Implement production error logging
    // Example: sendToLoggingService(errorLog);
  }
}

// Helper function to generate request IDs
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}