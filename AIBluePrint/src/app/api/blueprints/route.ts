import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

// GET /api/blueprints — list user's blueprints
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const blueprints = await prisma.blueprint.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ blueprints });
  } catch (error) {
    console.error("Error fetching blueprints:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/blueprints — create a new blueprint
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { title, prompt, scenario, pipeline, status } = await request.json();

    if (!title || !prompt || !pipeline) {
      return NextResponse.json(
        { error: "Title, prompt, and pipeline are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const blueprintCount = await prisma.blueprint.count({ where: { userId } });

    // ── Access control ────────────────────────────────────────────────────────
    //
    //  Tier 1 — Free: first blueprint is always free (mark freeBlueprintUsed)
    //  Tier 2 — Single ($2.99): each purchase adds 1 blueprintCredit; consumed here
    //  Tier 3 — Pro ($9.99/mo): isPro flag, unlimited
    //
    // ─────────────────────────────────────────────────────────────────────────

    if (blueprintCount === 0) {
      // First blueprint is always free — record that the free slot was used
      await prisma.user.update({
        where: { id: userId },
        data: { freeBlueprintUsed: true },
      });
    } else if (user.isPro) {
      // Pro users: unlimited, nothing to consume
    } else if (user.blueprintCredits > 0) {
      // Single-purchase credit available: consume 1
      await prisma.user.update({
        where: { id: userId },
        data: { blueprintCredits: { decrement: 1 } },
      });
    } else {
      // No free slot, no credits, not Pro — gate with payment prompt
      return NextResponse.json(
        {
          error: "Payment required",
          message:
            "Your free blueprint has been used. Purchase a single blueprint for $2.99 or go unlimited with Pro at $9.99/month.",
          requiresPayment: true,
        },
        { status: 402 }
      );
    }

    const blueprint = await prisma.blueprint.create({
      data: {
        title,
        prompt,
        scenario: scenario || "default",
        pipeline: JSON.stringify(pipeline),
        status: status || "completed",
        userId,
      },
    });

    return NextResponse.json({ blueprint }, { status: 201 });
  } catch (error) {
    console.error("Error creating blueprint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
