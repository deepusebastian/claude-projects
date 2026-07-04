/**
 * Feature flags — single source of truth.
 *
 * All flags read from environment variables so they can be flipped per-env
 * without a code change.  NEXT_PUBLIC_ prefix makes them available on both
 * server and client.
 *
 * Usage:
 *   import { PAYMENTS_ENABLED } from "@/lib/flags";
 *   if (PAYMENTS_ENABLED) { ... }
 */

/**
 * When false  → free launch mode: blueprints are fully unlocked for any
 *               logged-in user; the paywall, pricing UI, and Stripe checkout
 *               are hidden.  Login is still required to generate a blueprint.
 *
 * When true   → paid mode: first blueprint is free, subsequent ones require
 *               a $2.99 single purchase or $9.99/mo Pro subscription.
 *
 * Default: false  (set NEXT_PUBLIC_PAYMENTS_ENABLED=true to enable payments)
 */
export const PAYMENTS_ENABLED =
  process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === "true";
