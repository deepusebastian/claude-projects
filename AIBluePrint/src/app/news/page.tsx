import Link from "next/link";
import { ArrowRight, Sparkles, Zap, BookOpen } from "lucide-react";
import Button from "@/components/Button";
import NewsFeed from "@/components/NewsFeed";
import ToolLogo from "@/components/ToolLogo";
import { FEATURED_TOOLS } from "@/data/ai-tools";
import { PAYMENTS_ENABLED } from "@/lib/flags";

export default function NewsPage() {
  return (
    <div className="pt-[60px] min-h-screen flex flex-col">
      {/* ─── Two-column layout ─── */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* ═══ LEFT: RSS News Feed ═══ */}
        <div className="flex-1 min-w-0 border-r border-gray-100">
          {/* Feed header */}
          <div className="sticky top-[60px] z-10 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              AI News
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Latest tools, launches, and updates — curated from across the web
            </p>
          </div>

          <div className="px-6 py-6 max-w-3xl">
            <NewsFeed />
          </div>
        </div>

        {/* ═══ RIGHT: AI Blueprint + Tools ═══ */}
        <aside className="w-full lg:w-[420px] flex-shrink-0 bg-gray-50/50">
          {/* Sticky sidebar content */}
          <div className="lg:sticky lg:top-[60px] lg:h-[calc(100vh-60px)] lg:overflow-y-auto scrollbar-thin">
            <div className="px-6 py-8 space-y-6">
              {/* Hero CTA */}
              <div className="bg-gradient-to-br from-brand-500 to-blue-500 rounded-2xl p-7 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={18} />
                  <span className="text-[13px] font-bold uppercase tracking-wide opacity-90">
                    AI Blueprint Builder
                  </span>
                </div>
                <h2 className="text-[22px] font-extrabold leading-snug mb-2">
                  Turn your idea into an AI-powered pipeline
                </h2>
                <p className="text-sm opacity-80 leading-relaxed mb-6">
                  Describe what you want to build in plain English. Get an
                  instant blueprint of the exact AI tools you need — with
                  step-by-step implementation details.
                </p>
                <Link href="/">
                  <button className="w-full bg-white text-brand-600 font-semibold text-sm py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                    <Zap size={15} className="inline mr-1.5 -mt-0.5" />
                    Try it free
                    <ArrowRight size={14} className="inline ml-1.5" />
                  </button>
                </Link>
              </div>

              {/* How it works */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wide mb-4">
                  How it works
                </p>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Describe your idea",
                      desc: "Type what you want to build in plain English",
                    },
                    {
                      step: "2",
                      title: "Get your AI stack",
                      desc: "See which tools make up your pipeline instantly",
                    },
                    PAYMENTS_ENABLED
                      ? {
                          step: "3",
                          title: "Unlock full details",
                          desc: "Step-by-step implementation with expert reasoning",
                        }
                      : {
                          step: "3",
                          title: "Get full details — free",
                          desc: "Sign in to see step-by-step implementation guidance",
                        },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {item.step}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing / free CTA */}
              {PAYMENTS_ENABLED ? (
                <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wide mb-3">
                      Pricing
                    </p>

                    {/* Single blueprint */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-50">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Single Blueprint
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          One full unlock — pay as you go
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-extrabold text-gray-900">
                          $2.99
                        </span>
                      </div>
                    </div>

                    {/* Pro plan */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-semibold text-gray-900">
                            Pro Plan
                          </p>
                          <span className="px-1.5 py-0.5 bg-brand-50 text-brand-500 text-[10px] font-bold rounded uppercase">
                            Best value
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Unlimited blueprints · cancel anytime
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-extrabold text-gray-900">
                          $9.99
                        </span>
                        <span className="text-xs text-gray-400"> /mo</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-gray-50/50">
                    <Link href="/">
                      <Button className="w-full justify-center text-sm" size="sm">
                        Try Builder Free
                      </Button>
                    </Link>
                    <p className="text-[11px] text-gray-400 text-center mt-2">
                      First blueprint preview is free
                    </p>
                  </div>
                </div>
              ) : (
                /* Free launch mode — replace pricing with a simple sign-up CTA */
                <div className="border border-green-100 rounded-2xl bg-green-50 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <p className="text-[12px] font-bold text-green-700 uppercase tracking-wide">
                        Free during launch
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      Unlimited blueprints — completely free
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed mb-5">
                      Sign in to generate as many AI tool blueprints as you need.
                      No credit card, no trial limits.
                    </p>
                    <Link href="/signup">
                      <Button className="w-full justify-center text-sm" size="sm">
                        <Sparkles size={14} /> Create free account
                      </Button>
                    </Link>
                    <p className="text-[11px] text-gray-400 text-center mt-2">
                      Already have an account?{" "}
                      <Link href="/login" className="text-brand-500 font-medium hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              )}

              {/* Featured tools */}
              <div className="border border-gray-200 rounded-2xl p-6 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wide">
                    Popular AI Tools
                  </p>
                  <Link
                    href="/tools"
                    className="text-xs text-brand-500 font-semibold hover:text-brand-600 flex items-center gap-1"
                  >
                    View all <ArrowRight size={11} />
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {FEATURED_TOOLS.map((name) => (
                    <ToolLogo key={name} name={name} size={36} />
                  ))}
                </div>
              </div>

              {/* Trending topics */}
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

              {/* Browse tools CTA */}
              <Link
                href="/tools"
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand-500">
                  <BookOpen size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                    Browse AI Tools Directory
                  </p>
                  <p className="text-xs text-gray-400">
                    65+ tools across 24 categories
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="text-gray-300 group-hover:text-brand-500 transition-colors"
                />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
