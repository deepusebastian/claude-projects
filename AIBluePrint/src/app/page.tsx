import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Newspaper } from "lucide-react";
import Button from "@/components/Button";
import NewsFeed from "@/components/NewsFeed";

export default function LandingPage() {
  return (
    <div className="pt-[60px]">
      {/* ─── Hero ─── */}
      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-500 text-[12px] font-semibold">
              <Newspaper size={13} /> AI News &amp; Tools
            </div>
          </div>

          <h1 className="text-[clamp(28px,4.5vw,48px)] font-extrabold leading-[1.15] max-w-[620px] text-gray-900 tracking-tight mb-4">
            Stay ahead of the{" "}
            <span className="gradient-text">AI revolution</span>
          </h1>

          <p className="text-base md:text-lg text-gray-500 max-w-[520px] leading-relaxed mb-8">
            The latest AI tools, launches, and updates — curated daily for
            builders, founders, and the curious.
          </p>

          <div className="flex gap-3 flex-wrap">
            <Link href="/builder">
              <Button size="lg">
                <Zap size={16} /> Build Your AI Blueprint
              </Button>
            </Link>
            <Link href="/tools">
              <Button variant="secondary" size="lg">
                Browse AI Tools <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Main content: News + Sidebar ─── */}
      <section className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* News feed */}
          <div className="flex-1 min-w-0">
            <NewsFeed />
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-[320px] flex-shrink-0 space-y-6">
            {/* Blueprint CTA */}
            <div className="bg-gradient-to-br from-brand-500 to-blue-500 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} />
                <span className="text-[13px] font-bold uppercase tracking-wide opacity-90">
                  AI Blueprint
                </span>
              </div>
              <h3 className="text-lg font-bold leading-snug mb-2">
                Turn your idea into an AI-powered pipeline
              </h3>
              <p className="text-sm opacity-80 leading-relaxed mb-5">
                Describe what you want to build. Get an instant blueprint of the
                exact AI tools you need — with step-by-step implementation.
              </p>
              <Link href="/builder">
                <button className="w-full bg-white text-brand-600 font-semibold text-sm py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  Try it free <ArrowRight size={14} className="inline ml-1" />
                </button>
              </Link>
            </div>

            {/* Pro plan */}
            <div className="border border-gray-200 rounded-2xl p-6 bg-white">
              <p className="text-[12px] font-bold text-brand-500 uppercase tracking-wide mb-2">
                Pro Plan
              </p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-extrabold text-gray-900">
                  $9.99
                </span>
                <span className="text-sm text-gray-400">/ month</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Unlimited AI blueprints with full details and expert reasoning.
              </p>
              <ul className="space-y-2 mb-5">
                {[
                  "Unlimited blueprints",
                  "Step-by-step details",
                  "Export as PDF",
                  "Cancel anytime",
                ].map((f) => (
                  <li
                    key={f}
                    className="text-sm text-gray-500 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <Button className="w-full justify-center text-sm" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Trending tags */}
            <div className="border border-gray-200 rounded-2xl p-6 bg-white">
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wide mb-3">
                Trending Topics
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "LLM",
                  "Agents",
                  "Image Generation",
                  "Code",
                  "Voice AI",
                  "Open Source",
                  "Automation",
                  "Design",
                  "Video AI",
                  "Infrastructure",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-md border border-gray-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-9 px-6 border-t border-gray-100 text-center text-gray-400 text-[13px]">
        &copy; {new Date().getFullYear()} AI Blueprint. All rights reserved.
      </footer>
    </div>
  );
}
