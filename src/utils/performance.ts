/**
 * Performance monitoring utilities for NutriCalc
 * Tracks key metrics and user interactions
 */

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  bundleSize: number;
  memoryUsage: number;
}

interface UserInteraction {
  action: string;
  timestamp: number;
  duration?: number;
  element?: string;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    loadTime: 0,
    renderTime: 0,
    interactionTime: 0,
    bundleSize: 0,
    memoryUsage: 0,
  };

  private interactions: UserInteraction[] = [];
  private startTime: number = performance.now();

  constructor() {
    this.initializeMonitoring();
  }

  private initializeMonitoring(): void {
    // Track page load performance
    window.addEventListener('load', () => {
      this.trackLoadTime();
    });

    // Track Core Web Vitals
    this.trackCoreWebVitals();

    // Track user interactions
    this.trackUserInteractions();

    // Track memory usage (if available)
    this.trackMemoryUsage();
  }

  private trackLoadTime(): void {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      this.metrics.loadTime = navigation.loadEventEnd - navigation.fetchStart;
      this.metrics.renderTime = navigation.domContentLoadedEventEnd - navigation.fetchStart;
    }
  }

  private trackCoreWebVitals(): void {
    // First Contentful Paint (FCP)
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime);
        }
      }
    }).observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint (LCP)
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('LCP:', entry.startTime);
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Cumulative Layout Shift (CLS)
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          console.log('CLS:', (entry as any).value);
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }

  private trackUserInteractions(): void {
    // Track button clicks
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        this.recordInteraction({
          action: 'click',
          timestamp: performance.now(),
          element: target.textContent || target.className,
        });
      }
    });

    // Track form interactions
    document.addEventListener('input', (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'SELECT') {
        this.recordInteraction({
          action: 'input',
          timestamp: performance.now(),
          element: target.id || target.className,
        });
      }
    });

    // Track navigation
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.closest('[data-testid^="tab-"]')) {
        this.recordInteraction({
          action: 'navigation',
          timestamp: performance.now(),
          element: target.closest('[data-testid^="tab-"]')?.getAttribute('data-testid') || 'unknown',
        });
      }
    });
  }

  private trackMemoryUsage(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.metrics.memoryUsage = memory.usedJSHeapSize;
    }
  }

  private recordInteraction(interaction: UserInteraction): void {
    this.interactions.push(interaction);
    
    // Keep only last 100 interactions to prevent memory leaks
    if (this.interactions.length > 100) {
      this.interactions = this.interactions.slice(-100);
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public getInteractions(): UserInteraction[] {
    return [...this.interactions];
  }

  public getSessionDuration(): number {
    return performance.now() - this.startTime;
  }

  public generateReport(): string {
    const metrics = this.getMetrics();
    const sessionDuration = this.getSessionDuration();
    const interactionCount = this.interactions.length;

    return `
Performance Report:
==================
Load Time: ${metrics.loadTime.toFixed(2)}ms
Render Time: ${metrics.renderTime.toFixed(2)}ms
Session Duration: ${(sessionDuration / 1000).toFixed(2)}s
User Interactions: ${interactionCount}
Memory Usage: ${(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB

Recent Interactions:
${this.interactions.slice(-5).map(i => 
  `- ${i.action} on ${i.element} at ${(i.timestamp / 1000).toFixed(2)}s`
).join('\n')}
    `.trim();
  }

  public exportData(): object {
    return {
      metrics: this.getMetrics(),
      interactions: this.getInteractions(),
      sessionDuration: this.getSessionDuration(),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Utility functions for manual tracking
export const trackCustomEvent = (eventName: string, data?: any): void => {
  console.log(`Custom Event: ${eventName}`, data);
  performanceMonitor.recordInteraction({
    action: `custom:${eventName}`,
    timestamp: performance.now(),
    element: JSON.stringify(data),
  });
};

export const measureFunction = <T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T => {
  return ((...args: any[]) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    
    console.log(`Function ${name} took ${(end - start).toFixed(2)}ms`);
    trackCustomEvent(`function:${name}`, { duration: end - start });
    
    return result;
  }) as T;
};

// Export types for external use
export type { PerformanceMetrics, UserInteraction };
