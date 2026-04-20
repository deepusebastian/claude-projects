import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import Button from "@/components/Button";
import ToolLogo from "@/components/ToolLogo";
import { PIPELINE_SCENARIOS } from "@/data/pipelines";
import {
  USE_CASES,
  getUseCaseBySlug,
  getAllUseCaseSlugs,
} from "@/data/use-cases";

// ─── Static Params (pre-render all use-case pages at build time) ────────────

export function generateStaticParams() {
  return getAllUseCaseSlugs().map((slug) => ({ slug }));
}

// ─── Dynamic SEO Metadata ───────────────────────────────────────────────────

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getUseCaseBySlug(slug);

  if (!useCase) {
    return { title: "Use Case Not Found" };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://aiblueprint.dev";

  return {
    title: useCase.metaTitle,
    description: useCase.metaDescription,
    keywords: useCase.keywords,
    openGraph: {
      title: useCase.metaTitle,
      description: useCase.metaDescription,
      url: `${siteUrl}/use-cases/${slug}`,
      type: "article",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: useCase.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: useCase.metaTitle,
      description: useCase.metaDescription,
    },
    alternates: {
      canonical: `${siteUrl}/use-cases/${slug}`,
    },
  };
}

// ─── Page Component ─────────────────────────────────────────────────────────

export default async function UseCasePage({ params }: PageProps) {
  const { slug } = await params;
  const useCase = getUseCaseBySlug(slug);

  if (!useCase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Use case not found
          </h1>
          <Link href="/" className="text-brand-500 underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const pipeline = PIPELINE_SCENARIOS[useCase.scenarioKey];

  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="flex flex-col items-center text-center px-6 pt-[140px] pb-20 relative overflow-hidden">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(108,60,239,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-500 text-[13px] font-semibold mb-8">
          <Sparkles size={14} /> AI Blueprint for {useCase.name}
        </div>

        <h1 className="text-[clamp(32px,5vw,56px)] font-extrabold leading-[1.1] max-w-[700px] mb-6 text-gray-900 tracking-tight">
          {useCase.heroHeading}
        </h1>

        <p className="text-lg text-gray-500 max-w-[560px] leading-relaxed mb-11">
          {useCase.heroSubheading}
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          <Link href="/signup">
            <Button size="lg">
              Get Your Blueprint <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/builder">
            <Button variant="secondary" size="lg">
              Try the Builder
            </Button>
          </Link>
        </div>
      </section>

      {/* ─── Pain Points ─── */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-[860px] mx-auto">
          <h2 className="text-[28px] font-bold text-center mb-10 text-gray-900">
            Sound familiar?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {useCase.painPoints.map((point, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-[14px] p-6 shadow-sm"
              >
                <p className="text-sm text-gray-600 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pipeline Preview ─── */}
      {pipeline && (
        <section className="py-20 px-6">
          <div className="max-w-[860px] mx-auto">
            <h2 className="text-[28px] font-bold text-center mb-4 text-gray-900">
              Your AI pipeline for {useCase.name.toLowerCase()}
            </h2>
            <p className="text-center text-gray-500 mb-14 max-w-[560px] mx-auto">
              {pipeline.summary}
            </p>

            <div className="space-y-4">
              {pipeline.steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-5 bg-white border border-gray-200 rounded-[14px] p-6 shadow-sm"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <ToolLogo name={step.tool} size={40} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="text-[13px] font-bold text-brand-500">
                        Step {i + 1}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {step.tool}
                      </span>
                      <span className="text-xs text-gray-400">
                        {step.role}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Who It's For ─── */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-[860px] mx-auto text-center">
          <h2 className="text-[28px] font-bold mb-4 text-gray-900">
            Built for {useCase.audience.toLowerCase()}
          </h2>
          <p className="text-gray-500 mb-10 max-w-[480px] mx-auto">
            Whether you&apos;re just getting started or scaling up, AI Blueprint
            gives you the exact tools and implementation path for your{" "}
            {useCase.name.toLowerCase()} workflow.
          </p>
          <div className="inline-flex flex-col items-start gap-3 text-left">
            {[
              "Instant AI tool recommendations tailored to your use case",
              "Step-by-step implementation details for each tool",
              "Expert reasoning for why each tool was chosen",
              "Export and share your blueprint with your team",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5 text-gray-600 text-sm"
              >
                <Check size={16} className="text-brand-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-[32px] font-bold text-gray-900 mb-3.5">
          Ready to build your {useCase.name.toLowerCase()} AI pipeline?
        </h2>
        <p className="text-base text-gray-500 mb-9 max-w-[480px] mx-auto">
          Preview is always free. First full blueprint unlock on us — no credit
          card required.
        </p>
        <Link href="/signup">
          <Button size="lg">
            Create Your Blueprint <ArrowRight size={18} />
          </Button>
        </Link>
      </section>

      {/* ─── Other Use Cases ─── */}
      <section className="py-16 px-6 border-t border-gray-100">
        <div className="max-w-[1060px] mx-auto">
          <h3 className="text-xl font-bold text-center mb-8 text-gray-900">
            Explore other AI blueprints
          </h3>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {USE_CASES.filter((uc) => uc.slug !== slug)
              .slice(0, 8)
              .map((uc) => (
                <Link
                  key={uc.slug}
                  href={`/use-cases/${uc.slug}`}
                  className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-brand-300 hover:text-brand-500 transition-colors"
                >
                  {uc.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-9 px-6 border-t border-gray-100 text-center text-gray-400 text-[13px]">
        &copy; {new Date().getFullYear()} AI Blueprint. All rights reserved.
      </footer>
    </div>
  );
}
