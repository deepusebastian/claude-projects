"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Star, RefreshCw } from "lucide-react";
import {
  AI_NEWS,
  NEWS_CATEGORIES,
  getRelativeTime,
  type NewsCategory,
} from "@/data/ai-news";
import type { FeedItem } from "@/lib/rss";

// Map feed items to the same shape as static news
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

const CATEGORY_COLORS: Record<string, string> = {
  "New Launch": "bg-green-50 text-green-600 border-green-100",
  Update: "bg-blue-50 text-blue-600 border-blue-100",
  Funding: "bg-amber-50 text-amber-600 border-amber-100",
  "Open Source": "bg-purple-50 text-purple-600 border-purple-100",
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

export default function NewsFeed() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>("All");
  const [liveItems, setLiveItems] = useState<DisplayItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Use live RSS data if available, otherwise fall back to static
  const allItems: DisplayItem[] = liveItems ?? AI_NEWS;

  const filtered =
    activeCategory === "All"
      ? allItems
      : allItems.filter((n) => n.category === activeCategory);

  // For live feeds, feature the first 2 items
  const displayItems = liveItems
    ? filtered
    : (() => {
        const feat = filtered.filter((n) => n.featured);
        const reg = filtered.filter((n) => !n.featured);
        return [...feat, ...reg];
      })();

  const featured = liveItems
    ? displayItems.slice(0, 2)
    : displayItems.filter((n) => n.featured);
  const regular = liveItems
    ? displayItems.slice(2)
    : displayItems.filter((n) => !n.featured);

  // Category counts based on all items
  const getCatCount = (cat: string) =>
    cat === "All"
      ? allItems.length
      : allItems.filter((n) => n.category === cat).length;

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Latest AI News</h2>
        <div className="flex items-center gap-3">
          {lastFetched && (
            <span className="text-xs text-gray-300">
              Live from RSS
            </span>
          )}
          {!loading && (
            <button
              onClick={fetchNews}
              className="p-1.5 text-gray-300 hover:text-gray-500 rounded-md hover:bg-gray-50 transition-colors"
              title="Refresh feeds"
            >
              <RefreshCw size={14} />
            </button>
          )}
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
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100"
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

      {/* Loading skeleton */}
      {loading && !liveItems && (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-start gap-3.5 py-4">
              <div className="w-9 h-9 rounded-lg bg-gray-100 animate-pulse flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-gray-50 rounded animate-pulse w-full" />
                <div className="h-3 bg-gray-50 rounded animate-pulse w-1/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Featured cards */}
      {!loading && featured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {featured.map((item) => (
            <a
              key={item.id}
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all"
            >
              {/* Image */}
              {item.image && (
                <div className="w-full h-40 bg-gray-100 overflow-hidden">
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
              )}
              <div className="p-5">
                <div className="flex items-start gap-3.5 mb-3">
                  {item.toolLetter && (
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ backgroundColor: item.toolColor || "#6c3cef" }}
                    >
                      {item.toolLetter}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Star
                        size={13}
                        className="text-amber-400 flex-shrink-0"
                      />
                      <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-wide">
                        Featured
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 leading-snug group-hover:text-brand-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
                {item.summary && (
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">
                    {item.summary}
                  </p>
                )}
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span
                    className={`px-2 py-0.5 rounded-md border text-[11px] font-medium ${CATEGORY_COLORS[item.category] || ""}`}
                  >
                    {item.category}
                  </span>
                  <span>{item.source}</span>
                  <span>{getRelativeTime(item.date)}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Regular news list */}
      {!loading && (
        <div className="space-y-1">
          {regular.map((item) => (
            <a
              key={item.id}
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3.5 py-4 px-3 -mx-3 rounded-lg hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
            >
              {/* Thumbnail or source icon */}
              {item.image ? (
                <div className="w-20 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 mt-0.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      // Replace broken image with source icon fallback
                      el.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white text-xs font-bold" style="background:${item.toolColor || "#6c3cef"}">${item.toolLetter || ""}</div>`;
                    }}
                  />
                </div>
              ) : item.toolLetter ? (
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: item.toolColor || "#6c3cef" }}
                >
                  {item.toolLetter}
                </div>
              ) : null}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-semibold text-gray-900 leading-snug mb-1 group-hover:text-brand-600 transition-colors">
                  {item.title}
                </h3>
                {item.summary && (
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-2">
                    {item.summary}
                  </p>
                )}
                <div className="flex items-center gap-2.5 text-xs text-gray-400">
                  <span
                    className={`px-2 py-0.5 rounded-md border text-[11px] font-medium ${CATEGORY_COLORS[item.category] || ""}`}
                  >
                    {item.category}
                  </span>
                  <span>{item.source}</span>
                  <span>{getRelativeTime(item.date)}</span>
                </div>
              </div>

              {/* External link icon */}
              <ExternalLink
                size={14}
                className="text-gray-300 group-hover:text-gray-400 mt-1 flex-shrink-0 transition-colors"
              />
            </a>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400 text-sm">
          No news in this category yet.
        </div>
      )}
    </div>
  );
}
