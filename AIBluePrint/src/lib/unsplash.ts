/**
 * Unsplash image enrichment for RSS feed items.
 *
 * Uses Unsplash's free Search API to find relevant landscape photos
 * based on article titles. Results are cached in-memory to stay within
 * the free-tier rate limit (50 req/hr for demo apps).
 *
 * Set UNSPLASH_ACCESS_KEY in your .env.local to enable.
 * Get a free key at: https://unsplash.com/developers
 */

// ── In-memory cache (survives hot-reloads in Next.js dev via module cache) ──

const imageCache = new Map<string, string | null>();
// null = already tried, no result (avoid retrying known misses)

// ── Stop words for keyword extraction ───────────────────────────────────

const STOP_WORDS = new Set([
  "a","an","the","is","it","in","on","at","to","for","of","and","or","but",
  "with","from","by","as","are","was","were","has","have","had","be","been",
  "that","this","will","would","could","should","may","might","do","does",
  "did","how","why","what","when","where","who","which","into","about","than",
  "more","most","also","just","not","no","its","my","your","our","their",
  "his","her","they","we","you","so","if","up","out","can","all","any",
  "some","now","still","even","after","before","here","there","then","over",
  "only","too","very","new","says","said","one","two","three","many","get",
  "got","use","used","using","let","ask","want","make","made","give","take",
  "know","think","need","look","first","last","year","years","time","day",
  "week","month","way","back","well","much","good","right","same","own",
  "each","every","never","always","already","being","having","him","us","them",
]);

// ── Keyword extraction ───────────────────────────────────────────────────

function extractKeywords(title: string): string {
  const words = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
    .slice(0, 4);

  // Always add a context anchor so results stay tech-relevant
  return [...words, "technology"].join(" ");
}

// ── Single image fetch ───────────────────────────────────────────────────

export async function fetchUnsplashImage(
  title: string
): Promise<string | undefined> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) return undefined;

  const cacheKey = title.trim().toLowerCase().slice(0, 60);

  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey) ?? undefined;
  }

  try {
    const query = extractKeywords(title);
    const url =
      `https://api.unsplash.com/search/photos` +
      `?query=${encodeURIComponent(query)}` +
      `&per_page=1&orientation=landscape&content_filter=high`;

    const res = await fetch(url, {
      headers: { Authorization: `Client-ID ${accessKey}` },
      signal: AbortSignal.timeout(5000),
      // Don't let Next.js cache this at the fetch level — we manage our own cache
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(`[Unsplash] HTTP ${res.status} for query: ${query}`);
      imageCache.set(cacheKey, null);
      return undefined;
    }

    const data = await res.json();
    // Use the "regular" size (~1080px wide) — good quality, reasonable file size
    const photo: string | undefined = data.results?.[0]?.urls?.regular;

    imageCache.set(cacheKey, photo ?? null);
    return photo;
  } catch (err) {
    console.warn(`[Unsplash] fetch failed for "${title}":`, (err as Error).message);
    imageCache.set(cacheKey, null);
    return undefined;
  }
}

// ── Batch enrichment ─────────────────────────────────────────────────────

/**
 * For each item in the array that is missing an image, attempts to fetch
 * one from Unsplash. Caps at `maxNewRequests` to protect the rate limit.
 */
export async function enrichItemsWithImages<
  T extends { title: string; image?: string }
>(items: T[], maxNewRequests = 10): Promise<T[]> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) return items;

  // Collect items that need images, respecting the cap
  const toEnrich: { index: number; item: T }[] = [];
  let newRequestCount = 0;

  for (let i = 0; i < items.length; i++) {
    if (items[i].image) continue; // already has one

    const cacheKey = items[i].title.trim().toLowerCase().slice(0, 60);
    if (imageCache.has(cacheKey)) {
      // Cached hit or known miss — counts for free
      toEnrich.push({ index: i, item: items[i] });
    } else if (newRequestCount < maxNewRequests) {
      toEnrich.push({ index: i, item: items[i] });
      newRequestCount++;
    }
  }

  if (toEnrich.length === 0) return items;

  // Fetch concurrently
  const fetched = await Promise.all(
    toEnrich.map(({ item }) => fetchUnsplashImage(item.title))
  );

  // Merge results back
  const enriched = [...items];
  toEnrich.forEach(({ index }, i) => {
    if (fetched[i]) {
      enriched[index] = { ...enriched[index], image: fetched[i] };
    }
  });

  return enriched;
}
