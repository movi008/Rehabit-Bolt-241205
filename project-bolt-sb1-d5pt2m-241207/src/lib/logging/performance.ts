import { logger } from './index';

export const performanceLogger = {
  startTimer(label: string) {
    const start = performance.now();
    return {
      end() {
        const duration = performance.now() - start;
        logger.info(`Performance: ${label}`, { duration });
        return duration;
      }
    };
  },

  trackOperation(label: string, operation: () => Promise<any>) {
    const timer = this.startTimer(label);
    return operation().finally(() => timer.end());
  }
};