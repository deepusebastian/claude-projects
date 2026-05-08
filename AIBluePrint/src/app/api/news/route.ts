import { NextResponse } from "next/server";
import { fetchAllFeeds, DEFAULT_FEEDS } from "@/lib/rss";

export const dynamic = "force-dynamic"; // always fetch fresh in dev

export async function GET() {
  try {
    console.log("[NEWS API] Fetching feeds...");
    const items = await fetchAllFeeds(DEFAULT_FEEDS, 30);
    console.log(`[NEWS API] Returning ${items.length} items`);
    return NextResponse.json({ items, fetchedAt: new Date().toISOString() });
  } catch (err) {
    console.error("[NEWS API] Error:", err);
    return NextResponse.json(
      { items: [], fetchedAt: new Date().toISOString(), error: "Failed to fetch feeds" },
      { status: 500 }
    );
  }
}
