/**
 * Lightweight RSS/Atom feed parser — no external dependencies.
 * Works in Node.js (Next.js API routes / server components).
 */

export interface FeedSource {
  name: string;
  url: string;
  category?: string; // default category for items from this feed
  icon?: string; // emoji or short label
}

export interface FeedItem {
  title: string;
  link: string;
  summary: string;
  date: string; // ISO string
  source: string;
  sourceIcon: string;
  category: string;
  tags: string[];
}

// ── Default AI / tech feeds ──────────────────────────────────────────────

export const DEFAULT_FEEDS: FeedSource[] = [
  {
    name: "TechCrunch AI",
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
    category: "Industry",
    icon: "TC",
  },
  {
    name: "The Verge AI",
    url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
    category: "Industry",
    icon: "TV",
  },
  {
    name: "OpenAI Blog",
    url: "https://openai.com/blog/rss.xml",
    category: "New Launch",
    icon: "OA",
  },
  {
    name: "Anthropic News",
    url: "https://www.anthropic.com/rss.xml",
    category: "New Launch",
    icon: "AN",
  },
  {
    name: "Google AI Blog",
    url: "https://blog.google/technology/ai/rss/",
    category: "Research",
    icon: "G",
  },
  {
    name: "MIT Tech Review AI",
    url: "https://www.technologyreview.com/topic/artificial-intelligence/feed",
    category: "Research",
    icon: "MT",
  },
  {
    name: "Hacker News",
    url: "https://hnrss.org/newest?q=AI+OR+LLM+OR+GPT+OR+Claude&points=50",
    category: "Industry",
    icon: "HN",
  },
  {
    name: "Ars Technica AI",
    url: "https://feeds.arstechnica.com/arstechnica/features",
    category: "Industry",
    icon: "AT",
  },
];

// ── XML helpers ──────────────────────────────────────────────────────────

function getTagContent(xml: string, tag: string): string {
  // Handle both <tag>content</tag> and <tag><![CDATA[content]]></tag>
  const regex = new RegExp(
    `<${tag}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))</${tag}>`,
    "i"
  );
  const match = xml.match(regex);
  if (!match) return "";
  return (match[1] ?? match[2] ?? "").trim();
}

function getAllTagContents(xml: string, tag: string): string[] {
  const regex = new RegExp(
    `<${tag}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))</${tag}>`,
    "gi"
  );
  const results: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(xml)) !== null) {
    results.push((m[1] ?? m[2] ?? "").trim());
  }
  return results;
}

function getAttrValue(xml: string, tag: string, attr: string): string {
  const regex = new RegExp(`<${tag}[^>]*${attr}="([^"]*)"`, "i");
  const match = xml.match(regex);
  return match?.[1] ?? "";
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}

// ── Parse a single feed ─────────────────────────────────────────────────

function parseRSSItems(xml: string): Array<{ title: string; link: string; summary: string; date: string }> {
  const items: Array<{ title: string; link: string; summary: string; date: string }> = [];

  // Try RSS 2.0 <item> blocks
  const rssItems = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || [];
  for (const block of rssItems) {
    const title = stripHtml(getTagContent(block, "title"));
    let link = getTagContent(block, "link");
    if (!link) link = getTagContent(block, "guid");
    const summary = stripHtml(
      getTagContent(block, "description") || getTagContent(block, "content:encoded")
    );
    const date = getTagContent(block, "pubDate") || getTagContent(block, "dc:date");
    if (title) items.push({ title, link, summary: truncate(summary, 200), date });
  }

  // Try Atom <entry> blocks
  if (items.length === 0) {
    const atomEntries = xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) || [];
    for (const block of atomEntries) {
      const title = stripHtml(getTagContent(block, "title"));
      let link = getAttrValue(block, "link", "href");
      if (!link) link = getTagContent(block, "link");
      const summary = stripHtml(
        getTagContent(block, "summary") || getTagContent(block, "content")
      );
      const date = getTagContent(block, "published") || getTagContent(block, "updated");
      if (title) items.push({ title, link, summary: truncate(summary, 200), date });
    }
  }

  return items;
}

// ── Fetch + parse with timeout ──────────────────────────────────────────

async function fetchFeed(
  source: FeedSource,
  timeoutMs = 5000
): Promise<FeedItem[]> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const res = await fetch(source.url, {
      signal: controller.signal,
      headers: { "User-Agent": "AIBlueprint/1.0 (RSS reader)" },
      next: { revalidate: 900 }, // cache 15 min in Next.js
    });
    clearTimeout(timer);

    if (!res.ok) return [];
    const xml = await res.text();
    const parsed = parseRSSItems(xml);

    return parsed.map((item) => ({
      title: item.title,
      link: item.link,
      summary: item.summary,
      date: item.date ? new Date(item.date).toISOString() : new Date().toISOString(),
      source: source.name,
      sourceIcon: source.icon || source.name.slice(0, 2),
      category: source.category || "Industry",
      tags: [],
    }));
  } catch {
    // Timeout, network error, or parse failure — skip this feed silently
    return [];
  }
}

// ── Public: fetch all feeds, merge & sort ───────────────────────────────

export async function fetchAllFeeds(
  feeds: FeedSource[] = DEFAULT_FEEDS,
  limit = 30
): Promise<FeedItem[]> {
  const results = await Promise.allSettled(feeds.map((f) => fetchFeed(f)));

  const allItems: FeedItem[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") allItems.push(...r.value);
  }

  // De-duplicate by title similarity (lowercase, trimmed)
  const seen = new Set<string>();
  const unique = allItems.filter((item) => {
    const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Sort newest first
  unique.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return unique.slice(0, limit);
}
