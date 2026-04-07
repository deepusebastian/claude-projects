import Stripe from "stripe";

export const BLUEPRINT_PRICE_CENTS = 299; // $2.99

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
