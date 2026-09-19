/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANALYTICS_ENABLED?: string;
  readonly VITE_POSTHOG_KEY?: string;
  readonly VITE_POSTHOG_HOST?: string;
  readonly VITE_CLARITY_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
