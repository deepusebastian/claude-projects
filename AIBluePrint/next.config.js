// @ts-check
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // simple-icons is ESM-only; tell Next.js to transpile it for the client bundle
  transpilePackages: ["simple-icons"],
};

module.exports = withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG || "ai-blueprint",
  project: process.env.SENTRY_PROJECT || "javascript-nextjs",

  // Auth token for source-map uploads during CI / Vercel builds
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Suppress noisy output unless running in CI
  silent: !process.env.CI,

  // Upload larger client-side source maps for better stack traces
  widenClientFileUpload: true,

  // Hide source maps from the browser bundle (security best practice)
  hideSourceMaps: true,

  // Route browser requests to Sentry through Next.js to circumvent ad-blockers
  tunnelRoute: "/monitoring",

  webpack: {
    treeshake: { removeDebugLogging: true },
    automaticVercelMonitors: true,
  },
});
