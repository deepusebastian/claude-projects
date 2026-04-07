"use client";

import { X, Sparkles, Check, ArrowRight } from "lucide-react";
import Button from "./Button";
import { useRouter } from "next/navigation";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaywallModal({ isOpen, onClose }: PaywallModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  async function handleUpgrade() {
    try {
      const res = await fetch("/api/payments/create-checkout", {
        method: "POST",
      });
      const data = await res.json();

      if (res.status === 503) {
        // Stripe not configured — friendly dev-mode message
        alert(
          "Payments are not yet configured.\n\nTo enable Stripe checkout:\n1. Create a Stripe account at stripe.com\n2. Copy your secret key to STRIPE_SECRET_KEY in .env\n3. Restart the dev server"
        );
        onClose();
        return;
      }

      if (res.status === 401) {
        router.push("/login");
        onClose();
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert("Network error. Please try again.");
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
          You&apos;ve used your free blueprint
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
          Your first AI blueprint was on us. Unlock unlimited blueprints for just
          <span className="font-bold text-gray-900"> $2.99 each</span>.
        </p>

        {/* Features */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2.5">
          {[
            "Unlimited AI blueprints",
            "Advanced pipeline customization",
            "Integration code snippets",
            "Save & version your blueprints",
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

        {/* CTA */}
        <Button
          className="w-full justify-center"
          size="lg"
          onClick={handleUpgrade}
        >
          Upgrade to Pro — $2.99 <ArrowRight size={16} />
        </Button>

        <p className="text-center text-[11px] text-gray-400 mt-3">
          One-time payment per blueprint. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
