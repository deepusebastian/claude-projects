"use client";

import { useState, useEffect } from "react";
import { Clock, RefreshCw } from "lucide-react";
import {
  AI_NEWS,
  NEWS_CATEGORIES,
  getRelativeTime,
  type NewsCategory,
} from "@/data/ai-news";
import type { FeedItem } from "@/lib/rss";

// ── Types ───────────────────────────────────────────────────────────────

interface DisplayItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  sourceUrl: string;
  date: string;
  toolLetter?: string;
  toolColor?: string;
  tags: string[];
  featured?: boolean;
  image?: string;
}

// ── Constants ───────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  "New Launch": "bg-green-50 text-green-600 border-green-100",
  Update: "bg-blue-50 text-blue-600 border-blue-100",
  Funding: "bg-amber-50 text-amber-600 border-amber-100",
  "Open Source": "bg-purple-50 text-purple-600 border-purple-100",
  "Model Release": "bg-rose-50 text-rose-600 border-rose-100",
  Research: "bg-cyan-50 text-cyan-600 border-cyan-100",
  Industry: "bg-gray-50 text-gray-600 border-gray-100",
};

const SOURCE_COLORS: Record<string, string> = {
  TC: "#0a8528",
  TV: "#712bef",
  OA: "#10a37f",
  AN: "#d97706",
  G: "#4285f4",
  MT: "#e00023",
  HN: "#ff6600",
  AT: "#ff4e00",
};

// ── Helpers ─────────────────────────────────────────────────────────────

function feedItemToDisplay(item: FeedItem, index: number): DisplayItem {
  return {
    id: `rss-${index}`,
    title: item.title,
    summary: item.summary,
    category: item.category,
    source: item.source,
    sourceUrl: item.link,
    date: item.date,
    toolLetter: item.sourceIcon,
    toolColor: SOURCE_COLORS[item.sourceIcon] || "#6c3cef",
    tags: item.tags,
    featured: false,
    image: item.image,
  };
}

function getReadingTime(summary: string): string {
  const words = summary.split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

function getFaviconUrl(sourceUrl: string): string {
  try {
    const domain = new URL(sourceUrl).hostname;
    return `https://www.google.com/s2/favicons?sz=32&domain=${domain}`;
  } catch {
    return "";
  }
}

// ── Subcomponents ───────────────────────────────────────────────────────

function SourceBadge({ source, sourceUrl, toolLetter, toolColor }: {
  source: string;
  sourceUrl: string;
  toolLetter?: string;
  toolColor?: string;
}) {
  const favicon = getFaviconUrl(sourceUrl);
  return (
    <div className="flex items-center gap-1.5">
      {favicon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={favicon}
          alt=""
          className="w-4 h-4 rounded-sm"
          onError={(e) => {
            const el = e.target as HTMLImageElement;
            el.style.display = "none";
          }}
        />
      ) : toolLetter ? (
        <div
          className="w-4 h-4 rounded-sm flex items-center justify-center text-white text-[8px] font-bold"
          style={{ backgroundColor: toolColor || "#6c3cef" }}
        >
          {toolLetter}
        </div>
      ) : null}
      <span className="text-xs font-medium text-gray-500">{source}</span>
    </div>
  );
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span
      className={`px-2 py-0.5 rounded-md border text-[11px] font-semibold ${CATEGORY_COLORS[category] || "bg-gray-50 text-gray-500 border-gray-100"}`}
    >
      {category}
    </span>
  );
}

// Deterministic gradient palettes for items without images
const GRADIENT_PALETTES = [
  { from: "#1e1b4b", to: "#312e81", accent: "#818cf8" }, // indigo
  { from: "#0c4a6e", to: "#075985", accent: "#38bdf8" }, // sky
  { from: "#134e4a", to: "#115e59", accent: "#2dd4bf" }, // teal
  { from: "#3b0764", to: "#581c87", accent: "#c084fc" }, // purple
  { from: "#1e3a5f", to: "#1e40af", accent: "#60a5fa" }, // blue
  { from: "#4a1d1d", to: "#7f1d1d", accent: "#f87171" }, // red
  { from: "#365314", to: "#3f6212", accent: "#a3e635" }, // lime
  { from: "#431407", to: "#7c2d12", accent: "#fb923c" }, // orange
];

function getGradient(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return GRADIENT_PALETTES[Math.abs(hash) % GRADIENT_PALETTES.length];
}

function ImageWithFallback({ src, toolLetter, toolColor, className, overlayGradient, itemId }: {
  src?: string;
  toolLetter?: string;
  toolColor?: string;
  className?: string;
  overlayGradient?: boolean;
  itemId?: string;
}) {
  if (!src) {
    const grad = getGradient(itemId || toolLetter || "default");
    return (
      <div
        className={`relative overflow-hidden flex items-center justify-center ${className}`}
        style={{ background: `linear-gradient(135deg, ${grad.from} 0%, ${grad.to} 100%)` }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10"
          style={{ backgroundColor: grad.accent }}
        />
        <div
          className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10"
          style={{ backgroundColor: grad.accent }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full opacity-5"
          style={{ backgroundColor: grad.accent }}
        />
        {/* Source icon */}
        <div
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg"
          style={{ backgroundColor: toolColor || grad.accent, boxShadow: `0 8px 32px ${grad.from}80` }}
        >
          {toolLetter || "?"}
        </div>
        {overlayGradient && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        )}
      </div>
    );
  }

  return (
    <div className={`bg-gray-100 overflow-hidden relative ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        onError={(e) => {
          const el = e.target as HTMLImageElement;
          el.style.display = "none";
        }}
      />
      {overlayGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      )}
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────

export default function NewsFeed() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>("All");
  const [liveItems, setLiveItems] = useState<DisplayItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastFetched, setLastFetched] = useState<string | null>(null);

  const fetchNews = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    try {
      const res = await fetch("/api/news");
      if (res.ok) {
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          setLiveItems(data.items.map(feedItemToDisplay));
          setLastFetched(data.fetchedAt);
        }
      }
    } catch {
      // Fall through to static data
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Data
  const allItems: DisplayItem[] = liveItems ?? AI_NEWS;
  const filtered =
    activeCategory === "All"
      ? allItems
      : allItems.filter((n) => n.category === activeCategory);

  // Split: hero (1), secondary featured (2), rest as grid cards
  const hero = filtered[0] || null;
  const secondaryFeatured = filtered.slice(1, 3);
  const gridItems = filtered.slice(3);

  const getCatCount = (cat: string) =>
    cat === "All"
      ? allItems.length
      : allItems.filter((n) => n.category === cat).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-900">Latest AI News</h2>
        <div className="flex items-center gap-3">
          {lastFetched && (
            <span className="text-[11px] text-gray-300">Live from RSS</span>
          )}
          <button
            onClick={() => fetchNews(true)}
            className={`p-1.5 text-gray-300 hover:text-gray-500 rounded-md hover:bg-gray-50 transition-colors ${refreshing ? "animate-spin" : ""}`}
            disabled={refreshing}
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 flex-wrap mb-8">
        {NEWS_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const count = getCatCount(cat);
          if (count === 0 && cat !== "All") return null;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-gray-900 text-white shadow-sm ring-1 ring-black/10"
                  : "bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {cat}
              <span
                className={`ml-1.5 text-xs ${isActive ? "text-gray-400" : "text-gray-300"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ─── Hero card ─── */}
      {hero && (
        <a
          href={hero.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-2xl overflow-hidden mb-6 relative bg-gray-900 shadow-md hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 ring-1 ring-black/10"
        >
          <ImageWithFallback
            src={hero.image}
            toolLetter={hero.toolLetter}
            toolColor={hero.toolColor}
            itemId={hero.id}
            className="w-full h-56 md:h-72"
            overlayGradient
          />
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-7">
            <div className="flex items-center gap-2.5 mb-3">
              <CategoryBadge category={hero.category} />
              <SourceBadge
                source={hero.source}
                sourceUrl={hero.sourceUrl}
                toolLetter={hero.toolLetter}
                toolColor={hero.toolColor}
              />
              <span className="text-xs text-white/70">
                {getRelativeTime(hero.date)}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-white leading-snug mb-2.5 group-hover:text-brand-200 transition-colors drop-shadow-sm">
              {hero.title}
            </h3>
            {hero.summary && (
              <p className="text-sm text-white/75 leading-relaxed line-clamp-2 max-w-lg">
                {hero.summary}
              </p>
            )}
            <div className="flex items-center gap-1.5 mt-3.5 text-white/60 text-xs">
              <Clock size={11} />
              <span>{getReadingTime(hero.summary)}</span>
            </div>
          </div>
        </a>
      )}

      {/* ─── Secondary featured (2 cards side by side) ─── */}
      {secondaryFeatured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {secondaryFeatured.map((item) => (
            <a
              key={item.id}
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-brand-100 transition-all duration-200"
            >
              <ImageWithFallback
                src={item.image}
                toolLetter={item.toolLetter}
                toolColor={item.toolColor}
                itemId={item.id}
                className="w-full h-40"
              />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <CategoryBadge category={item.category} />
                  <span className="text-xs text-gray-400">
                    {getRelativeTime(item.date)}
                  </span>
                </div>
                <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-2 group-hover:text-brand-500 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                {item.summary && (
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-3">
                    {item.summary}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <SourceBadge
                    source={item.source}
                    sourceUrl={item.sourceUrl}
                    toolLetter={item.toolLetter}
                    toolColor={item.toolColor}
                  />
                  <div className="flex items-center gap-1 text-gray-300 text-xs">
                    <Clock size={10} />
                    <span>{getReadingTime(item.summary)}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* ─── Grid of remaining items ─── */}
      {gridItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gridItems.map((item) => (
            <a
              key={item.id}
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md hover:-translate-y-0.5 hover:border-brand-100 transition-all duration-200"
            >
              {/* Thumbnail */}
              {(() => {
                const grad = getGradient(item.id);
                return item.image ? (
                  <div className="w-24 h-20 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className="w-24 h-20 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${grad.from} 0%, ${grad.to} 100%)` }}
                  >
                    <div
                      className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-10"
                      style={{ backgroundColor: grad.accent }}
                    />
                    <div
                      className="relative w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: item.toolColor || grad.accent }}
                    >
                      {item.toolLetter || "?"}
                    </div>
                  </div>
                );
              })()}

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <CategoryBadge category={item.category} />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-brand-500 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <SourceBadge
                    source={item.source}
                    sourceUrl={item.sourceUrl}
                    toolLetter={item.toolLetter}
                    toolColor={item.toolColor}
                  />
                  <span className="text-[11px] text-gray-300">
                    {getRelativeTime(item.date)}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400 text-sm">
          No news in this category yet.
        </div>
      )}
    </div>
  );
}
