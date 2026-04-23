"use client";

import { AI_TOOLS } from "@/data/ai-tools";
import {
  siAnthropic,
  siGooglegemini,
  siMeta,
  siMistralai,
  siElevenlabs,
  siGithub,
  siReplit,
  siLangchain,
  siVercel,
  siN8n,
  siZapier,
  siMake,
  siFigma,
  siNotion,
  siHuggingface,
  siDatabricks,
  siIntercom,
  siWeightsandbiases,
  siX,
} from "simple-icons";

// ─── Tool → simple-icons mapping ─────────────────────────────────────────────
// Only tools with a confirmed simple-icons export are listed here.
// Everything else automatically falls back to a colored letter badge.
// Note: OpenAI, Adobe, Microsoft, Canva, Midjourney, Runway were removed from
// simple-icons for legal reasons — they use the letter fallback.
// ─────────────────────────────────────────────────────────────────────────────
const TOOL_ICONS: Record<string, { path: string; hex: string }> = {
  // ── LLMs ──
  "Claude":             siAnthropic,
  "Gemini":             siGooglegemini,
  "Llama 3":            siMeta,
  "Mistral":            siMistralai,
  "Mistral Large":      siMistralai,
  "Grok":               siX,

  // ── Voice ──
  "ElevenLabs":         siElevenlabs,

  // ── Code ──
  "GitHub Copilot":     siGithub,
  "Replit Agent":       siReplit,
  "Replit":             siReplit,

  // ── Frameworks ──
  "LangChain":          siLangchain,
  "Vercel AI SDK":      siVercel,

  // ── Automation ──
  "n8n":                siN8n,
  "Zapier":             siZapier,
  "Make":               siMake,

  // ── Design ──
  "Figma AI":           siFigma,

  // ── Knowledge ──
  "Notion AI":          siNotion,

  // ── Platform ──
  "Hugging Face":       siHuggingface,

  // ── Data ──
  "Databricks":         siDatabricks,

  // ── Support AI ──
  "Intercom Fin":       siIntercom,

  // ── MLOps ──
  "Weights & Biases":   siWeightsandbiases,
};

interface ToolLogoProps {
  name: string;
  size?: number;
}

export default function ToolLogo({ name, size = 40 }: ToolLogoProps) {
  const tool = AI_TOOLS[name] || {
    color: "#6b7280",
    letter: "?",
    category: "",
    description: "",
    differentiator: "",
  };

  const icon = TOOL_ICONS[name];

  if (icon) {
    return (
      <div
        className="rounded-[10px] flex items-center justify-center flex-shrink-0"
        style={{
          width: size,
          height: size,
          backgroundColor: `${tool.color}10`,
          border: `1.5px solid ${tool.color}25`,
        }}
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          width={size * 0.55}
          height={size * 0.55}
          fill={tool.color}
          aria-label={name}
        >
          <path d={icon.path} />
        </svg>
      </div>
    );
  }

  // Letter fallback — used for tools not in simple-icons
  return (
    <div
      className="rounded-[10px] flex items-center justify-center font-bold flex-shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: `${tool.color}12`,
        border: `1.5px solid ${tool.color}30`,
        color: tool.color,
        fontSize: size * 0.38,
      }}
    >
      {tool.letter}
    </div>
  );
}
