import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Resend } from "resend";
import { authOptions } from "@/lib/auth";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "AI Blueprint <noreply@aiblueprintapps.com>";
const TO = "lunarcaster90@gmail.com";

// ─── IP Rate Limiter ──────────────────────────────────────────────────────────
// Module-level store persists across warm serverless invocations.
// Keyed by IP; value is { count, windowStart }.
const RATE_LIMIT_MAX = 3;           // max submissions
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // per 15 minutes

const ipStore = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipStore.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipStore.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count += 1;
  return false;
}

// Periodically prune stale entries to prevent unbounded memory growth
function pruneStore() {
  const now = Date.now();
  ipStore.forEach((entry, ip) => {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      ipStore.delete(ip);
    }
  });
}

// ─── Handler ─────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. Require authenticated session
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "You must be logged in to submit an inquiry." },
      { status: 401 }
    );
  }

  // 2. IP rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  pruneStore();
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // 3. Content-Type check
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Invalid request." }, { status: 415 });
  }

  // 4. Payload size guard (16 KB max)
  const body = await req.text();
  if (body.length > 16_000) {
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  }

  // 5. Parse & validate
  let payload: Record<string, string>;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const { name, email, phone, timeline, budget, additionalInfo, _honeypot } =
    payload;

  // Honeypot: bots fill this hidden field; humans leave it blank
  if (_honeypot) {
    return NextResponse.json({ success: true }); // silently swallow
  }

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  // 6. Send email
  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New Consulting Inquiry from ${name}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f9fafb;margin:0;padding:40px 16px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;border:1px solid #e5e7eb;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#7c3aed,#3b82f6);padding:32px 40px;text-align:center;">
      <div style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;background:rgba(255,255,255,0.15);border-radius:12px;margin-bottom:12px;">
        <span style="color:#fff;font-size:22px;">✦</span>
      </div>
      <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;">New Consulting Inquiry</h1>
      <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px;">via AI Blueprint</p>
    </div>
    <div style="padding:40px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;width:140px;vertical-align:top;">
            <span style="font-size:12px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">Account</span>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
            <span style="font-size:14px;color:#111827;">${session.user.email}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
            <span style="font-size:12px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">Name</span>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
            <span style="font-size:14px;color:#111827;font-weight:500;">${name}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
            <span style="font-size:12px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">Email</span>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
            <a href="mailto:${email}" style="font-size:14px;color:#7c3aed;text-decoration:none;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
            <span style="font-size:12px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">Phone</span>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
            <span style="font-size:14px;color:#111827;">${phone || "—"}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
            <span style="font-size:12px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">Timeline</span>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
            <span style="font-size:14px;color:#111827;">${timeline || "—"}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
            <span style="font-size:12px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">Budget</span>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
            <span style="font-size:14px;color:#111827;">${budget || "—"}</span>
          </td>
        </tr>
        ${
          additionalInfo
            ? `<tr>
          <td style="padding:12px 0;vertical-align:top;">
            <span style="font-size:12px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">Notes</span>
          </td>
          <td style="padding:12px 0;vertical-align:top;">
            <span style="font-size:14px;color:#111827;line-height:1.6;white-space:pre-wrap;">${additionalInfo}</span>
          </td>
        </tr>`
            : ""
        }
      </table>
    </div>
    <div style="padding:20px 40px;background:#f9fafb;border-top:1px solid #e5e7eb;">
      <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
        Sent from AI Blueprint Pipeline Builder · <a href="https://www.aiblueprintapps.com" style="color:#7c3aed;text-decoration:none;">aiblueprintapps.com</a>
      </p>
    </div>
  </div>
</body>
</html>
      `.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Consulting inquiry error:", err);
    return NextResponse.json(
      { error: "Failed to send inquiry." },
      { status: 500 }
    );
  }
}
