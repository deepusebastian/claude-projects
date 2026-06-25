import { Suspense } from "react";
import type { Metadata } from "next";
import BuilderClient from "./BuilderClient";

// Opt out of static generation — this page requires auth + uses useSearchParams
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Pipeline Builder",
  description:
    "Describe your idea in plain English and get an instant AI tool pipeline. See which tools to use, step-by-step implementation details, and expert reasoning.",
};

function BuilderFallback() {
  return (
    <div className="min-h-screen flex flex-col pt-[76px] pb-6 px-6 max-w-[860px] mx-auto items-center justify-center text-gray-400 text-sm">
      Loading builder…
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<BuilderFallback />}>
      <BuilderClient />
    </Suspense>
  );
}
