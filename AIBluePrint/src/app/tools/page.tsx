"use client";

import { useState, useMemo } from "react";
import { Search, ExternalLink, Layers } from "lucide-react";
import { AI_TOOLS, ALL_CATEGORIES } from "@/data/ai-tools";
import ToolLogo from "@/components/ToolLogo";

const CATEGORY_EMOJIS: Record<string, string> = {
  LLM: "🧠",
  "Image Gen": "🎨",
  Video: "🎬",
  Voice: "🎙️",
  Music: "🎵",
  Transcription: "📝",
  Code: "💻",
  Framework: "⚙️",
  Agents: "🤖",
  Automation: "⚡",
  "Vector DB": "🗄️",
  "Search API": "🔍",
  Scraping: "🕷️",
  "Support AI": "💬",
  "Marketing AI": "📣",
  SEO: "📈",
  Knowledge: "📚",
  "Enterprise Search": "🏢",
  MLOps: "🚀",
  Platform: "🌐",
  Design: "✏️",
  "Data Platform": "📊",
  "Data Pipeline": "🔗",
  "Media Editor": "🎞️",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  LLM: "Large language models for text generation, reasoning, and conversation",
  "Image Gen": "AI models that generate images from text descriptions",
  Video: "Generate and edit video content with AI",
  Voice: "Text-to-speech, voice cloning, and speech synthesis",
  Music: "AI-generated music, songs, and audio compositions",
  Transcription: "Convert audio and video to text with AI",
  Code: "AI coding assistants and developer tools",
  Framework: "SDKs and frameworks for building LLM applications",
  Agents: "Multi-agent orchestration and autonomous AI systems",
  Automation: "No-code and low-code workflow automation with AI",
  "Vector DB": "Databases for storing and querying AI embeddings",
  "Search API": "AI-native search APIs for agents and RAG pipelines",
  Scraping: "Extract and clean web content for AI consumption",
  "Support AI": "AI-powered customer support and chatbot platforms",
  "Marketing AI": "AI tools for content creation and marketing automation",
  SEO: "AI-assisted SEO content optimization",
  Knowledge: "AI-powered knowledge management and Q&A tools",
  "Enterprise Search": "Search across all company knowledge and apps",
  MLOps: "Deploy, scale, and serve ML models in production",
  Platform: "Open-source model hubs and inference platforms",
  Design: "AI-enhanced design and visual creation tools",
  "Data Platform": "Unified platforms for data engineering and AI/ML",
  "Data Pipeline": "Automated connectors for data ingestion and movement",
  "Media Editor": "AI-powered audio, video, and podcast editing",
};

const allTools = Object.values(AI_TOOLS);

export default function ToolsDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    return allTools.filter((tool) => {
      const matchesCategory =
        selectedCategory === "All" || tool.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toolCountByCategory = useMemo(() => {
    const counts: Record<string, number> = { All: allTools.length };
    for (const t of allTools) {
      counts[t.category] = (counts[t.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="min-h-screen pt-[76px] pb-20">
      {/* ─── Hero ─── */}
      <section className="py-16 px-6 text-center bg-gradient-to-b from-brand-50/50 to-white border-b border-gray-100">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 text-brand-600 text-[13px] font-semibold mb-5">
          <Layers size={14} /> {allTools.length} tools across {ALL_CATEGORIES.length} categories
        </div>
        <h1 className="text-[clamp(28px,4vw,48px)] font-extrabold text-gray-900 mb-4 tracking-tight">
          AI Tools Directory
        </h1>
        <p className="text-base text-gray-500 max-w-[520px] mx-auto leading-relaxed">
          Every AI tool in our pipeline recommender — categorized, described, and
          linked so you can explore the ecosystem.
        </p>

        {/* Search */}
        <div className="relative max-w-[440px] mx-auto mt-8">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search tools, categories, or descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 shadow-sm transition"
          />
        </div>
      </section>

      <div className="max-w-[1120px] mx-auto px-6">
        {/* ─── Category Pills ─── */}
        <div className="flex gap-2 flex-wrap py-7 border-b border-gray-100">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-colors ${
              selectedCategory === "All"
                ? "bg-brand-500 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
            <span className="ml-1.5 opacity-70">
              {toolCountByCategory["All"]}
            </span>
          </button>
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-colors ${
                selectedCategory === cat
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {CATEGORY_EMOJIS[cat] ?? ""} {cat}
              <span className="ml-1.5 opacity-70">
                {toolCountByCategory[cat] ?? 0}
              </span>
            </button>
          ))}
        </div>

        {/* ─── Category heading (when filtered) ─── */}
        {selectedCategory !== "All" && (
          <div className="py-6">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {CATEGORY_EMOJIS[selectedCategory]} {selectedCategory}
            </h2>
            <p className="text-sm text-gray-500">
              {CATEGORY_DESCRIPTIONS[selectedCategory] ?? ""}
            </p>
          </div>
        )}

        {/* ─── Results count ─── */}
        <p className="text-[13px] text-gray-400 pt-6 pb-3">
          {filteredTools.length === 0
            ? "No tools match your search."
            : `Showing ${filteredTools.length} tool${filteredTools.length !== 1 ? "s" : ""}${
                selectedCategory !== "All" ? ` in ${selectedCategory}` : ""
              }${searchQuery ? ` for "${searchQuery}"` : ""}`}
        </p>

        {/* ─── Tool Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
          {filteredTools.map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-gray-200 rounded-2xl p-5 hover:border-brand-300 hover:shadow-md transition-all flex flex-col gap-3"
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <ToolLogo name={tool.name} size={40} />
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">
                      {tool.name}
                    </p>
                    <span
                      className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide mt-0.5"
                      style={{
                        backgroundColor: `${tool.color}14`,
                        color: tool.color,
                        border: `1px solid ${tool.color}25`,
                      }}
                    >
                      {tool.category}
                    </span>
                  </div>
                </div>
                <ExternalLink
                  size={14}
                  className="text-gray-300 group-hover:text-brand-400 transition-colors flex-shrink-0 mt-1"
                />
              </div>

              {/* Description */}
              <p className="text-[13px] text-gray-500 leading-relaxed flex-1">
                {tool.description}
              </p>

              {/* Differentiator */}
              <div
                className="rounded-lg px-3 py-2 text-[12px] font-medium leading-snug"
                style={{
                  backgroundColor: `${tool.color}0d`,
                  color: tool.color,
                  border: `1px solid ${tool.color}20`,
                }}
              >
                ⚡ {tool.differentiator}
              </div>
            </a>
          ))}
        </div>

        {/* ─── Empty state ─── */}
        {filteredTools.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Search size={36} className="mx-auto mb-4 opacity-30" />
            <p className="text-sm">No tools found for that search.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-3 text-brand-500 text-sm font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* ─── Bottom CTA ─── */}
      <section className="py-14 px-6 text-center bg-gray-50 border-t border-gray-100 mt-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Not sure which tools to use?
        </h2>
        <p className="text-sm text-gray-500 mb-6 max-w-[400px] mx-auto">
          Describe your idea and AI Blueprint will assemble the perfect tool
          stack for you instantly.
        </p>
        <a
          href="/builder"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-brand-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
        >
          Try the Builder →
        </a>
      </section>
    </div>
  );
}
