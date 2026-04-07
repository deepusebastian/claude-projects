import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe, BLUEPRINT_PRICE_CENTS } from "@/lib/stripe";
import { prisma } from "@/lib/db";

// POST /api/payments/create-checkout — create a Stripe checkout session
export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const userEmail = session.user.email || undefined;

    // Create a Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "AI Blueprint — Pro",
              description: "Generate one AI pipeline blueprint",
            },
            unit_amount: BLUEPRINT_PRICE_CENTS,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/builder?payment=success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/builder?payment=cancelled`,
      customer_email: userEmail,
      metadata: {
        userId,
      },
    });

    // Record the pending payment
    await prisma.payment.create({
      data: {
        stripePaymentId: checkoutSession.id,
        amount: BLUEPRINT_PRICE_CENTS,
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
            "Stripe is not set up yet. Add your STRIPE_SECRET_KEY to .env to enable payments.",
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
