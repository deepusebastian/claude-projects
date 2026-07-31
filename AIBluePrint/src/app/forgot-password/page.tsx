"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, Mail } from "lucide-react";
import Button from "@/components/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-[120px] pb-16 bg-gray-50">
      <div className="w-full max-w-[400px] bg-white border border-gray-200 rounded-2xl p-6 sm:p-9 shadow-lg">

        {/* Header */}
        <div className="text-center mb-7">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-blue-500 flex items-center justify-center text-white mx-auto mb-3.5">
            <Sparkles size={22} />
          </div>
          <h1 className="text-[22px] font-bold text-gray-900 mb-1.5">
            {submitted ? "Check your email" : "Forgot password?"}
          </h1>
          <p className="text-sm text-gray-500">
            {submitted
              ? `We sent a reset link to ${email}`
              : "Enter your email and we'll send you a reset link"}
          </p>
        </div>

        {submitted ? (
          /* Success state */
          <div>
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-50 border border-green-100 mx-auto mb-6">
              <Mail size={24} className="text-green-500" />
            </div>
            <p className="text-sm text-gray-500 text-center leading-relaxed mb-6">
              If an account exists for <strong>{email}</strong>, you'll receive a password reset link shortly. Check your spam folder if it doesn't arrive within a minute.
            </p>
            <Link href="/login">
              <Button className="w-full justify-center" variant="secondary">
                <ArrowLeft size={15} /> Back to sign in
              </Button>
            </Link>
          </div>
        ) : (
          /* Request form */
          <>
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-[13px] font-medium text-gray-500 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  className="w-full px-3.5 py-3 rounded-lg text-[16px] sm:text-sm bg-white border border-gray-200 text-gray-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                />
              </div>

              <Button type="submit" className="w-full justify-center" disabled={loading}>
                {loading ? "Sending..." : "Send reset link"}
              </Button>
            </form>

            <p className="text-center mt-5 text-[13px] text-gray-400">
              Remember your password?{" "}
              <Link href="/login" className="text-brand-500 font-semibold hover:text-brand-600">
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
