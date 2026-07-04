import { NextResponse } from "next/server";
import { fetchAllFeeds, DEFAULT_FEEDS } from "@/lib/rss";
import { enrichItemsWithImages } from "@/lib/unsplash";

export const dynamic = "force-dynamic"; // always fetch fresh in dev

export async function GET() {
  try {
    console.log("[NEWS API] Fetching feeds...");
    const items = await fetchAllFeeds(DEFAULT_FEEDS, 30);
    console.log(`[NEWS API] ${items.length} items fetched, enriching images...`);

    // Prioritise the top 3 items (hero + 2 secondary featured cards) —
    // await those first so they appear immediately on load.
    const topItems = items.slice(0, 3);
    const restItems = items.slice(3);

    const enrichedTop = await enrichItemsWithImages(topItems, 3);
    console.log(`[NEWS API] Top ${enrichedTop.filter((i) => i.image).length}/3 items have images`);

    // Fire-and-forget the rest: results are cached in-memory and used on
    // the next refresh, so the grid fills in progressively across reloads.
    enrichItemsWithImages(restItems, 10).catch(() => {});

    return NextResponse.json({
      items: [...enrichedTop, ...restItems],
      fetchedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[NEWS API] Error:", err);
    return NextResponse.json(
      { items: [], fetchedAt: new Date().toISOString(), error: "Failed to fetch feeds" },
      { status: 500 }
    );
  }
}
