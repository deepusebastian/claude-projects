"use client";

import { X, Sparkles, Check, ArrowRight, AlertCircle, Zap } from "lucide-react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

async function startCheckout(plan: "single" | "pro"): Promise<{ url?: string; error?: string }> {
  const res = await fetch("/api/payments/create-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  });

  let data: any = {};
  try { data = await res.json(); } catch { /* ignore */ }

  if (res.status === 503) {
    return { error: "Payments aren't configured yet. Please contact support." };
  }
  if (!res.ok) {
    return { error: data?.message || data?.error || "Something went wrong. Please try again." };
  }
  if (!data.url) {
    return { error: "Checkout URL not returned. Please try again." };
  }
  return { url: data.url };
}

export default function PaywallModal({ isOpen, onClose }: PaywallModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<"single" | "pro" | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handlePlan(plan: "single" | "pro") {
    setError(null);
    setLoading(plan);

    // Unauthenticated → redirect to login
    const authCheck = await fetch("/api/blueprints");
    if (authCheck.status === 401) {
      router.push("/login");
      onClose();
      return;
    }

    const result = await startCheckout(plan);

    if (result.error) {
      setError(result.error);
      setLoading(null);
      return;
    }

    window.location.href = result.url!;
    // Don't reset loading — page is navigating
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-[480px] w-full p-8 animate-in">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-blue-500 flex items-center justify-center text-white mx-auto mb-5">
          <Sparkles size={26} />
        </div>

        <h2 className="text-xl font-bold text-gray-900 text-center mb-1.5">
          Unlock your blueprint
        </h2>
        <p className="text-sm text-gray-500 text-center mb-7 leading-relaxed">
          Your free unlock has been used. Choose a plan to keep building.
        </p>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 px-3 py-2.5 mb-5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[13px]">
            <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Plan cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">

          {/* Single blueprint */}
          <div className="border border-gray-200 rounded-xl p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={15} className="text-amber-500" />
              <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wide">
                Single
              </span>
            </div>
            <p className="text-[28px] font-extrabold text-gray-900 mb-0.5">$2.99</p>
            <p className="text-xs text-gray-400 mb-4">one-time · 1 blueprint credit</p>
            <ul className="space-y-1.5 mb-5 flex-1">
              {[
                "1 full blueprint unlock",
                "Step-by-step tool details",
                "Expert reasoning",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-[12px] text-gray-500">
                  <Check size={12} className="text-amber-500 flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-center"
              onClick={() => handlePlan("single")}
              disabled={loading !== null}
            >
              {loading === "single" ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                  Starting…
                </>
              ) : (
                <>Buy for $2.99 <ArrowRight size={13} /></>
              )}
            </Button>
          </div>

          {/* Pro subscription */}
          <div className="border-2 border-brand-500 rounded-xl p-5 flex flex-col relative shadow-[0_4px_16px_rgba(108,60,239,0.12)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-br from-brand-500 to-blue-500 px-3 py-0.5 rounded-full text-[11px] font-bold text-white whitespace-nowrap">
              Best value
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={15} className="text-brand-500" />
              <span className="text-[11px] font-bold text-brand-500 uppercase tracking-wide">
                Pro
              </span>
            </div>
            <p className="text-[28px] font-extrabold text-gray-900 mb-0.5">$9.99</p>
            <p className="text-xs text-gray-400 mb-4">per month · cancel anytime</p>
            <ul className="space-y-1.5 mb-5 flex-1">
              {[
                "Unlimited blueprints",
                "Full details & reasoning",
                "Save & export PDF",
                "Priority access",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-[12px] text-gray-500">
                  <Check size={12} className="text-brand-500 flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Button
              size="sm"
              className="w-full justify-center"
              onClick={() => handlePlan("pro")}
              disabled={loading !== null}
            >
              {loading === "pro" ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Starting…
                </>
              ) : (
                <>Go Pro — $9.99/mo <ArrowRight size={13} /></>
              )}
            </Button>
          </div>
        </div>

        <p className="text-center text-[11px] text-gray-400">
          Payments secured by Stripe. Pro is a recurring subscription — cancel anytime.
        </p>
      </div>
    </div>
  );
}
