import { AppError, ErrorCode } from '../errors';

interface AIServiceError {
  status?: number;
  code?: string;
  message?: string;
}

export function handleAIServiceError(error: any, service: string): AppError {
  const timestamp = Date.now();
  const requestId = generateRequestId();

  // Handle rate limits
  if (error.status === 429 || error.code === 'rate_limit_exceeded') {
    return new AppError({
      code: ErrorCode.AI_RATE_LIMIT,
      message: `Rate limit exceeded for ${service}`,
      source: service,
      timestamp,
      requestId,
      retryable: true,
      suggestedAction: 'Please wait a moment before trying again'
    });
  }

  // Handle quota/credit issues
  if (error.status === 402 || error.code === 'insufficient_quota') {
    return new AppError({
      code: ErrorCode.AI_QUOTA_EXCEEDED,
      message: `Quota exceeded for ${service}`,
      source: service,
      timestamp,
      requestId,
      retryable: false,
      suggestedAction: 'Please upgrade your plan to continue using this feature'
    });
  }

  // Handle server overload
  if (error.status === 503 || error.code === 'server_overloaded') {
    return new AppError({
      code: ErrorCode.AI_SERVER_OVERLOAD,
      message: `${service} servers are currently overloaded`,
      source: service,
      timestamp,
      requestId,
      retryable: true,
      suggestedAction: 'Please try again in a few minutes'
    });
  }

  // Handle queue conflicts
  if (error.code === 'concurrent_request') {
    return new AppError({
      code: ErrorCode.AI_QUEUE_CONFLICT,
      message: `Concurrent request conflict in ${service}`,
      source: service,
      timestamp,
      requestId,
      retryable: true,
      suggestedAction: 'Please wait for your current generation to complete'
    });
  }

  // Handle invalid inputs
  if (error.status === 400 || error.code === 'invalid_request') {
    return new AppError({
      code: ErrorCode.AI_INVALID_INPUT,
      message: `Invalid input provided to ${service}: ${error.message}`,
      source: service,
      timestamp,
      requestId,
      retryable: true,
      suggestedAction: 'Please check your input and try again'
    });
  }

  // Default error
  return new AppError({
    code: ErrorCode.AI_GENERATION_FAILED,
    message: `${service} generation failed: ${error.message || 'Unknown error'}`,
    source: service,
    timestamp,
    requestId,
    retryable: true
  });
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}