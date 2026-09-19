import posthog from 'posthog-js';

type ClarityCommand = 'consent' | 'event' | 'set';
type ClarityClient = (command: ClarityCommand, ...args: string[]) => void;

declare global {
  interface Window {
    clarity?: ClarityClient;
  }
}

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY?.trim();
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST?.trim() || 'https://us.i.posthog.com';
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID?.trim();
const ANALYTICS_ENABLED = import.meta.env.VITE_ANALYTICS_ENABLED === 'true';

const safeTagValue = (value: unknown) => String(value).slice(0, 255);

class TelemetryService {
  private isPostHogInitialized = false;
  private isClarityInitialized = false;

  constructor() {
    this.initTelemetry();
  }

  public initTelemetry(): void {
    if (typeof window === 'undefined' || !ANALYTICS_ENABLED || navigator.doNotTrack === '1') return;

    // PostHog is opt-in through VITE_ANALYTICS_ENABLED and its project key.
    try {
      if (POSTHOG_KEY && !this.isPostHogInitialized) {
        posthog.init(POSTHOG_KEY, {
          api_host: POSTHOG_HOST,
          person_profiles: 'identified_only',
          // Page views are emitted by App so client-side view changes are not
          // double-counted by PostHog's automatic initial capture.
          capture_pageview: false,
          capture_pageleave: true,
          autocapture: true,
          persistence: 'localStorage',
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

    // Microsoft Clarity loads asynchronously and receives only event names and
    // bounded, non-sensitive custom tags.
    try {
      if (CLARITY_ID && !this.isClarityInitialized && !window.clarity) {
        (function (c: Window, l: Document, a: 'clarity', r: 'script', i: string) {
          c[a] =
            c[a] ||
            ((...command: [ClarityCommand, ...string[]]) => {
              const queue = ((c[a] as unknown as { q?: unknown[][] }).q ||= []);
              queue.push(command);
            });
          const t = l.createElement(r);
          t.async = 1;
          t.src = 'https://www.clarity.ms/tag/' + i;
          const y = l.getElementsByTagName(r)[0];
          y?.parentNode?.insertBefore(t, y);
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
    if (!ANALYTICS_ENABLED || navigator.doNotTrack === '1') return;
    try {
      if (this.isPostHogInitialized) {
        posthog.capture(eventName, {
          timestamp: new Date().toISOString(),
          url: typeof window !== 'undefined' ? window.location.href : '',
          ...properties,
        });
      }

      if (window.clarity) {
        window.clarity('event', eventName);
        Object.entries(properties)
          .filter(([, value]) => ['string', 'number', 'boolean'].includes(typeof value))
          .forEach(([key, value]) => window.clarity?.('set', key, safeTagValue(value)));
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
      if (!ANALYTICS_ENABLED || navigator.doNotTrack === '1') return;
      window.clarity?.('set', key, safeTagValue(value));
      if (this.isPostHogInitialized) posthog.register({ [key]: value });
    } catch (err) {
      // ignore
    }
  }
}

export const telemetryService = new TelemetryService();
