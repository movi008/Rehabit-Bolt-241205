import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { AppError, ErrorCode } from '../lib/errors';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
    errorInfo: null
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to error handling system
    if (error instanceof AppError) {
      // Already formatted error, just log it
      console.error('Caught error:', error);
    } else {
      // Create and log an AppError
      const appError = new AppError({
        code: ErrorCode.SYSTEM_ERROR,
        message: error.message,
        timestamp: Date.now(),
        details: {
          componentStack: errorInfo.componentStack,
          stack: error.stack
        }
      });
      console.error('Caught and formatted error:', appError);
    }
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 text-red-600 mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h2 className="text-lg font-semibold">Something went wrong</h2>
            </div>
            
            <p className="text-gray-600 mb-4">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Error Details:</p>
                <pre className="text-xs bg-gray-50 p-3 rounded-lg overflow-x-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={this.handleRefresh}
                className="flex items-center space-x-2 px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Refresh Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}