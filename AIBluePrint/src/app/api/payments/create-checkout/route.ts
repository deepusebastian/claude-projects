import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe, PRO_MONTHLY_PRICE_CENTS, SINGLE_BLUEPRINT_PRICE_CENTS } from "@/lib/stripe";
import { prisma } from "@/lib/db";

// POST /api/payments/create-checkout
// Body: { plan: "single" | "pro" }
//   single → $2.99 one-time payment, grants 1 blueprint credit
//   pro    → $9.99/month subscription, unlimited blueprints
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const userEmail = session.user.email || undefined;
    const body = await request.json().catch(() => ({}));
    const plan: "single" | "pro" = body.plan === "single" ? "single" : "pro";

    let checkoutSession;

    if (plan === "single") {
      // ── One-time $2.99 payment ──────────────────────────────────────────────
      checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "AI Blueprint — Single Blueprint",
                description:
                  "One full blueprint unlock: step-by-step details and expert reasoning for every tool.",
              },
              unit_amount: SINGLE_BLUEPRINT_PRICE_CENTS,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.NEXTAUTH_URL}/builder?payment=success&plan=single`,
        cancel_url: `${process.env.NEXTAUTH_URL}/builder?payment=cancelled`,
        customer_email: userEmail,
        metadata: {
          userId,
          paymentType: "single",
        },
      });
    } else {
      // ── $9.99/month subscription ────────────────────────────────────────────
      checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "AI Blueprint Pro",
                description:
                  "Unlimited AI pipeline blueprints, full details, and reasoning — $9.99/month.",
              },
              unit_amount: PRO_MONTHLY_PRICE_CENTS,
              recurring: { interval: "month" },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${process.env.NEXTAUTH_URL}/builder?payment=success&plan=pro`,
        cancel_url: `${process.env.NEXTAUTH_URL}/builder?payment=cancelled`,
        customer_email: userEmail,
        metadata: {
          userId,
          paymentType: "pro",
        },
        subscription_data: {
          metadata: { userId, paymentType: "pro" },
        },
      });
    }

    // Record the pending payment
    await prisma.payment.create({
      data: {
        stripePaymentId: checkoutSession.id,
        amount: plan === "single" ? SINGLE_BLUEPRINT_PRICE_CENTS : PRO_MONTHLY_PRICE_CENTS,
        status: "pending",
        paymentType: plan,
        userId,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    if (error?.message?.includes("STRIPE_SECRET_KEY is not configured")) {
      return NextResponse.json(
        {
          error: "Payments not configured",
          message:
            "Stripe is not set up yet. Add your STRIPE_SECRET_KEY to your environment variables to enable payments.",
        },
        { status: 503 }
      );
    }
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
