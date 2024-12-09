import React from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { AppError } from '../lib/errors';

interface AIGenerationProgressProps {
  isGenerating: boolean;
  progress: number;
  error?: AppError;
  onRetry?: () => void;
}

export function AIGenerationProgress({ 
  isGenerating, 
  progress, 
  error,
  onRetry 
}: AIGenerationProgressProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isGenerating ? (
            <Loader2 className="w-5 h-5 text-[#007dff] animate-spin" />
          ) : error ? (
            <XCircle className="w-5 h-5 text-red-500" />
          ) : progress === 100 ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : null}
          <span className="text-sm font-medium text-gray-900">
            {isGenerating ? 'Generating...' : error ? 'Generation failed' : 'Complete'}
          </span>
        </div>
        <span className="text-sm text-gray-500">{progress}%</span>
      </div>

      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${
            error ? 'bg-red-500' : 'bg-[#007dff]'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {error && (
        <div className="mt-4">
          <p className="text-sm text-red-600">{error.userMessage}</p>
          {error.retryable && onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm text-[#007dff] hover:text-[#0066cc]"
            >
              Try again
            </button>
          )}
        </div>
      )}
    </div>
  );
}