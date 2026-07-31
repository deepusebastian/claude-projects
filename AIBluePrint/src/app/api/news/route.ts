import { NextResponse } from "next/server";
import { fetchAllFeeds, DEFAULT_FEEDS, type FeedItem } from "@/lib/rss";
import { enrichItemsWithImages } from "@/lib/unsplash";
import { AI_NEWS } from "@/data/ai-news";

// Cache the response for 1 hour. Vercel re-fetches in the background
// after the window expires (stale-while-revalidate). The cron job at
// /api/cron/refresh-news hits this route every 6 hours to keep it warm.
export const revalidate = 3600;

/** Convert static AI_NEWS entries to FeedItem shape for the client. */
function staticFallback(): FeedItem[] {
  return AI_NEWS.map((n) => ({
    title: n.title,
    link: n.sourceUrl,
    summary: n.summary,
    date: new Date(n.date).toISOString(),
    source: n.source,
    sourceIcon: n.toolLetter || n.source.slice(0, 2),
    category: n.category,
    tags: n.tags,
  }));
}

export async function GET() {
  try {
    console.log("[NEWS API] Fetching feeds...");
    const items = await fetchAllFeeds(DEFAULT_FEEDS, 30);
    console.log(`[NEWS API] ${items.length} items fetched`);

    // If RSS returned nothing, serve static fallback so the page is never empty.
    if (items.length === 0) {
      console.log("[NEWS API] RSS returned 0 items — using static fallback");
      return NextResponse.json({
        items: staticFallback(),
        fetchedAt: new Date().toISOString(),
        source: "static",
      });
    }

    // Enrich top 3 items with Unsplash images (if key is configured).
    const topItems = items.slice(0, 3);
    const restItems = items.slice(3);
    const enrichedTop = await enrichItemsWithImages(topItems, 3);
    console.log(`[NEWS API] Top ${enrichedTop.filter((i) => i.image).length}/3 items have images`);

    return NextResponse.json({
      items: [...enrichedTop, ...restItems],
      fetchedAt: new Date().toISOString(),
      source: "rss",
    });
  } catch (err) {
    console.error("[NEWS API] Error:", err);
    // Always return something useful — never an empty array.
    return NextResponse.json({
      items: staticFallback(),
      fetchedAt: new Date().toISOString(),
      source: "static",
      error: String(err),
    });
  }
}
