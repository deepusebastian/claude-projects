import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Capture 10% of sessions as replays for debugging — increase if needed
  replaysSessionSampleRate: 0.1,
  // Always capture a replay when an error occurs
  replaysOnErrorSampleRate: 1.0,

  // Capture 10% of transactions for performance monitoring
  tracesSampleRate: 0.1,

  // Only enable in production — keeps dev logs clean
  enabled: process.env.NODE_ENV === "production",

  integrations: [
    Sentry.replayIntegration({
      // Mask all text & inputs by default to protect user privacy
      maskAllText: true,
      blockAllMedia: false,
    }),
  ],

  // Surface the environment in Sentry issues
  environment: process.env.NODE_ENV,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
