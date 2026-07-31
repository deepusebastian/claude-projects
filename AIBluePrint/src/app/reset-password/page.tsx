"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import Button from "@/components/Button";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) setError("Missing reset token. Please request a new reset link.");
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 3000);
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
            {success ? "Password updated" : "Choose a new password"}
          </h1>
          <p className="text-sm text-gray-500">
            {success ? "You'll be redirected to sign in shortly" : "Must be at least 8 characters"}
          </p>
        </div>

        {success ? (
          <div>
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-50 border border-green-100 mx-auto mb-6">
              <CheckCircle size={24} className="text-green-500" />
            </div>
            <p className="text-sm text-gray-500 text-center leading-relaxed mb-6">
              Your password has been updated. Redirecting you to sign in…
            </p>
            <Link href="/login">
              <Button className="w-full justify-center">
                Sign in <ArrowRight size={15} />
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
                {(error.includes("expired") || error.includes("Invalid")) && (
                  <div className="mt-2">
                    <Link href="/forgot-password" className="font-semibold underline">
                      Request a new link →
                    </Link>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3.5">
                <label className="block text-[13px] font-medium text-gray-500 mb-1.5">
                  New password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  disabled={!token}
                  className="w-full px-3.5 py-3 rounded-lg text-[16px] sm:text-sm bg-white border border-gray-200 text-gray-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all disabled:opacity-50"
                />
              </div>
              <div className="mb-6">
                <label className="block text-[13px] font-medium text-gray-500 mb-1.5">
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  disabled={!token}
                  className="w-full px-3.5 py-3 rounded-lg text-[16px] sm:text-sm bg-white border border-gray-200 text-gray-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all disabled:opacity-50"
                />
              </div>

              <Button
                type="submit"
                className="w-full justify-center"
                disabled={loading || !token}
              >
                {loading ? "Updating..." : "Update password"} <ArrowRight size={16} />
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
