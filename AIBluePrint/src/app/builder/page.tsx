"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Lock, CheckCircle, XCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import PipelineCard from "@/components/PipelineCard";
import PaywallModal from "@/components/PaywallModal";
import {
  PIPELINE_SCENARIOS,
  SUGGESTION_CHIPS,
  classifyInput,
  Pipeline,
} from "@/data/pipelines";

interface Message {
  role: "user" | "assistant";
  type: "text" | "pipeline";
  content: string | Pipeline;
  /** Each pipeline message tracks its own locked state */
  isLocked?: boolean;
}

export default function BuilderPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      type: "text",
      content:
        "Welcome to AI Blueprint! Describe your idea, business, or problem — and I'll map out the perfect AI tool pipeline for you.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [paymentBanner, setPaymentBanner] = useState<"success" | "cancelled" | null>(null);

  // Track how many blueprints have been fully unlocked this session
  const [unlockedCount, setUnlockedCount] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load unlocked count from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("ai-blueprint-unlocked");
    if (stored) setUnlockedCount(parseInt(stored, 10));
  }, []);

  // Handle Stripe redirect params (?payment=success|cancelled)
  useEffect(() => {
    const status = searchParams.get("payment");
    if (status === "success") {
      setPaymentBanner("success");
      router.replace("/builder");
      // Unlock the most recent blueprint on successful payment
      setMessages((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1 && msg.type === "pipeline"
            ? { ...msg, isLocked: false }
            : msg
        )
      );
    } else if (status === "cancelled") {
      setPaymentBanner("cancelled");
      router.replace("/builder");
    }
    if (status) {
      const t = setTimeout(() => setPaymentBanner(null), 6000);
      return () => clearTimeout(t);
    }
  }, [searchParams, router]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Whether the user gets their first blueprint free (not yet unlocked anything)
  const hasFreeUnlock = unlockedCount === 0;

  const handleUnlock = useCallback(
    (messageIndex: number) => {
      if (hasFreeUnlock) {
        // First unlock is free — reveal immediately
        setMessages((prev) =>
          prev.map((msg, i) =>
            i === messageIndex ? { ...msg, isLocked: false } : msg
          )
        );
        const newCount = unlockedCount + 1;
        setUnlockedCount(newCount);
        localStorage.setItem("ai-blueprint-unlocked", String(newCount));
      } else {
        // Subsequent unlocks require payment
        setShowPaywall(true);
      }
    },
    [hasFreeUnlock, unlockedCount]
  );

  function handleSend() {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "user", type: "text", content: userMsg },
    ]);
    setIsTyping(true);

    setTimeout(() => {
      const scenario = classifyInput(userMsg);
      const pipeline = PIPELINE_SCENARIOS[scenario];
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          type: "pipeline",
          content: pipeline,
          // Always start locked — user clicks "Unlock" to reveal
          isLocked: true,
        },
      ]);
      setIsTyping(false);
    }, 2200);
  }

  return (
    <div className="min-h-screen flex flex-col pt-[76px] pb-6 px-6 max-w-[860px] mx-auto">
      {/* Paywall Modal */}
      <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} />

      {/* Payment status banners */}
      {paymentBanner === "success" && (
        <div className="flex items-center gap-2.5 px-4 py-3 mb-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
          <CheckCircle size={16} className="flex-shrink-0" />
          Payment successful! Your full blueprint is now unlocked.
          <button onClick={() => setPaymentBanner(null)} className="ml-auto text-green-500 hover:text-green-700">✕</button>
        </div>
      )}
      {paymentBanner === "cancelled" && (
        <div className="flex items-center gap-2.5 px-4 py-3 mb-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium">
          <XCircle size={16} className="flex-shrink-0" />
          Payment was cancelled. You can still unlock your first blueprint free.
          <button onClick={() => setPaymentBanner(null)} className="ml-auto text-amber-500 hover:text-amber-700">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="text-center py-4 pb-7">
        <h1 className="text-[26px] font-bold text-gray-900 mb-1.5">
          Pipeline Builder
        </h1>
        <p className="text-sm text-gray-400">
          Describe your idea and get an instant AI tool blueprint
        </p>
        {hasFreeUnlock ? (
          <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            First blueprint unlock is free
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-medium border border-amber-200">
            <Lock size={12} />
            Free unlock used — $2.99 per additional blueprint
          </div>
        )}
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4 scrollbar-thin">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.type === "text" ? (
              <div
                className={`max-w-[75%] px-[18px] py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-brand-500 to-blue-500 text-white rounded-2xl rounded-br-sm"
                    : "bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl rounded-bl-sm"
                }`}
              >
                {msg.content as string}
              </div>
            ) : (
              <PipelineCard
                pipeline={msg.content as Pipeline}
                isLocked={msg.isLocked ?? true}
                onUnlock={() => handleUnlock(i)}
                onPaywallNeeded={() => setShowPaywall(true)}
              />
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="px-[18px] py-3 rounded-2xl rounded-bl-sm bg-gray-50 border border-gray-200 text-brand-500 flex items-center gap-1.5 text-sm">
              <span className="animate-pulse-soft">Analyzing your idea</span>
              <span>...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggestion chips */}
      {messages.length === 1 && (
        <div className="flex gap-2 flex-wrap justify-center mb-3.5">
          {SUGGESTION_CHIPS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setInput(s)}
              className="px-3.5 py-[7px] rounded-full text-[12px] font-medium bg-brand-50 text-brand-500 border-none hover:bg-brand-100 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input area — always available for generating new blueprints */}
      <div className="flex gap-2.5 items-end p-3.5 rounded-[14px] border bg-gray-50 border-gray-200">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Describe your idea, business, or problem..."
          rows={2}
          className="flex-1 resize-none bg-transparent border-none text-gray-900 text-sm leading-relaxed outline-none placeholder:text-gray-400"
        />
        <Button size="sm" onClick={handleSend} disabled={!input.trim() || isTyping}>
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
}
