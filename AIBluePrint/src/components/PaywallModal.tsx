"use client";

import { X, Sparkles, Check, ArrowRight, AlertCircle } from "lucide-react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaywallModal({ isOpen, onClose }: PaywallModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleUpgrade() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/payments/create-checkout", {
        method: "POST",
      });

      // Attempt to parse JSON, but don't fail the whole flow if it's not JSON
      let data: any = {};
      try {
        data = await res.json();
      } catch {
        // ignore
      }

      if (res.status === 503) {
        setError(
          "Payments aren't configured yet. Please contact support — Stripe keys haven't been set up on the server."
        );
        setLoading(false);
        return;
      }

      if (res.status === 401) {
        router.push("/login");
        onClose();
        return;
      }

      if (!res.ok) {
        setError(
          data?.message ||
            data?.error ||
            "Something went wrong starting checkout. Please try again."
        );
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
        return; // don't reset loading — page is navigating
      }

      setError("Checkout URL not returned. Please try again.");
      setLoading(false);
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-[420px] w-full p-8 animate-in">
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

        {/* Content */}
        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
          Upgrade to AI Blueprint Pro
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
          Unlock{" "}
          <span className="font-bold text-gray-900">unlimited AI blueprints</span>{" "}
          and the full expert breakdown for just{" "}
          <span className="font-bold text-gray-900">$9.99/month</span>. Cancel
          anytime.
        </p>

        {/* Features */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2.5">
          {[
            "Unlimited AI blueprints",
            "Full step-by-step implementation details",
            "Expert reasoning for every tool choice",
            "Save & export every blueprint as PDF",
            "Priority AI model access",
          ].map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2.5 text-sm text-gray-600"
            >
              <Check size={15} className="text-brand-500 flex-shrink-0" />
              {feature}
            </div>
          ))}
        </div>

        {/* Error banner */}
        {error && (
          <div className="flex items-start gap-2 px-3 py-2.5 mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[13px]">
            <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* CTA */}
        <Button
          className="w-full justify-center"
          size="lg"
          onClick={handleUpgrade}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Starting checkout…
            </>
          ) : (
            <>
              Upgrade to Pro — $9.99/month <ArrowRight size={16} />
            </>
          )}
        </Button>

        <p className="text-center text-[11px] text-gray-400 mt-3">
          Recurring monthly subscription. Cancel anytime from your account.
        </p>
      </div>
    </div>
  );
}
