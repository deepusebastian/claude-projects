"use client";

import { useState } from "react";
import { AI_TOOLS } from "@/data/ai-tools";

// ─── Reliable public logo sources (no API key required) ─────────────────────
//  • cdn.simpleicons.org — free SVG icons, no auth, color-customizable
//  • Official brand CDN  — direct from the company's own CDN
//  • logo.clearbit.com   — widely-used public logo API (PNG fallback)
// ─────────────────────────────────────────────────────────────────────────────
const TOOL_LOGOS: Record<string, string> = {
  // ── LLMs ──
  "OpenAI GPT-4o":   "https://cdn.simpleicons.org/openai/10a37f",
  "Claude":           "https://cdn.simpleicons.org/anthropic/d97706",
  "Gemini":           "https://cdn.simpleicons.org/googlegemini/4285f4",
  "Llama 3":          "https://cdn.simpleicons.org/meta/0668E1",
  "Mistral":          "https://cdn.simpleicons.org/mistral/f97316",
  "Mistral Large":    "https://cdn.simpleicons.org/mistral/f97316",
  "Cohere":           "https://logo.clearbit.com/cohere.com",
  "Cohere Command R+":"https://logo.clearbit.com/cohere.com",
  "Grok":             "https://cdn.simpleicons.org/x/171717",

  // ── Image Generation ──
  "Midjourney":       "https://cdn.simpleicons.org/midjourney/7c3aed",
  "DALL-E 3":         "https://cdn.simpleicons.org/openai/10a37f",
  "Stable Diffusion": "https://logo.clearbit.com/stability.ai",
  "Adobe Firefly":    "https://cdn.simpleicons.org/adobe/FF0000",
  "Flux":             "https://logo.clearbit.com/blackforestlabs.ai",

  // ── Video ──
  "Runway":           "https://logo.clearbit.com/runwayml.com",
  "Pika":             "https://logo.clearbit.com/pika.art",
  "HeyGen":           "https://logo.clearbit.com/heygen.com",
  "Synthesia":        "https://logo.clearbit.com/synthesia.io",

  // ── Voice / Audio ──
  "ElevenLabs":       "https://cdn.simpleicons.org/elevenlabs/f59e0b",
  "Play.ht":          "https://logo.clearbit.com/play.ht",
  "Suno":             "https://logo.clearbit.com/suno.ai",
  "Udio":             "https://logo.clearbit.com/udio.com",

  // ── Transcription ──
  "Whisper":          "https://cdn.simpleicons.org/openai/10a37f",
  "AssemblyAI":       "https://logo.clearbit.com/assemblyai.com",
  "Deepgram":         "https://logo.clearbit.com/deepgram.com",

  // ── Code ──
  "Cursor":           "https://logo.clearbit.com/cursor.sh",
  "GitHub Copilot":   "https://cdn.simpleicons.org/github/171717",
  "Replit Agent":     "https://cdn.simpleicons.org/replit/f26207",
  "Lovable":          "https://logo.clearbit.com/lovable.dev",

  // ── Frameworks ──
  "LangChain":        "https://cdn.simpleicons.org/langchain/2dd4bf",
  "LlamaIndex":       "https://logo.clearbit.com/llamaindex.ai",
  "Vercel AI SDK":    "https://cdn.simpleicons.org/vercel/171717",

  // ── Agents ──
  "CrewAI":           "https://logo.clearbit.com/crewai.com",
  "AutoGen":          "https://cdn.simpleicons.org/microsoft/3b82f6",

  // ── Automation ──
  "n8n":              "https://cdn.simpleicons.org/n8n/ea4b71",
  "Zapier":           "https://cdn.simpleicons.org/zapier/ff4a00",
  "Make":             "https://cdn.simpleicons.org/make/6d28d9",

  // ── Vector DBs ──
  "Pinecone":         "https://logo.clearbit.com/pinecone.io",
  "Weaviate":         "https://logo.clearbit.com/weaviate.io",
  "Chroma":           "https://logo.clearbit.com/trychroma.com",

  // ── Search / Scraping ──
  "SerpAPI":          "https://logo.clearbit.com/serpapi.com",
  "Tavily":           "https://logo.clearbit.com/tavily.com",
  "Firecrawl":        "https://logo.clearbit.com/firecrawl.dev",
  "Apify":            "https://logo.clearbit.com/apify.com",

  // ── Support AI ──
  "Intercom Fin":     "https://cdn.simpleicons.org/intercom/286efa",
  "Ada":              "https://logo.clearbit.com/ada.cx",

  // ── Marketing AI ──
  "Jasper":           "https://logo.clearbit.com/jasper.ai",
  "Copy.ai":          "https://logo.clearbit.com/copy.ai",

  // ── SEO ──
  "Surfer SEO":       "https://logo.clearbit.com/surferseo.com",

  // ── Design ──
  "Figma AI":         "https://cdn.simpleicons.org/figma/a259ff",
  "Canva AI":         "https://cdn.simpleicons.org/canva/00c4cc",

  // ── Knowledge / Productivity ──
  "Notion AI":        "https://cdn.simpleicons.org/notion/171717",
  "Mem.ai":           "https://logo.clearbit.com/mem.ai",

  // ── Platform ──
  "Hugging Face":     "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
  "Replicate":        "https://logo.clearbit.com/replicate.com",

  // ── MLOps ──
  "Weights & Biases": "https://cdn.simpleicons.org/weightsandbiases/f59e0b",

  // ── Data ──
  "Scale AI":         "https://logo.clearbit.com/scale.com",
  "Databricks":       "https://cdn.simpleicons.org/databricks/ef4444",

  // ── Media Editing ──
  "Descript":         "https://logo.clearbit.com/descript.com",
  "Opus Clip":        "https://logo.clearbit.com/opus.pro",
};

interface ToolLogoProps {
  name: string;
  size?: number;
}

export default function ToolLogo({ name, size = 40 }: ToolLogoProps) {
  const [imgError, setImgError] = useState(false);

  const tool = AI_TOOLS[name] || {
    color: "#6b7280",
    letter: "?",
    category: "",
    description: "",
    differentiator: "",
  };

  const logoUrl = TOOL_LOGOS[name];

  if (logoUrl && !imgError) {
    return (
      <div
        className="rounded-[10px] flex items-center justify-center flex-shrink-0 overflow-hidden"
        style={{
          width: size,
          height: size,
          backgroundColor: `${tool.color}10`,
          border: `1.5px solid ${tool.color}25`,
        }}
      >
        <img
          src={logoUrl}
          alt={name}
          width={size * 0.6}
          height={size * 0.6}
          style={{ width: size * 0.6, height: size * 0.6, objectFit: "contain" }}
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Letter fallback
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
