import Stripe from "stripe";

// Pro subscription — $9.99/month for unlimited AI blueprints
export const PRO_MONTHLY_PRICE_CENTS = 999;

// Kept for back-compat; any existing references default to the Pro price.
export const BLUEPRINT_PRICE_CENTS = PRO_MONTHLY_PRICE_CENTS;

// Lazy-initialize Stripe so the dev server doesn't crash when the key isn't set.
// Call getStripe() inside route handlers rather than at module import time.
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.startsWith("sk_test_your_key")) {
    throw new Error(
      "STRIPE_SECRET_KEY is not configured. Add your Stripe secret key to .env to enable payments."
    );
  }

  _stripe = new Stripe(key, {
    apiVersion: "2024-04-10",
    typescript: true,
  });

  return _stripe;
}

// Keep a named `stripe` export for back-compat, but make it a getter proxy
// so existing imports don't need to change call-sites.
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as any)[prop];
  },
});
