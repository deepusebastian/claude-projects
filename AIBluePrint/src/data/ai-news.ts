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
  {
    id: "1",
    title: "OpenAI launches GPT-5 with real-time reasoning",
    summary:
      "The latest model introduces persistent memory and multi-step planning, enabling agents that can execute complex workflows autonomously.",
    category: "Model Release",
    source: "OpenAI Blog",
    sourceUrl: "https://openai.com/blog",
    date: "2026-05-06",
    toolName: "GPT-5",
    toolLetter: "G",
    toolColor: "#10a37f",
    tags: ["LLM", "Agents", "Reasoning"],
    featured: true,
  },
  {
    id: "2",
    title: "Anthropic ships Claude with computer use for everyone",
    summary:
      "Claude can now control your desktop — browse, click, type, and complete tasks across any application with a single prompt.",
    category: "Update",
    source: "Anthropic",
    sourceUrl: "https://anthropic.com",
    date: "2026-05-05",
    toolName: "Claude",
    toolLetter: "C",
    toolColor: "#d97706",
    tags: ["LLM", "Desktop AI", "Automation"],
    featured: true,
  },
  {
    id: "3",
    title: "Cursor raises $900M to build the AI-native IDE",
    summary:
      "The AI code editor hits 5M developers and lands a massive Series C to expand into full-stack development agents.",
    category: "Funding",
    source: "TechCrunch",
    sourceUrl: "https://techcrunch.com",
    date: "2026-05-05",
    toolName: "Cursor",
    toolLetter: "Cu",
    toolColor: "#6366f1",
    tags: ["Code", "IDE", "Developer Tools"],
  },
  {
    id: "4",
    title: "Midjourney V7 brings photorealism to a new level",
    summary:
      "The new model generates images indistinguishable from professional photography, with precise text rendering and consistent characters.",
    category: "Model Release",
    source: "Midjourney",
    sourceUrl: "https://midjourney.com",
    date: "2026-05-04",
    toolName: "Midjourney",
    toolLetter: "M",
    toolColor: "#0d1117",
    tags: ["Image Generation", "Creative", "Design"],
  },
  {
    id: "5",
    title: "ElevenLabs launches real-time voice cloning API",
    summary:
      "Developers can now clone any voice with just 30 seconds of audio and stream synthesized speech with under 200ms latency.",
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
    id: "6",
    title: "Hugging Face open-sources SmolLM 3 — a 3B model rivaling GPT-3.5",
    summary:
      "The compact model runs on a single GPU and scores competitively on benchmarks, making powerful AI accessible to indie developers.",
    category: "Model Release",
    source: "Hugging Face",
    sourceUrl: "https://huggingface.co",
    date: "2026-05-03",
    toolName: "SmolLM 3",
    toolLetter: "S",
    toolColor: "#ff9d00",
    tags: ["Open Source", "LLM", "Edge AI"],
  },
  {
    id: "7",
    title: "Perplexity launches Spaces — collaborative AI research rooms",
    summary:
      "Teams can now research topics together in shared spaces, with AI that remembers context across sessions and surfaces conflicting sources.",
    category: "New Launch",
    source: "Perplexity",
    sourceUrl: "https://perplexity.ai",
    date: "2026-05-03",
    toolName: "Perplexity",
    toolLetter: "P",
    toolColor: "#20808d",
    tags: ["Search", "Research", "Collaboration"],
  },
  {
    id: "8",
    title: "Runway ships Gen-4 video — 60-second clips with scene consistency",
    summary:
      "The new video model maintains character and scene coherence across long clips, with support for custom style references.",
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
    id: "9",
    title: "Notion AI gets agentic workflows — automate your workspace",
    summary:
      "Notion's AI can now chain actions: summarize meeting notes, create tasks, assign owners, and send Slack updates — all from a single trigger.",
    category: "Update",
    source: "Notion",
    sourceUrl: "https://notion.so",
    date: "2026-05-02",
    toolName: "Notion AI",
    toolLetter: "N",
    toolColor: "#000000",
    tags: ["Productivity", "Automation", "Workspace"],
  },
  {
    id: "10",
    title: "Stability AI releases Stable Diffusion 4 under Apache 2.0",
    summary:
      "The open-source image model brings quality on par with proprietary alternatives, with built-in safety filters and commercial licensing.",
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
    id: "11",
    title: "Vercel introduces v0 2.0 — AI that deploys full-stack apps",
    summary:
      "v0 can now generate, preview, and deploy complete Next.js applications with databases, auth, and payments from a text prompt.",
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
    id: "12",
    title: "Google DeepMind unveils Gemini Ultra 2 with 2M token context",
    summary:
      "The largest context window yet enables processing entire codebases, book series, and hours of video in a single prompt.",
    category: "Model Release",
    source: "Google DeepMind",
    sourceUrl: "https://deepmind.google",
    date: "2026-04-29",
    toolName: "Gemini Ultra",
    toolLetter: "G",
    toolColor: "#4285f4",
    tags: ["LLM", "Research", "Context Window"],
  },
  {
    id: "13",
    title: "Replicate makes serverless GPU inference free for small models",
    summary:
      "Models under 1B parameters now run free on Replicate, lowering the barrier for indie hackers and researchers to deploy AI.",
    category: "Industry",
    source: "Replicate",
    sourceUrl: "https://replicate.com",
    date: "2026-04-28",
    toolName: "Replicate",
    toolLetter: "R",
    toolColor: "#3b82f6",
    tags: ["Infrastructure", "GPU", "Deployment"],
  },
  {
    id: "14",
    title: "Stripe launches AI-powered fraud detection for all merchants",
    summary:
      "The new Radar AI uses transaction patterns and device signals to block fraud in real-time, reducing chargebacks by up to 40%.",
    category: "New Launch",
    source: "Stripe",
    sourceUrl: "https://stripe.com",
    date: "2026-04-27",
    toolName: "Stripe Radar",
    toolLetter: "S",
    toolColor: "#635bff",
    tags: ["Payments", "Fraud Detection", "Fintech"],
  },
  {
    id: "15",
    title: "LangChain introduces LangGraph Cloud for production AI agents",
    summary:
      "Deploy stateful, multi-step AI agents with built-in persistence, human-in-the-loop, and real-time streaming — fully managed.",
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
    id: "16",
    title: "Figma AI can now generate and iterate on full UI designs",
    summary:
      "Describe a page layout in natural language and Figma builds it with real components, auto-layout, and responsive variants.",
    category: "Update",
    source: "Figma",
    sourceUrl: "https://figma.com",
    date: "2026-04-25",
    toolName: "Figma AI",
    toolLetter: "F",
    toolColor: "#a259ff",
    tags: ["Design", "UI/UX", "Creative"],
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
