import { NextResponse } from "next/server";
import { fetchAllFeeds, DEFAULT_FEEDS } from "@/lib/rss";

export const revalidate = 900; // ISR: revalidate every 15 minutes

export async function GET() {
  try {
    const items = await fetchAllFeeds(DEFAULT_FEEDS, 30);
    return NextResponse.json({ items, fetchedAt: new Date().toISOString() });
  } catch {
    return NextResponse.json(
      { items: [], fetchedAt: new Date().toISOString(), error: "Failed to fetch feeds" },
      { status: 500 }
    );
  }
}
