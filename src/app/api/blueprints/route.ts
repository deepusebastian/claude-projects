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

    // Check if user has used their free blueprint
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Count existing blueprints
    const blueprintCount = await prisma.blueprint.count({
      where: { userId },
    });

    // First blueprint is free; subsequent ones require payment
    if (blueprintCount >= 1 && !user.freeBlueprintUsed) {
      // Mark free blueprint as used
      await prisma.user.update({
        where: { id: userId },
        data: { freeBlueprintUsed: true },
      });
    } else if (blueprintCount >= 1) {
      // Check for a recent successful payment
      const recentPayment = await prisma.payment.findFirst({
        where: {
          userId,
          status: "succeeded",
        },
        orderBy: { createdAt: "desc" },
      });

      if (!recentPayment) {
        return NextResponse.json(
          {
            error: "Payment required",
            message:
              "Your free blueprint has been used. Please purchase a blueprint for $2.99.",
            requiresPayment: true,
          },
          { status: 402 }
        );
      }
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
