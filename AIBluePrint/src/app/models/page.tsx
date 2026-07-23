import type { Metadata } from "next";
import ModelsLeaderboard from "@/components/ModelsLeaderboard";

export const metadata: Metadata = {
  title: "LLM Models Leaderboard",
  description:
    "Compare the latest AI language models side by side — pricing, context windows, quality tiers, and capabilities from OpenAI, Anthropic, Google, Meta, and more.",
};

export default function ModelsPage() {
  return (
    <div className="pt-[104px] min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
          <h1 className="text-[clamp(24px,4vw,40px)] font-extrabold text-gray-900 tracking-tight mb-3">
            LLM Models{" "}
            <span className="gradient-text">Leaderboard</span>
          </h1>
          <p className="text-base md:text-lg text-gray-500 max-w-[600px] leading-relaxed">
            Compare the latest AI language models side by side — pricing,
            context windows, and capabilities from the top providers.
          </p>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <ModelsLeaderboard />
      </div>
    </div>
  );
}
