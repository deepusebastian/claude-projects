import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe, PRO_MONTHLY_PRICE_CENTS } from "@/lib/stripe";
import { prisma } from "@/lib/db";

// POST /api/payments/create-checkout — create a Stripe subscription checkout session
export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const userEmail = session.user.email || undefined;

    // Create a Stripe subscription checkout session — $9.99/month
    const checkoutSession = await stripe.checkout.sessions.create({
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
      success_url: `${process.env.NEXTAUTH_URL}/builder?payment=success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/builder?payment=cancelled`,
      customer_email: userEmail,
      metadata: {
        userId,
      },
      subscription_data: {
        metadata: {
          userId,
        },
      },
    });

    // Record the pending payment
    await prisma.payment.create({
      data: {
        stripePaymentId: checkoutSession.id,
        amount: PRO_MONTHLY_PRICE_CENTS,
        status: "pending",
        userId,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    // Provide a helpful message when Stripe isn't configured
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
