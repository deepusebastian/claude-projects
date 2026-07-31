import { NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { prisma } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";
import crypto from "crypto";

// Note: db.passwordResetToken types appear after running `npx prisma generate`.
// Vercel's build does this automatically via buildCommand in vercel.json.
const db = prisma as any;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalised = email.toLowerCase().trim();

    // Always return success — never reveal whether the email exists.
    const user = await db.user.findUnique({ where: { email: normalised } });
    if (!user || !user.hashedPassword) {
      // No account, or Google-only account — silently succeed.
      return NextResponse.json({ ok: true });
    }

    // Invalidate any existing unused tokens for this email.
    await db.passwordResetToken.deleteMany({
      where: { email: normalised, usedAt: null },
    });

    // Create a new token valid for 1 hour.
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await db.passwordResetToken.create({
      data: { token, email: normalised, expiresAt },
    });

    await sendPasswordResetEmail(normalised, token);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[forgot-password]", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
