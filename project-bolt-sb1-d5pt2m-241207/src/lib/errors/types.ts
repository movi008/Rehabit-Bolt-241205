export enum ErrorCode {
  // AI Service Errors
  AI_SERVICE_UNAVAILABLE = 'AI_SERVICE_UNAVAILABLE',
  AI_GENERATION_FAILED = 'AI_GENERATION_FAILED',
  AI_QUOTA_EXCEEDED = 'AI_QUOTA_EXCEEDED',
  AI_INVALID_INPUT = 'AI_INVALID_INPUT',
  AI_RATE_LIMIT = 'AI_RATE_LIMIT',
  AI_SERVER_OVERLOAD = 'AI_SERVER_OVERLOAD',
  AI_QUEUE_CONFLICT = 'AI_QUEUE_CONFLICT',
  
  // Authentication Errors
  AUTH_INVALID_TOKEN = 'AUTH_INVALID_TOKEN',
  AUTH_EXPIRED_TOKEN = 'AUTH_EXPIRED_TOKEN',
  AUTH_INSUFFICIENT_PERMISSIONS = 'AUTH_INSUFFICIENT_PERMISSIONS',
  
  // API Errors
  API_REQUEST_FAILED = 'API_REQUEST_FAILED',
  API_RATE_LIMIT = 'API_RATE_LIMIT',
  API_INVALID_RESPONSE = 'API_INVALID_RESPONSE',
  
  // Storage Errors
  STORAGE_UPLOAD_FAILED = 'STORAGE_UPLOAD_FAILED',
  STORAGE_DOWNLOAD_FAILED = 'STORAGE_DOWNLOAD_FAILED',
  STORAGE_DELETE_FAILED = 'STORAGE_DELETE_FAILED',
  
  // Validation Errors
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  INVALID_INPUT_FORMAT = 'INVALID_INPUT_FORMAT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  
  // System Errors
  SYSTEM_ERROR = 'SYSTEM_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR'
}

export interface ErrorDetails {
  code: ErrorCode;
  message: string;
  source?: string;
  timestamp: number;
  requestId?: string;
  details?: Record<string, any>;
  retryable?: boolean;
  userMessage?: string;
  suggestedAction?: string;
}

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly source?: string;
  public readonly timestamp: number;
  public readonly requestId?: string;
  public readonly details?: Record<string, any>;
  public readonly retryable: boolean;
  public readonly userMessage: string;
  public readonly suggestedAction?: string;

  constructor(errorDetails: ErrorDetails) {
    super(errorDetails.message);
    this.name = 'AppError';
    this.code = errorDetails.code;
    this.source = errorDetails.source;
    this.timestamp = errorDetails.timestamp;
    this.requestId = errorDetails.requestId;
    this.details = errorDetails.details;
    this.retryable = errorDetails.retryable ?? false;
    this.userMessage = errorDetails.userMessage ?? this.getDefaultUserMessage();
    this.suggestedAction = errorDetails.suggestedAction;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  private getDefaultUserMessage(): string {
    switch (this.code) {
      case ErrorCode.AI_QUOTA_EXCEEDED:
        return 'You have reached your usage limit. Please upgrade your plan to continue.';
      case ErrorCode.AI_RATE_LIMIT:
        return 'Too many requests. Please wait a moment before trying again.';
      case ErrorCode.AI_SERVER_OVERLOAD:
        return 'Our AI services are experiencing high demand. Please try again in a few minutes.';
      case ErrorCode.AI_QUEUE_CONFLICT:
        return 'Another generation is already in progress. Please wait for it to complete.';
      case ErrorCode.AI_INVALID_INPUT:
        return 'The provided input was invalid. Please check your prompt and try again.';
      case ErrorCode.NETWORK_ERROR:
        return 'Connection error. Please check your internet connection and try again.';
      default:
        return 'An unexpected error occurred. Please try again later.';
    }
  }

  public toJSON(): ErrorDetails {
    return {
      code: this.code,
      message: this.message,
      source: this.source,
      timestamp: this.timestamp,
      requestId: this.requestId,
      details: this.details,
      retryable: this.retryable,
      userMessage: this.userMessage,
      suggestedAction: this.suggestedAction
    };
  }
}