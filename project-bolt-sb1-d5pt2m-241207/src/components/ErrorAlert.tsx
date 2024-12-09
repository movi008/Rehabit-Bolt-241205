import React from 'react';
import { AlertTriangle, XCircle, RefreshCw, AlertCircle, Info } from 'lucide-react';
import { AppError } from '../lib/errors';

interface ErrorAlertProps {
  error: AppError;
  onClose?: () => void;
  onRetry?: () => void;
}

export function ErrorAlert({ error, onClose, onRetry }: ErrorAlertProps) {
  const getAlertStyle = () => {
    switch (error.code) {
      case 'AI_QUOTA_EXCEEDED':
      case 'AI_RATE_LIMIT':
        return 'border-yellow-200 bg-yellow-50';
      case 'AI_SERVER_OVERLOAD':
      case 'AI_QUEUE_CONFLICT':
        return 'border-orange-200 bg-orange-50';
      case 'NETWORK_ERROR':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getIcon = () => {
    switch (error.code) {
      case 'AI_QUOTA_EXCEEDED':
      case 'AI_RATE_LIMIT':
        return AlertCircle;
      case 'AI_SERVER_OVERLOAD':
      case 'AI_QUEUE_CONFLICT':
        return AlertTriangle;
      case 'NETWORK_ERROR':
        return XCircle;
      default:
        return Info;
    }
  };

  const Icon = getIcon();

  return (
    <div className={`rounded-lg border ${getAlertStyle()} p-4`}>
      <div className="flex items-start space-x-3">
        <Icon className="w-5 h-5 text-red-500 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900">
            {error.userMessage}
          </h3>
          {error.suggestedAction && (
            <p className="mt-1 text-sm text-gray-600">
              {error.suggestedAction}
            </p>
          )}
          {error.retryable && onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}