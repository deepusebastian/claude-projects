"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Lock, CheckCircle, XCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import PipelineCard from "@/components/PipelineCard";
import PaywallModal from "@/components/PaywallModal";
import { PAYMENTS_ENABLED } from "@/lib/flags";
import {
  PIPELINE_SCENARIOS,
  SUGGESTION_CHIPS,
  classifyInput,
  Pipeline,
} from "@/data/pipelines";

interface Message {
  role: "user" | "assistant";
  type: "text" | "pipeline" | "signup-prompt";
  content: string | Pipeline;
  /** Each pipeline message tracks its own locked state */
  isLocked?: boolean;
}

const LS_MESSAGES_KEY = "ai-blueprint-messages";
const LS_UNLOCKED_KEY = "ai-blueprint-unlocked";
const LS_PRO_KEY = "ai-blueprint-pro";
const LS_USER_KEY  = "ai-blueprint-user";

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    type: "text",
    content:
      "Welcome to AI Blueprint! Describe your idea, business, or problem — and I'll map out the perfect AI tool pipeline for you.",
  },
];

export default function BuilderClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [paymentBanner, setPaymentBanner] = useState<"success" | "success-single" | "cancelled" | null>(null);
  const [unlockedCount, setUnlockedCount] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // ─── Hydrate state from localStorage — user-scoped ────────────────────────
  // Wait for the session to resolve before reading localStorage so we can
  // detect a user change and wipe the previous user's cached messages.
  useEffect(() => {
    if (status === "loading") return; // session not ready yet

    const currentUserId =
      (session?.user as any)?.id ?? session?.user?.email ?? "guest";
    const storedUserId = localStorage.getItem(LS_USER_KEY);

    if (storedUserId && storedUserId !== currentUserId) {
      // A different user is now active — clear the previous user's cache
      localStorage.removeItem(LS_MESSAGES_KEY);
      localStorage.removeItem(LS_UNLOCKED_KEY);
      localStorage.removeItem(LS_PRO_KEY);
    }

    // Record the active user so we can detect the next switch
    localStorage.setItem(LS_USER_KEY, currentUserId);

    try {
      const storedMessages = localStorage.getItem(LS_MESSAGES_KEY);
      if (storedMessages) {
        const parsed = JSON.parse(storedMessages) as Message[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
      const storedUnlocked = localStorage.getItem(LS_UNLOCKED_KEY);
      if (storedUnlocked) setUnlockedCount(parseInt(storedUnlocked, 10));
      const storedPro = localStorage.getItem(LS_PRO_KEY);
      if (storedPro === "true") setIsPro(true);
    } catch {
      // ignore corrupt localStorage
    }
    setHydrated(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]); // re-run only when session resolves (loading → auth/unauth)

  // ─── Persist messages to localStorage whenever they change ─────────────────
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LS_MESSAGES_KEY, JSON.stringify(messages));
    } catch {
      // ignore quota / serialization errors
    }
  }, [messages, hydrated]);

  // ─── Handle payment redirect ───────────────────────────────────────────────
  useEffect(() => {
    if (!hydrated) return;
    const status = searchParams.get("payment");
    if (status === "success") {
      const plan = searchParams.get("plan"); // "single" | "pro"

      if (plan === "pro") {
        // Pro: mark as Pro, unlock all existing pipelines
        setIsPro(true);
        localStorage.setItem(LS_PRO_KEY, "true");
        setMessages((prev) =>
          prev.map((msg) =>
            msg.type === "pipeline" ? { ...msg, isLocked: false } : msg
          )
        );
      } else {
        // Single blueprint purchase: unlock the most recent locked pipeline only
        setMessages((prev) => {
          let unlocked = false;
          return [...prev].reverse().map((msg) => {
            if (!unlocked && msg.type === "pipeline" && msg.isLocked) {
              unlocked = true;
              return { ...msg, isLocked: false };
            }
            return msg;
          }).reverse();
        });
        // Also count it as an unlock so the free slot stays consumed
        const newCount = unlockedCount + 1;
        setUnlockedCount(newCount);
        localStorage.setItem(LS_UNLOCKED_KEY, String(newCount));
      }

      setPaymentBanner(plan === "pro" ? "success" : "success-single");
      router.replace("/builder");
    } else if (status === "cancelled") {
      setPaymentBanner("cancelled");
      router.replace("/builder");
    }
    if (status) {
      const t = setTimeout(() => setPaymentBanner(null), 6000);
      return () => clearTimeout(t);
    }
  }, [searchParams, router, hydrated]);

  useEffect(() => {
    if (!hydrated || messages.length <= 1) return;
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, hydrated]);

  const hasFreeUnlock = unlockedCount === 0 && !isPro;

  // Count how many pipelines a guest has already generated
  const guestPipelineCount = !session
    ? messages.filter((m) => m.type === "pipeline").length
    : 0;
  const isGuestAtLimit = !session && guestPipelineCount >= 1;

  const handleUnlock = useCallback(
    (messageIndex: number) => {
      // Payments off → always unlock, never show paywall
      if (!PAYMENTS_ENABLED) {
        setMessages((prev) =>
          prev.map((msg, i) =>
            i === messageIndex ? { ...msg, isLocked: false } : msg
          )
        );
        return;
      }
      // Pro users — everything is already unlocked but guard just in case
      if (isPro) {
        setMessages((prev) =>
          prev.map((msg, i) =>
            i === messageIndex ? { ...msg, isLocked: false } : msg
          )
        );
        return;
      }
      if (hasFreeUnlock) {
        setMessages((prev) =>
          prev.map((msg, i) =>
            i === messageIndex ? { ...msg, isLocked: false } : msg
          )
        );
        const newCount = unlockedCount + 1;
        setUnlockedCount(newCount);
        localStorage.setItem(LS_UNLOCKED_KEY, String(newCount));
      } else {
        setShowPaywall(true);
      }
    },
    [hasFreeUnlock, unlockedCount, isPro]
  );

  function handleSend() {
    if (!input.trim() || isTyping) return;

    // Guest at limit — don't generate, the signup prompt is already visible
    if (isGuestAtLimit) return;

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
      const isGuest = !session;

      setMessages((prev) => {
        const next: Message[] = [
          ...prev,
          {
            role: "assistant",
            type: "pipeline",
            content: pipeline,
            // When payments are disabled every blueprint is free; otherwise lock
            // unless the user is already Pro.
            isLocked: PAYMENTS_ENABLED ? !isPro : false,
          },
        ];
        // After a guest's first blueprint, append a signup prompt
        if (isGuest) {
          next.push({ role: "assistant", type: "signup-prompt", content: "" });
        }
        return next;
      });
      setIsTyping(false);
    }, 2200);
  }

  function handleNewBlueprint() {
    setMessages(INITIAL_MESSAGES);
    // No need to clear unlocked/Pro — those persist across new blueprints
  }

  return (
    <div className="min-h-screen flex flex-col pt-[76px] pb-6 px-6 max-w-[860px] mx-auto">
      <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} />

      {paymentBanner === "success" && (
        <div className="flex items-center gap-2.5 px-4 py-3 mb-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
          <CheckCircle size={16} className="flex-shrink-0" />
          You&apos;re now Pro! Your blueprint is fully unlocked and all future blueprints will be too.
          <button onClick={() => setPaymentBanner(null)} className="ml-auto text-green-500 hover:text-green-700">✕</button>
        </div>
      )}
      {paymentBanner === "success-single" && (
        <div className="flex items-center gap-2.5 px-4 py-3 mb-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
          <CheckCircle size={16} className="flex-shrink-0" />
          Blueprint unlocked! Your $2.99 credit has been applied.
          <button onClick={() => setPaymentBanner(null)} className="ml-auto text-green-500 hover:text-green-700">✕</button>
        </div>
      )}
      {paymentBanner === "cancelled" && (
        <div className="flex items-center gap-2.5 px-4 py-3 mb-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium">
          <XCircle size={16} className="flex-shrink-0" />
          Checkout cancelled. You can still unlock your first blueprint free.
          <button onClick={() => setPaymentBanner(null)} className="ml-auto text-amber-500 hover:text-amber-700">✕</button>
        </div>
      )}

      <div className="text-center py-4 pb-7">
        <h1 className="text-[26px] font-bold text-gray-900 mb-1.5">
          Pipeline Builder
        </h1>
        <p className="text-sm text-gray-400">
          Describe your idea and get an instant AI tool blueprint
        </p>
        {!PAYMENTS_ENABLED ? (
          <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium border border-green-200">
            <Sparkles size={12} />
            Free — sign in to generate blueprints
          </div>
        ) : isPro ? (
          <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-gradient-to-br from-brand-500 to-blue-500 text-white text-xs font-semibold">
            <Sparkles size={12} />
            Pro — Unlimited blueprints
          </div>
        ) : hasFreeUnlock ? (
          <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            First blueprint unlock is free
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-medium border border-amber-200">
            <Lock size={12} />
            Free unlock used — upgrade to Pro for unlimited
          </div>
        )}
        {messages.length > 1 && (
          <div className="mt-3">
            <button
              onClick={handleNewBlueprint}
              className="text-xs font-medium text-gray-400 hover:text-brand-500 underline transition-colors"
            >
              Start a new blueprint
            </button>
          </div>
        )}
      </div>

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
            ) : msg.type === "signup-prompt" ? (
              <div className="w-full max-w-[520px] bg-gradient-to-br from-brand-50 to-blue-50 border border-brand-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-brand-500" />
                  <p className="text-sm font-bold text-gray-900">
                    Want more blueprints?
                  </p>
                </div>
                <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                  You&apos;ve used your free blueprint. Create a free account to
                  generate unlimited blueprints and save your work.
                </p>
                <div className="flex gap-2.5">
                  <Link
                    href="/signup"
                    className="flex-1 text-center px-4 py-2.5 rounded-xl bg-gradient-to-br from-brand-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
                  >
                    Create free account
                  </Link>
                  <Link
                    href="/login"
                    className="flex-1 text-center px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:border-gray-300 transition-colors"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            ) : (
              <PipelineCard
                pipeline={msg.content as Pipeline}
                isLocked={PAYMENTS_ENABLED ? (msg.isLocked ?? true) : false}
                hasFreeUnlock={hasFreeUnlock}
                onUnlock={() => handleUnlock(i)}
                onPaywallNeeded={PAYMENTS_ENABLED ? () => setShowPaywall(true) : undefined}
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

      {isGuestAtLimit ? (
        <div className="flex items-center gap-3 p-4 rounded-[14px] border border-brand-100 bg-brand-50">
          <Lock size={15} className="text-brand-400 flex-shrink-0" />
          <p className="text-sm text-brand-700 flex-1">
            Sign up to keep building — it&apos;s free.
          </p>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-lg bg-gradient-to-br from-brand-500 to-blue-500 text-white text-xs font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Create account
          </Link>
        </div>
      ) : (
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
      )}
    </div>
  );
}
