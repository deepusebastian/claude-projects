"use client";

import { Pipeline } from "@/data/pipelines";
import { AI_TOOLS } from "@/data/ai-tools";
import ToolLogo from "./ToolLogo";
import Button from "./Button";
import { Download, ArrowRight, Lightbulb, Check, Lock, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PipelineCardProps {
  pipeline: Pipeline;
  /** When true, step details + reasoning are blurred. Defaults to true. */
  isLocked?: boolean;
  onUnlock?: () => void;
  onPaywallNeeded?: () => void;
}

export default function PipelineCard({
  pipeline,
  isLocked = true,
  onUnlock,
  onPaywallNeeded,
}: PipelineCardProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!session) {
      router.push("/signup");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/blueprints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: pipeline.title,
          prompt: pipeline.summary,
          scenario: "saved",
          pipeline: pipeline,
          status: "completed",
        }),
      });
      if (res.ok) {
        setSaved(true);
      } else if (res.status === 402) {
        if (onPaywallNeeded) onPaywallNeeded();
      }
    } catch {
      setSaved(true);
    }
    setSaving(false);
  }

  return (
    <div className="w-full max-w-[680px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 bg-gray-50 border-b border-gray-100">
        <p className="text-[11px] font-bold text-brand-500 uppercase tracking-[0.08em] mb-1.5">
          Your AI Blueprint
        </p>
        <h3 className="text-lg font-bold text-gray-900">{pipeline.title}</h3>
        <p className="text-[12px] text-gray-400 mt-1">
          {pipeline.steps.length} tools · tailored to your use case
        </p>
      </div>

      {/* Steps */}
      <div className="px-6 py-5">
        {pipeline.steps.map((step, i) => {
          const tool = AI_TOOLS[step.tool];
          const isExpanded = expandedStep === i;

          return (
            <div key={i}>
              <div className="flex gap-3.5">
                {/* Left column — logo + connector */}
                <div className="flex flex-col items-center">
                  <ToolLogo name={step.tool} size={42} />
                  {i < pipeline.steps.length - 1 && (
                    <div
                      className="w-0.5 my-1.5 bg-gradient-to-b from-gray-200 to-transparent transition-all duration-200"
                      style={{ height: isExpanded ? 72 : 36 }}
                    />
                  )}
                </div>

                {/* Right column — tool info */}
                <div className="flex-1 pt-0.5 min-w-0">
                  {/* Tool name + category — always visible */}
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="font-bold text-gray-900 text-sm">
                      {step.tool}
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide whitespace-nowrap"
                      style={{
                        backgroundColor: `${tool?.color}14`,
                        color: tool?.color,
                        border: `1px solid ${tool?.color}25`,
                      }}
                    >
                      {tool?.category}
                    </span>
                  </div>

                  {/* Role label — always visible */}
                  <p className="text-xs font-semibold text-brand-500 mb-0.5">
                    {step.role}
                  </p>

                  {/* Step detail + reasoning — locked behind paywall */}
                  {isLocked ? (
                    <div className="relative mt-1">
                      {/* Blurred preview */}
                      <p
                        className="text-[13px] text-gray-500 leading-relaxed select-none"
                        style={{ filter: "blur(4px)", userSelect: "none", pointerEvents: "none" }}
                        aria-hidden="true"
                      >
                        {step.detail}
                      </p>
                      {/* Lock icon overlay */}
                      <div className="absolute inset-0 flex items-center gap-1.5">
                        <Lock size={11} className="text-gray-400 flex-shrink-0" />
                        <span className="text-[11px] text-gray-400 font-medium">
                          Unlock to see full details
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-[13px] text-gray-500 leading-relaxed">
                        {step.detail}
                      </p>
                      {/* Why this tool — expandable, only when unlocked */}
                      <button
                        onClick={() => setExpandedStep(isExpanded ? null : i)}
                        className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-brand-400 hover:text-brand-600 transition-colors"
                      >
                        <Lightbulb size={12} />
                        {isExpanded ? "Hide reasoning" : "Why this tool?"}
                      </button>
                      {isExpanded && (
                        <div className="mt-1.5 px-3 py-2 rounded-lg bg-brand-50 border border-brand-100 text-[12px] text-brand-700 leading-relaxed">
                          {step.reason}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary — always visible but blurred when locked */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        {isLocked ? (
          <div className="relative">
            <p
              className="text-[13px] text-gray-500 leading-relaxed select-none"
              style={{ filter: "blur(4px)", userSelect: "none", pointerEvents: "none" }}
              aria-hidden="true"
            >
              {pipeline.summary}
            </p>
            <div className="absolute inset-0 flex items-center gap-1.5">
              <Lock size={11} className="text-gray-400 flex-shrink-0" />
              <span className="text-[11px] text-gray-400 font-medium">
                Full blueprint summary unlocked after purchase
              </span>
            </div>
          </div>
        ) : (
          <p className="text-[13px] text-gray-500 leading-relaxed">
            {pipeline.summary}
          </p>
        )}
      </div>

      {/* Unlock CTA — shown when locked */}
      {isLocked && (
        <div className="px-6 py-5 bg-gradient-to-br from-brand-50 to-blue-50 border-t border-brand-100">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 mb-0.5">
                Unlock your full AI blueprint
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                See exactly how to use each tool, why it was chosen, and get
                step-by-step integration guidance.
              </p>
            </div>
            <Button
              size="sm"
              onClick={onUnlock}
              style={{ whiteSpace: "nowrap", flexShrink: 0 }}
            >
              <Sparkles size={14} /> Unlock — $2.99
            </Button>
          </div>

          {/* Trust signals */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-brand-100">
            {["One-time payment", "Instant access", "Save & export included"].map((t) => (
              <span key={t} className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                <Check size={10} className="text-brand-400" /> {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions — shown when unlocked */}
      {!isLocked && (
        <div className="px-6 py-3.5 flex gap-2.5 justify-end border-t border-gray-100">
          <Button variant="secondary" size="sm">
            <Download size={14} /> Export PDF
          </Button>
          {saved ? (
            <Button size="sm" variant="secondary" disabled>
              <Check size={14} className="text-green-500" /> Saved
            </Button>
          ) : (
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Blueprint"}{" "}
              <ArrowRight size={14} />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
