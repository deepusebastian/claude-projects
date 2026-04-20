import Link from "next/link";
import {
  Sparkles,
  Zap,
  Shield,
  ArrowRight,
  Check,
} from "lucide-react";
import Button from "@/components/Button";
import ToolLogo from "@/components/ToolLogo";
import { FEATURED_TOOLS } from "@/data/ai-tools";

const features = [
  {
    icon: <Sparkles size={20} />,
    title: "Describe your idea",
    desc: "Type what you want to build in plain English. Our AI instantly identifies your use case and selects the best tools.",
  },
  {
    icon: <Zap size={20} />,
    title: "See your tool stack — free",
    desc: "Instantly see which AI tools make up your pipeline, their categories, and roles. No credit card required.",
  },
  {
    icon: <Shield size={20} />,
    title: "Upgrade to Pro for unlimited",
    desc: "$9.99/month unlocks step-by-step details, expert reasoning, and unlimited blueprints — cancel anytime.",
  },
];

const testimonials = [
  {
    name: "Sarah K.",
    role: "Startup Founder",
    text: "AI Blueprint saved me weeks of research. I had a full AI stack mapped out in 5 minutes.",
  },
  {
    name: "Marcus T.",
    role: "Product Manager",
    text: "Finally, a tool that helps non-technical people understand which AI tools to use and why.",
  },
  {
    name: "Priya N.",
    role: "Freelance Creator",
    text: "I automated my entire content pipeline using the blueprint it generated. Game changer.",
  },
];

const freePlanFeatures = [
  "Unlimited blueprint previews",
  "See all tools + categories",
  "See each tool's role in your pipeline",
  "1 free full unlock included",
];

const singlePlanFeatures = [
  "1 full blueprint unlock",
  "Step-by-step implementation details",
  "Expert reasoning for every tool",
  "Save & export as PDF",
];

const proPlanFeatures = [
  "Unlimited AI blueprints",
  "Full step-by-step implementation details",
  "Expert reasoning for every tool choice",
  "Save & export as PDF",
  "Priority support",
];

export default function LandingPage() {
  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-[120px] pb-20 relative overflow-hidden">
        {/* Background blurs */}
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(108,60,239,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-[65%] right-[20%] translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(59,108,239,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-500 text-[13px] font-semibold mb-8">
          <Sparkles size={14} /> Now in Public Beta
        </div>

        <h1 className="text-[clamp(36px,5.5vw,64px)] font-extrabold leading-[1.1] max-w-[750px] mb-6 text-gray-900 tracking-tight">
          Know exactly which{" "}
          <span className="gradient-text">AI tools</span> to build with
        </h1>

        <p className="text-lg text-gray-500 max-w-[560px] leading-relaxed mb-11">
          Describe your idea. Get an instant AI pipeline — then unlock for{" "}
          <span className="font-semibold text-gray-700">$2.99 per blueprint</span>{" "}
          or go unlimited with Pro at{" "}
          <span className="font-semibold text-gray-700">$9.99/month</span>.
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          <Link href="/signup">
            <Button size="lg">
              Start Free <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/builder">
            <Button variant="secondary" size="lg">
              Try the Builder
            </Button>
          </Link>
        </div>

        {/* Floating tool logos */}
        <div className="flex gap-3.5 mt-[72px] flex-wrap justify-center">
          {FEATURED_TOOLS.map((name) => (
            <ToolLogo key={name} name={name} size={44} />
          ))}
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="py-20 px-6 max-w-[1060px] mx-auto">
        <h2 className="text-[32px] font-bold text-center mb-14 text-gray-900">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-[14px] p-7 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-[46px] h-[46px] rounded-[11px] bg-brand-50 flex items-center justify-center text-brand-500 mb-5">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2.5">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section className="py-20 px-6 max-w-[1060px] mx-auto">
        <h2 className="text-[32px] font-bold text-center mb-3 text-gray-900">
          Simple, transparent pricing
        </h2>
        <p className="text-center text-gray-500 mb-14 text-base">
          Preview every blueprint free. Buy one at a time for $2.99, or go unlimited with Pro at $9.99/month.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Free Tier */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col">
            <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wide mb-2">
              Starter
            </p>
            <p className="text-[44px] font-extrabold text-gray-900 mb-2">
              Free
            </p>
            <p className="text-sm text-gray-500 mb-7">
              See your tool stack instantly. First full unlock on us.
            </p>
            <div className="flex-1 mb-6">
              {freePlanFeatures.map((item) => (
                <div key={item} className="flex items-center gap-2.5 mb-3 text-gray-500 text-sm">
                  <Check size={15} className="text-gray-400 flex-shrink-0" /> {item}
                </div>
              ))}
            </div>
            <Link href="/signup">
              <Button variant="secondary" className="w-full justify-center">
                Get Started Free
              </Button>
            </Link>
          </div>

          {/* Single Blueprint Tier */}
          <div className="bg-white border border-amber-300 rounded-2xl p-8 shadow-sm flex flex-col relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 px-3.5 py-1 rounded-full text-[12px] font-bold text-white whitespace-nowrap">
              Pay as you go
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="text-amber-500" />
              <p className="text-[13px] font-bold text-amber-500 uppercase tracking-wide">
                Single
              </p>
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-[44px] font-extrabold text-gray-900">$2.99</span>
            </div>
            <p className="text-sm text-gray-500 mb-7">
              One blueprint credit. Perfect for occasional use — buy more anytime.
            </p>
            <div className="flex-1 mb-6">
              {singlePlanFeatures.map((item) => (
                <div key={item} className="flex items-center gap-2.5 mb-3 text-gray-500 text-sm">
                  <Check size={15} className="text-amber-500 flex-shrink-0" /> {item}
                </div>
              ))}
            </div>
            <Link href="/signup">
              <Button className="w-full justify-center bg-amber-500 hover:bg-amber-600 border-amber-500">
                Buy a Blueprint
              </Button>
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="bg-white border-2 border-brand-500 rounded-2xl p-8 relative shadow-[0_4px_20px_rgba(108,60,239,0.12)] flex flex-col">
            <div className="absolute -top-3 right-6 bg-gradient-to-br from-brand-500 to-blue-500 px-3.5 py-1 rounded-full text-[12px] font-bold text-white">
              Best value
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-brand-500" />
              <p className="text-[13px] font-bold text-brand-500 uppercase tracking-wide">
                Pro
              </p>
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-[44px] font-extrabold text-gray-900">$9.99</span>
              <span className="text-sm text-gray-400">/ month</span>
            </div>
            <p className="text-sm text-gray-500 mb-7">
              Unlimited blueprints with full details, reasoning, and export. Cancel anytime.
            </p>
            <div className="flex-1 mb-6">
              {proPlanFeatures.map((item) => (
                <div key={item} className="flex items-center gap-2.5 mb-3 text-gray-500 text-sm">
                  <Check size={15} className="text-brand-500 flex-shrink-0" /> {item}
                </div>
              ))}
            </div>
            <Link href="/signup">
              <Button className="w-full justify-center">Start Building</Button>
            </Link>
          </div>

        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-20 px-6 max-w-[1060px] mx-auto">
        <h2 className="text-[32px] font-bold text-center mb-14 text-gray-900">
          Loved by builders
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-[14px] p-6 shadow-sm"
            >
              <p className="text-sm text-gray-500 leading-relaxed mb-5 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-brand-500 to-blue-500 flex items-center justify-center text-white font-bold text-[15px]">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 px-6 text-center bg-gray-50">
        <h2 className="text-[32px] font-bold text-gray-900 mb-3.5">
          Ready to build with AI?
        </h2>
        <p className="text-base text-gray-500 mb-9 max-w-[480px] mx-auto">
          First unlock is free. Then pay $2.99 per blueprint or $9.99/month for unlimited — no commitment required.
        </p>
        <Link href="/signup">
          <Button size="lg">
            Create Your Blueprint <ArrowRight size={18} />
          </Button>
        </Link>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-9 px-6 border-t border-gray-100 text-center text-gray-400 text-[13px]">
        &copy; {new Date().getFullYear()} AI Blueprint. All rights reserved.
      </footer>
    </div>
  );
}
