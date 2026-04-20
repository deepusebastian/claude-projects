import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import Stripe from "stripe";

function isWebhookSecretConfigured(
  secret: string | undefined
): secret is string {
  return (
    typeof secret === "string" &&
    secret.startsWith("whsec_") &&
    !secret.includes("your_webhook") &&
    !secret.includes("your_test_webhook")
  );
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!isWebhookSecretConfigured(webhookSecret)) {
    console.error(
      "Stripe webhook: set STRIPE_WEBHOOK_SECRET (e.g. from `npm run stripe:listen`)"
    );
    return NextResponse.json(
      { error: "Webhook signing secret not configured" },
      { status: 503 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  // Handle checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;

    if (userId) {
      // Update payment status
      await prisma.payment.updateMany({
        where: {
          stripePaymentId: session.id,
          userId,
        },
        data: {
          status: "succeeded",
        },
      });
    }
  }

  // Handle payment failures
  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;

    if (userId) {
      await prisma.payment.updateMany({
        where: {
          stripePaymentId: session.id,
          userId,
        },
        data: {
          status: "failed",
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}
