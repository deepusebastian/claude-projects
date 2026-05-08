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
  image?: string; // thumbnail URL
}

// ── Default AI / tech feeds ──────────────────────────────────────────────

export const DEFAULT_FEEDS: FeedSource[] = [
  {
    name: "Hacker News AI",
    url: "https://hnrss.org/newest?q=AI+OR+LLM+OR+GPT+OR+Claude&points=50",
    category: "Industry",
    icon: "HN",
  },
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
    name: "Ars Technica",
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
    // Decode all numeric HTML entities (&#8216; &#8217; &#8220; etc.)
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&hellip;/g, "…")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rsquo;/g, "’")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}

// ── Image extraction ────────────────────────────────────────────────────

function extractImage(block: string): string | undefined {
  // 1. <media:content url="..."> or <media:thumbnail url="...">
  let match = block.match(/<media:(?:content|thumbnail)[^>]+url="([^"]+)"/i);
  if (match?.[1]) return match[1];

  // 2. <enclosure url="..." type="image/...">
  match = block.match(/<enclosure[^>]+url="([^"]+)"[^>]+type="image\/[^"]*"/i);
  if (!match) match = block.match(/<enclosure[^>]+type="image\/[^"]*"[^>]+url="([^"]+)"/i);
  if (match?.[1]) return match[1];

  // 3. <image><url>...</url></image> (less common per-item)
  const imgUrl = getTagContent(block, "image");
  if (imgUrl && imgUrl.startsWith("http")) return imgUrl;

  // 4. First <img src="..."> inside description or content:encoded
  const content = getTagContent(block, "description") || getTagContent(block, "content:encoded") || getTagContent(block, "content");
  if (content) {
    match = content.match(/<img[^>]+src="([^"]+)"/i);
    if (match?.[1]) return match[1];
  }

  // 5. og:image style — some feeds include it
  match = block.match(/og:image[^>]*content="([^"]+)"/i);
  if (match?.[1]) return match[1];

  return undefined;
}

// ── Parse a single feed ─────────────────────────────────────────────────

interface ParsedItem {
  title: string;
  link: string;
  summary: string;
  date: string;
  image?: string;
}

function parseRSSItems(xml: string): ParsedItem[] {
  const items: ParsedItem[] = [];

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
    const image = extractImage(block);
    if (title) items.push({ title, link, summary: truncate(summary, 200), date, image });
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
      const image = extractImage(block);
      if (title) items.push({ title, link, summary: truncate(summary, 200), date, image });
    }
  }

  return items;
}

// ── Fetch + parse with timeout ──────────────────────────────────────────

async function fetchFeed(
  source: FeedSource,
  timeoutMs = 8000
): Promise<FeedItem[]> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const res = await fetch(source.url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; AIBlueprint/1.0; +https://aiblueprint.dev)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      cache: "no-store", // avoid Next.js caching issues in dev
    });
    clearTimeout(timer);

    if (!res.ok) {
      console.warn(`[RSS] ${source.name}: HTTP ${res.status}`);
      return [];
    }

    const xml = await res.text();
    const parsed = parseRSSItems(xml);
    console.log(`[RSS] ${source.name}: ${parsed.length} items`);

    return parsed.map((item) => ({
      title: item.title,
      link: item.link,
      summary: item.summary,
      date: item.date ? new Date(item.date).toISOString() : new Date().toISOString(),
      source: source.name,
      sourceIcon: source.icon || source.name.slice(0, 2),
      category: source.category || "Industry",
      tags: [],
      image: item.image,
    }));
  } catch (err) {
    console.warn(`[RSS] ${source.name}: failed -`, (err as Error).message);
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
