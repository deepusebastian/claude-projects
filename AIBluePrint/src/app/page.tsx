import { Suspense } from "react";
import type { Metadata } from "next";
import BuilderClient from "./builder/BuilderClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Blueprint — Build Your AI Pipeline",
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

export default function HomePage() {
  return (
    <Suspense fallback={<BuilderFallback />}>
      <BuilderClient />
    </Suspense>
  );
}
