import posthog from 'posthog-js';

// Default project tokens with fallback support
const POSTHOG_KEY = (import.meta.env.VITE_POSTHOG_KEY as string) || 'phc_open_science_archive_2026';
const POSTHOG_HOST = (import.meta.env.VITE_POSTHOG_HOST as string) || 'https://us.i.posthog.com';
const CLARITY_ID = (import.meta.env.VITE_CLARITY_ID as string) || 'q8k4x9z10c';

class TelemetryService {
  private isPostHogInitialized = false;
  private isClarityInitialized = false;

  constructor() {
    this.initTelemetry();
  }

  public initTelemetry(): void {
    if (typeof window === 'undefined') return;

    // 1. Initialize PostHog
    try {
      if (!this.isPostHogInitialized) {
        posthog.init(POSTHOG_KEY, {
          api_host: POSTHOG_HOST,
          person_profiles: 'identified_only',
          capture_pageview: true,
          capture_pageleave: true,
          autocapture: true,
          persistence: 'localStorage',
          bootstrap: {
            distinctID: 'anon_' + Math.random().toString(36).substring(2, 11),
          },
          loaded: (ph) => {
            this.isPostHogInitialized = true;
            ph.register({
              platform: 'Open Science Archives',
              author: 'Aarti Sri Ravikumar',
              domain: window.location.hostname,
            });
          },
        });
      }
    } catch (err) {
      console.warn('PostHog initialization notice:', err);
    }

    // 2. Initialize Microsoft Clarity
    try {
      if (!this.isClarityInitialized && !(window as any).clarity) {
        (function (c: any, l: any, a: any, r: any, i: any) {
          c[a] =
            c[a] ||
            function () {
              (c[a].q = c[a].q || []).push(arguments);
            };
          const t = l.createElement(r);
          t.async = 1;
          t.src = 'https://www.clarity.ms/tag/' + i;
          const y = l.getElementsByTagName(r)[0];
          y.parentNode.insertBefore(t, y);
        })(window, document, 'clarity', 'script', CLARITY_ID);
        this.isClarityInitialized = true;
      }
    } catch (err) {
      console.warn('Microsoft Clarity initialization notice:', err);
    }
  }

  /**
   * Track custom user interaction events in PostHog and Clarity
   */
  public trackEvent(eventName: string, properties: Record<string, any> = {}): void {
    try {
      // PostHog event dispatch
      posthog.capture(eventName, {
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : '',
        ...properties,
      });

      // Microsoft Clarity custom tags/events
      if (typeof window !== 'undefined' && (window as any).clarity) {
        (window as any).clarity('set', eventName, JSON.stringify(properties));
        (window as any).clarity('event', eventName);
      }
    } catch (err) {
      console.debug('Telemetry dispatch:', err);
    }
  }

  /**
   * Track Monograph or Page Reading
   */
  public trackPageView(path: string, title: string): void {
    this.trackEvent('$pageview', {
      $current_url: path,
      title: title,
    });
  }

  /**
   * Track PDF or BibTeX Reprint Downloads
   */
  public trackDownload(monographTitle: string, format: string): void {
    this.trackEvent('reprint_downloaded', {
      monographTitle,
      format,
    });
  }

  /**
   * Track Interactive Simulator Tweaks
   */
  public trackSimulatorUsage(simulatorName: string, parameter: string, value: any): void {
    this.trackEvent('simulator_interaction', {
      simulatorName,
      parameter,
      value,
    });
  }

  /**
   * Track AI Scholar Assistant Queries
   */
  public trackAiQuery(queryText: string): void {
    this.trackEvent('ai_assistant_query', {
      queryText: queryText.slice(0, 100),
      length: queryText.length,
    });
  }

  /**
   * Identify user role or session preferences
   */
  public setSessionTag(key: string, value: string): void {
    try {
      if (typeof window !== 'undefined' && (window as any).clarity) {
        (window as any).clarity('set', key, value);
      }
      posthog.register({ [key]: value });
    } catch (err) {
      // ignore
    }
  }
}

export const telemetryService = new TelemetryService();
