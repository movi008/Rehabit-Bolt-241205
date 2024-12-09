import { env } from '../../config/env';

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
  userId?: string;
  sessionId?: string;
  tags?: string[];
}

class Logger {
  private static instance: Logger;
  private buffer: LogEntry[] = [];
  private readonly MAX_BUFFER_SIZE = 100;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(level: LogLevel, message: string, context?: Record<string, any>) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      // Add user/session info if available
      userId: this.getCurrentUserId(),
      sessionId: this.getCurrentSessionId(),
    };

    // Add to buffer
    this.buffer.push(entry);
    if (this.buffer.length > this.MAX_BUFFER_SIZE) {
      this.flush();
    }

    // Development logging
    if (env.NODE_ENV === 'development') {
      this.logToConsole(entry);
    }

    // Production logging
    if (env.NODE_ENV === 'production') {
      this.logToService(entry);
    }
  }

  private logToConsole(entry: LogEntry) {
    const formattedMessage = `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`;
    switch (entry.level) {
      case LogLevel.ERROR:
        console.error(formattedMessage, entry.context);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage, entry.context);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage, entry.context);
        break;
      default:
        console.log(formattedMessage, entry.context);
    }
  }

  private async logToService(entry: LogEntry) {
    // TODO: Implement production logging service integration
    // Examples: Sentry, LogRocket, CloudWatch, etc.
  }

  private getCurrentUserId(): string | undefined {
    // TODO: Implement user ID retrieval from auth context
    return undefined;
  }

  private getCurrentSessionId(): string | undefined {
    // TODO: Implement session ID retrieval
    return undefined;
  }

  async flush() {
    if (this.buffer.length === 0) return;

    if (env.NODE_ENV === 'production') {
      try {
        // TODO: Batch send logs to logging service
        this.buffer = [];
      } catch (error) {
        console.error('Failed to flush logs:', error);
      }
    }
  }

  // Convenience methods
  debug(message: string, context?: Record<string, any>) {
    this.log(LogLevel.DEBUG, message, context);
  }

  info(message: string, context?: Record<string, any>) {
    this.log(LogLevel.INFO, message, context);
  }

  warn(message: string, context?: Record<string, any>) {
    this.log(LogLevel.WARN, message, context);
  }

  error(message: string, context?: Record<string, any>) {
    this.log(LogLevel.ERROR, message, context);
  }
}

export const logger = Logger.getInstance();