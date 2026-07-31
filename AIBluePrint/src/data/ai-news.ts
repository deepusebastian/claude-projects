export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  sourceUrl: string;
  date: string; // ISO date
  toolName?: string;
  toolLetter?: string;
  toolColor?: string;
  tags: string[];
  featured?: boolean;
}

export const NEWS_CATEGORIES = [
  "All",
  "New Launch",
  "Update",
  "Funding",
  "Open Source",
  "Model Release",
  "Research",
  "Industry",
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export const AI_NEWS: NewsItem[] = [
  // ── July 2026 ────────────────────────────────────────────────────────────
  {
    id: "1",
    title: "Anthropic launches Claude Opus 5 — within 0.5% of Fable 5 at half the cost",
    summary:
      "Claude Opus 5 arrives as Anthropic's new go-to for complex agentic coding and enterprise work, matching Fable 5's benchmark performance on CursorBench 3.2 at $5/$25 per million tokens.",
    category: "Model Release",
    source: "Anthropic",
    sourceUrl: "https://anthropic.com",
    date: "2026-07-22",
    toolName: "Claude Opus 5",
    toolLetter: "C",
    toolColor: "#d97706",
    tags: ["LLM", "Agents", "Coding"],
    featured: true,
  },
  {
    id: "2",
    title: "OpenAI launches GPT-5.6 Sol — 750 tokens/sec on Cerebras at $5/$30 per MTok",
    summary:
      "Sol is the first frontier model to clear a customer-by-customer US government review before public release, targeting advanced reasoning, coding, and science workflows.",
    category: "Model Release",
    source: "OpenAI Blog",
    sourceUrl: "https://openai.com/blog",
    date: "2026-07-15",
    toolName: "GPT-5.6",
    toolLetter: "G",
    toolColor: "#10a37f",
    tags: ["LLM", "Reasoning", "Government AI"],
    featured: true,
  },
  {
    id: "3",
    title: "Anthropic & AMD strike $5B compute deal for 2 gigawatts of MI450 capacity",
    summary:
      "The capacity agreement gives Anthropic access to AMD's MI450/Helios-generation GPUs and includes up to $5 billion in AMD equity — one of the largest AI infrastructure partnerships of 2026.",
    category: "Funding",
    source: "TechCrunch",
    sourceUrl: "https://techcrunch.com",
    date: "2026-07-10",
    toolName: "Anthropic",
    toolLetter: "A",
    toolColor: "#d97706",
    tags: ["Infrastructure", "GPU", "Investment"],
  },
  {
    id: "4",
    title: "Claude Fable 5 returns to full global availability after export-control pause",
    summary:
      "Fable 5 — Anthropic's most capable model with 1M context and 128k output — is globally available again after a brief suspension when US export controls were applied.",
    category: "Update",
    source: "Anthropic",
    sourceUrl: "https://anthropic.com",
    date: "2026-07-01",
    toolName: "Claude Fable 5",
    toolLetter: "C",
    toolColor: "#d97706",
    tags: ["LLM", "Agents", "Policy"],
  },
  {
    id: "5",
    title: "Google delays Gemini 3.5 Pro after internal testing reveals coding gaps",
    summary:
      "Google has pushed back the broader release of Gemini 3.5 Pro by several months after internal benchmarks showed the model falling short in coding performance and complex reasoning.",
    category: "Industry",
    source: "The Verge",
    sourceUrl: "https://theverge.com",
    date: "2026-07-08",
    toolName: "Gemini",
    toolLetter: "G",
    toolColor: "#4285f4",
    tags: ["LLM", "Google", "Research"],
  },
  // ── June 2026 ────────────────────────────────────────────────────────────
  {
    id: "6",
    title: "Anthropic launches Claude Fable 5 — $10/$50 per MTok, 1M context, 128k output",
    summary:
      "Fable 5 is Anthropic's most capable generally available model — built for difficult reasoning, long-horizon agentic work, coding, and large-context analysis. Claude Mythos 5 (limited access) ships alongside it.",
    category: "Model Release",
    source: "Anthropic",
    sourceUrl: "https://anthropic.com",
    date: "2026-06-09",
    toolName: "Claude Fable 5",
    toolLetter: "C",
    toolColor: "#d97706",
    tags: ["LLM", "Agents", "Frontier"],
  },
  {
    id: "7",
    title: "Meta launches Muse Spark 1.1 with first paid developer API",
    summary:
      "Meta's creative AI platform gets a commercial API, giving developers access to Muse Spark's image, video, and music generation capabilities at pay-per-use pricing.",
    category: "New Launch",
    source: "TechCrunch",
    sourceUrl: "https://techcrunch.com",
    date: "2026-06-20",
    toolName: "Muse Spark",
    toolLetter: "M",
    toolColor: "#0668E1",
    tags: ["Image Generation", "Video AI", "API"],
  },
  // ── May 2026 ─────────────────────────────────────────────────────────────
  {
    id: "8",
    title: "Anthropic launches Claude Sonnet 5 at introductory $2/$10 per MTok",
    summary:
      "Sonnet 5 brings 1M context, adaptive thinking, and 128k output to Anthropic's mid-tier — at introductory pricing through August 31, 2026, after which rates step up to $3/$15.",
    category: "Model Release",
    source: "Anthropic",
    sourceUrl: "https://anthropic.com",
    date: "2026-05-20",
    toolName: "Claude Sonnet 5",
    toolLetter: "C",
    toolColor: "#d97706",
    tags: ["LLM", "Coding", "Reasoning"],
  },
  {
    id: "9",
    title: "ElevenLabs launches real-time voice cloning API with sub-200ms latency",
    summary:
      "Developers can now clone any voice with 30 seconds of audio and stream synthesized speech with under 200ms latency — enabling fully real-time conversational AI products.",
    category: "New Launch",
    source: "ElevenLabs",
    sourceUrl: "https://elevenlabs.io",
    date: "2026-05-04",
    toolName: "ElevenLabs",
    toolLetter: "E",
    toolColor: "#000000",
    tags: ["Voice AI", "TTS", "API"],
  },
  {
    id: "10",
    title: "Runway ships Gen-4 video — 60-second clips with scene consistency",
    summary:
      "Gen-4 maintains character and scene coherence across long clips with support for custom style references — a major step toward production-grade AI video.",
    category: "Model Release",
    source: "Runway",
    sourceUrl: "https://runwayml.com",
    date: "2026-05-02",
    toolName: "Runway",
    toolLetter: "R",
    toolColor: "#0000ff",
    tags: ["Video AI", "Creative", "Generation"],
  },
  {
    id: "11",
    title: "Perplexity launches Spaces — collaborative AI research rooms",
    summary:
      "Teams can now research topics together in shared AI-powered spaces with memory across sessions, source citation, and conflict detection between sources.",
    category: "New Launch",
    source: "Perplexity",
    sourceUrl: "https://perplexity.ai",
    date: "2026-05-03",
    toolName: "Perplexity",
    toolLetter: "P",
    toolColor: "#20808d",
    tags: ["Search", "Research", "Collaboration"],
  },
  // ── April 2026 ───────────────────────────────────────────────────────────
  {
    id: "12",
    title: "Vercel introduces v0 2.0 — AI that deploys full-stack apps end-to-end",
    summary:
      "v0 can now generate, preview, and deploy complete Next.js applications with databases, auth, and payments from a single text prompt.",
    category: "New Launch",
    source: "Vercel",
    sourceUrl: "https://vercel.com",
    date: "2026-04-30",
    toolName: "v0",
    toolLetter: "v0",
    toolColor: "#000000",
    tags: ["Code", "Deployment", "Full Stack"],
  },
  {
    id: "13",
    title: "LangChain introduces LangGraph Cloud for production-grade AI agents",
    summary:
      "Deploy stateful, multi-step AI agents with built-in persistence, human-in-the-loop controls, and real-time streaming — fully managed infrastructure.",
    category: "New Launch",
    source: "LangChain",
    sourceUrl: "https://langchain.com",
    date: "2026-04-26",
    toolName: "LangGraph",
    toolLetter: "L",
    toolColor: "#1c3d5a",
    tags: ["Agents", "Framework", "Infrastructure"],
  },
  {
    id: "14",
    title: "Figma AI generates and iterates on full UI designs from natural language",
    summary:
      "Describe a page layout in plain English and Figma builds it with real components, auto-layout, and responsive variants — all editable in the standard Figma canvas.",
    category: "Update",
    source: "Figma",
    sourceUrl: "https://figma.com",
    date: "2026-04-25",
    toolName: "Figma AI",
    toolLetter: "F",
    toolColor: "#a259ff",
    tags: ["Design", "UI/UX", "Creative"],
  },
  {
    id: "15",
    title: "Stability AI releases Stable Diffusion 4 under Apache 2.0",
    summary:
      "SD4 brings quality on par with proprietary image models to the open-source ecosystem, with built-in safety filters and unrestricted commercial licensing.",
    category: "Model Release",
    source: "Stability AI",
    sourceUrl: "https://stability.ai",
    date: "2026-05-01",
    toolName: "Stable Diffusion",
    toolLetter: "SD",
    toolColor: "#a855f7",
    tags: ["Image Generation", "Open Source", "Creative"],
  },
  {
    id: "16",
    title: "Notion AI gets agentic workflows — automate your entire workspace",
    summary:
      "Notion's AI can now chain actions autonomously: summarize meeting notes, create tasks, assign owners, and send Slack updates — triggered from a single command.",
    category: "Update",
    source: "Notion",
    sourceUrl: "https://notion.so",
    date: "2026-05-02",
    toolName: "Notion AI",
    toolLetter: "N",
    toolColor: "#000000",
    tags: ["Productivity", "Automation", "Workspace"],
  },
];

// Helper: get relative time label
export function getRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
