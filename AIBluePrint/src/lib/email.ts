import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "AI Blueprint <noreply@aiblueprintapps.com>";
const SITE_URL = process.env.NEXTAUTH_URL || "https://www.aiblueprintapps.com";

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${SITE_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Reset your AI Blueprint password",
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f9fafb;margin:0;padding:40px 16px;">
  <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:16px;border:1px solid #e5e7eb;overflow:hidden;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#7c3aed,#3b82f6);padding:32px 40px;text-align:center;">
      <div style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;background:rgba(255,255,255,0.15);border-radius:12px;margin-bottom:12px;">
        <span style="color:#fff;font-size:22px;">✦</span>
      </div>
      <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;">AI Blueprint</h1>
    </div>
    <!-- Body -->
    <div style="padding:40px;">
      <h2 style="margin:0 0 8px;font-size:18px;font-weight:700;color:#111827;">Reset your password</h2>
      <p style="margin:0 0 28px;font-size:14px;color:#6b7280;line-height:1.6;">
        We received a request to reset the password for your account. Click the button below to choose a new password. This link expires in <strong>1 hour</strong>.
      </p>
      <a href="${resetUrl}"
         style="display:block;background:linear-gradient(135deg,#7c3aed,#3b82f6);color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:14px 24px;border-radius:10px;text-align:center;">
        Reset Password →
      </a>
      <p style="margin:28px 0 0;font-size:12px;color:#9ca3af;line-height:1.6;">
        If you didn't request a password reset, you can safely ignore this email — your password won't change.<br><br>
        Or paste this link into your browser:<br>
        <a href="${resetUrl}" style="color:#7c3aed;word-break:break-all;">${resetUrl}</a>
      </p>
    </div>
  </div>
</body>
</html>
    `.trim(),
  });
}
