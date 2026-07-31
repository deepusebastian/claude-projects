import { NextResponse } from "next/server";

/**
 * Cron endpoint — called by Vercel Cron every 6 hours (see vercel.json).
 * It simply warms the /api/news and /api/models caches by fetching them,
 * so users never hit a cold RSS fetch.
 *
 * Vercel passes the CRON_SECRET as a Bearer token when it calls this route.
 * Set CRON_SECRET in your Vercel environment variables.
 */
export const dynamic = "force-dynamic"; // cron must always run, never serve cached response

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.aiblueprintapps.com";

export async function GET(request: Request) {
  // Verify the request is from Vercel Cron (or an authorised caller).
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: Record<string, string> = {};

  // Revalidate news cache
  try {
    const newsRes = await fetch(`${BASE_URL}/api/news`, {
      cache: "no-store",
      headers: { "x-cron-refresh": "1" },
    });
    const newsData = await newsRes.json();
    results.news = `${newsRes.status} — ${newsData.items?.length ?? 0} items (source: ${newsData.source ?? "?"})`;
  } catch (err) {
    results.news = `error: ${(err as Error).message}`;
  }

  // Revalidate models cache
  try {
    const modelsRes = await fetch(`${BASE_URL}/api/models`, {
      cache: "no-store",
      headers: { "x-cron-refresh": "1" },
    });
    const modelsData = await modelsRes.json();
    results.models = `${modelsRes.status} — ${modelsData.models?.length ?? 0} models (source: ${modelsData.source ?? "?"})`;
  } catch (err) {
    results.models = `error: ${(err as Error).message}`;
  }

  console.log("[CRON] refresh-news results:", results);
  return NextResponse.json({ ok: true, refreshedAt: new Date().toISOString(), results });
}
