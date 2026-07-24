"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Button from "@/components/Button";
import PipelineCard from "@/components/PipelineCard";
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
}

const LS_MESSAGES_KEY = "ai-blueprint-messages";
const LS_USER_KEY = "ai-blueprint-user";

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

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // ─── Hydrate from localStorage — user-scoped ──────────────────────────────
  useEffect(() => {
    if (status === "loading") return;

    const currentUserId =
      (session?.user as any)?.id ?? session?.user?.email ?? "guest";
    const storedUserId = localStorage.getItem(LS_USER_KEY);

    if (storedUserId && storedUserId !== currentUserId) {
      localStorage.removeItem(LS_MESSAGES_KEY);
    }

    localStorage.setItem(LS_USER_KEY, currentUserId);

    try {
      const storedMessages = localStorage.getItem(LS_MESSAGES_KEY);
      if (storedMessages) {
        const parsed = JSON.parse(storedMessages) as Message[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // ignore corrupt localStorage
    }
    setHydrated(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // ─── Persist messages ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LS_MESSAGES_KEY, JSON.stringify(messages));
    } catch {
      // ignore quota / serialization errors
    }
  }, [messages, hydrated]);

  // ─── Auto-scroll (only after first message sent) ──────────────────────────
  useEffect(() => {
    if (!hydrated || messages.length <= 1) return;
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, hydrated]);

  // Count how many pipelines a guest has already generated
  const guestPipelineCount = !session
    ? messages.filter((m) => m.type === "pipeline").length
    : 0;
  const isGuestAtLimit = !session && guestPipelineCount >= 1;

  function handleSend() {
    if (!input.trim() || isTyping) return;

    // Guest at limit — signup prompt is already visible
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
          { role: "assistant", type: "pipeline", content: pipeline },
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
  }

  return (
    <div className="min-h-screen flex flex-col pt-[104px] pb-6 px-4 sm:px-6 max-w-[860px] mx-auto">
      <div className="text-center py-4 pb-7">
        <h1 className="text-[26px] font-bold text-gray-900 mb-1.5">
          Pipeline Builder
        </h1>
        <p className="text-sm text-gray-400">
          Describe your idea and get an instant AI tool blueprint
        </p>
        <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Free — no account needed to try
        </div>
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
              <PipelineCard pipeline={msg.content as Pipeline} />
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
            className="flex-1 resize-none bg-transparent border-none text-gray-900 text-[16px] sm:text-sm leading-relaxed outline-none placeholder:text-gray-400"
          />
          <Button size="sm" onClick={handleSend} disabled={!input.trim() || isTyping}>
            <Send size={16} />
          </Button>
        </div>
      )}
    </div>
  );
}
