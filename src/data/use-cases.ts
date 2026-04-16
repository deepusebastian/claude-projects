/**
 * SEO landing page data for each pipeline scenario.
 * Maps URL slugs to scenario keys, display names, and SEO metadata.
 */

export interface UseCaseData {
  slug: string;
  scenarioKey: string; // maps to PIPELINE_SCENARIOS key
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroHeading: string;
  heroSubheading: string;
  audience: string; // who this is for
  painPoints: string[]; // problems this solves
}

export const USE_CASES: UseCaseData[] = [
  {
    slug: "e-commerce",
    scenarioKey: "e-commerce",
    name: "E-Commerce",
    tagline: "AI-powered product pages, search, and support",
    metaTitle: "Best AI Tools for E-Commerce",
    metaDescription:
      "Get a complete AI tool pipeline for your e-commerce store — product copywriting, image generation, semantic search, automated support, and inventory workflows.",
    keywords: ["AI e-commerce tools", "AI product descriptions", "AI customer support", "e-commerce automation"],
    heroHeading: "Build a smarter online store with AI",
    heroSubheading:
      "From product copy to customer support — get the exact AI tools you need to automate and scale your e-commerce business.",
    audience: "E-commerce founders, Shopify merchants, DTC brands",
    painPoints: [
      "Writing hundreds of product descriptions manually",
      "Expensive product photography for every SKU",
      "Support tickets overwhelming your small team",
    ],
  },
  {
    slug: "content-marketing",
    scenarioKey: "content-marketing",
    name: "Content Marketing",
    tagline: "Write, optimize, and distribute at scale",
    metaTitle: "Best AI Tools for Content Marketing",
    metaDescription:
      "Discover the ideal AI pipeline for content marketing — long-form writing, SEO optimization, visual content, audio narration, and cross-platform publishing.",
    keywords: ["AI content marketing", "AI blog writing", "AI SEO tools", "content automation"],
    heroHeading: "Scale your content without scaling your team",
    heroSubheading:
      "AI-powered writing, SEO optimization, visuals, and automated distribution — all with consistent brand voice.",
    audience: "Content marketers, blog managers, growth teams",
    painPoints: [
      "Can't produce enough content to stay competitive",
      "SEO optimization is tedious and time-consuming",
      "Repurposing across platforms takes too long",
    ],
  },
  {
    slug: "youtube",
    scenarioKey: "youtube",
    name: "YouTube",
    tagline: "Script, produce, and publish videos faster",
    metaTitle: "Best AI Tools for YouTube Creators",
    metaDescription:
      "Get the complete AI pipeline for YouTube content — scripts, avatar videos, B-roll generation, editing, and thumbnail design.",
    keywords: ["AI YouTube tools", "AI video production", "AI thumbnail generator", "YouTube automation"],
    heroHeading: "Produce YouTube videos 10x faster with AI",
    heroSubheading:
      "From script to thumbnail — build a complete AI production pipeline that lets you focus on ideas, not editing.",
    audience: "YouTubers, video creators, content agencies",
    painPoints: [
      "Video production takes days per episode",
      "Can't afford professional editors or designers",
      "Scaling video output without burning out",
    ],
  },
  {
    slug: "saas",
    scenarioKey: "saas",
    name: "SaaS",
    tagline: "Add AI features to your SaaS product",
    metaTitle: "Best AI Tools for Building SaaS Products",
    metaDescription:
      "Build AI-powered SaaS applications with the right stack — streaming UI, LLM integration, RAG pipelines, vector search, and serverless GPU infrastructure.",
    keywords: ["AI SaaS stack", "LLM SaaS integration", "RAG pipeline tools", "AI developer tools"],
    heroHeading: "Ship AI-powered features your users will love",
    heroSubheading:
      "The exact tools and infrastructure to add intelligent features to your SaaS — from streaming chat to vector search.",
    audience: "SaaS founders, product engineers, CTOs",
    painPoints: [
      "Choosing between dozens of LLM providers and frameworks",
      "Making AI features feel fast and responsive",
      "Scaling AI workloads without runaway costs",
    ],
  },
  {
    slug: "research",
    scenarioKey: "research",
    name: "Research & Analysis",
    tagline: "Automate research from gathering to insight",
    metaTitle: "Best AI Tools for Research & Analysis",
    metaDescription:
      "Build an AI research pipeline — web gathering, deep analysis, interview transcription, knowledge bases, and fact verification.",
    keywords: ["AI research tools", "AI analysis", "research automation", "AI knowledge base"],
    heroHeading: "Turn weeks of research into hours",
    heroSubheading:
      "Web research, multi-source analysis, interview processing, and searchable knowledge bases — all automated with AI.",
    audience: "Analysts, consultants, academics, journalists",
    painPoints: [
      "Manually searching and summarizing dozens of sources",
      "Transcribing and extracting insights from interviews",
      "Keeping research organized and searchable",
    ],
  },
  {
    slug: "podcast",
    scenarioKey: "podcast",
    name: "Podcast",
    tagline: "Plan, record, and edit podcasts with AI",
    metaTitle: "Best AI Tools for Podcast Production",
    metaDescription:
      "Streamline your podcast workflow with AI — episode planning, real-time transcription, text-based editing, voice generation, and automated show notes.",
    keywords: ["AI podcast tools", "podcast transcription", "AI audio editing", "podcast automation"],
    heroHeading: "Produce professional podcasts without a production team",
    heroSubheading:
      "AI-powered planning, transcription, text-based editing, and branded voice generation — from idea to published episode.",
    audience: "Podcasters, audio creators, media companies",
    painPoints: [
      "Editing takes longer than recording",
      "Writing show notes and transcripts is tedious",
      "Consistent intros and ad reads are hard to produce",
    ],
  },
  {
    slug: "film",
    scenarioKey: "film",
    name: "Film & Video",
    tagline: "AI-assisted filmmaking and production",
    metaTitle: "Best AI Tools for Film Production",
    metaDescription:
      "Build an AI film production pipeline — screenwriting, scene generation, VFX, scoring, and voice acting with the latest AI tools.",
    keywords: ["AI film tools", "AI video production", "AI VFX", "AI filmmaking"],
    heroHeading: "Bring your stories to screen with AI",
    heroSubheading:
      "From screenplay to final cut — AI tools for scene generation, visual effects, music scoring, and voice performance.",
    audience: "Filmmakers, directors, video producers, indie studios",
    painPoints: [
      "VFX and post-production are expensive",
      "Finding the right music and voice talent",
      "Turning scripts into visual storyboards quickly",
    ],
  },
  {
    slug: "music",
    scenarioKey: "music",
    name: "Music",
    tagline: "Compose, produce, and distribute music with AI",
    metaTitle: "Best AI Tools for Music Production",
    metaDescription:
      "Create music with AI — composition, vocal generation, voiceover, album art, and distribution tools for modern musicians.",
    keywords: ["AI music tools", "AI music generation", "AI vocals", "music production AI"],
    heroHeading: "Create, produce, and release music faster with AI",
    heroSubheading:
      "AI-powered composition, vocals, mastering, artwork, and distribution — a complete pipeline for modern musicians.",
    audience: "Musicians, producers, beatmakers, indie artists",
    painPoints: [
      "Production costs for professional tracks",
      "Need vocals or instruments you can't record",
      "Album art and visual branding on a budget",
    ],
  },
  {
    slug: "education",
    scenarioKey: "education",
    name: "Education",
    tagline: "Build AI-powered courses and learning tools",
    metaTitle: "Best AI Tools for Education & Course Creation",
    metaDescription:
      "Design AI-enhanced educational experiences — curriculum planning, video lectures, course materials, interactive tutoring, and knowledge bases.",
    keywords: ["AI education tools", "AI course creation", "AI tutoring", "edtech AI"],
    heroHeading: "Create world-class learning experiences with AI",
    heroSubheading:
      "Curriculum design, video lectures, interactive tutoring, and adaptive learning — all powered by the best AI tools.",
    audience: "Educators, course creators, edtech founders",
    painPoints: [
      "Creating engaging course content takes months",
      "Students need personalized help at scale",
      "Keeping materials current and relevant",
    ],
  },
  {
    slug: "customer-support",
    scenarioKey: "customer-support",
    name: "Customer Support",
    tagline: "Automate support with AI agents",
    metaTitle: "Best AI Tools for Customer Support",
    metaDescription:
      "Build an AI-powered support pipeline — frontline AI agents, voice transcription, smart triage, knowledge retrieval, and workflow automation.",
    keywords: ["AI customer support", "AI chatbot", "support automation", "AI helpdesk"],
    heroHeading: "Resolve support tickets faster with AI",
    heroSubheading:
      "AI agents that handle frontline support, smart triage, and automated workflows — so your team focuses on complex issues.",
    audience: "Support managers, ops teams, SaaS companies",
    painPoints: [
      "Ticket volume growing faster than your team",
      "Agents answering the same questions repeatedly",
      "Slow response times hurting customer satisfaction",
    ],
  },
  {
    slug: "legal",
    scenarioKey: "legal",
    name: "Legal & Compliance",
    tagline: "AI-powered contract review and compliance",
    metaTitle: "Best AI Tools for Legal & Compliance",
    metaDescription:
      "Streamline legal workflows with AI — contract analysis, regulatory monitoring, precedent search, and compliance automation.",
    keywords: ["AI legal tools", "AI contract review", "legal automation", "compliance AI"],
    heroHeading: "Automate legal research and compliance with AI",
    heroSubheading:
      "Contract analysis, regulatory monitoring, precedent search, and workflow automation — purpose-built for legal teams.",
    audience: "Lawyers, legal ops, compliance officers, law firms",
    painPoints: [
      "Contract review takes hours per document",
      "Keeping up with regulatory changes",
      "Finding relevant precedents across thousands of cases",
    ],
  },
  {
    slug: "healthcare",
    scenarioKey: "healthcare",
    name: "Healthcare",
    tagline: "AI tools for clinical documentation and care",
    metaTitle: "Best AI Tools for Healthcare",
    metaDescription:
      "Build AI healthcare workflows — clinical transcription, documentation, on-premises inference, knowledge bases, and EHR integration.",
    keywords: ["AI healthcare tools", "clinical AI", "medical transcription AI", "healthcare automation"],
    heroHeading: "Reduce administrative burden with healthcare AI",
    heroSubheading:
      "Clinical transcription, smart documentation, and knowledge bases that integrate with your existing EHR systems.",
    audience: "Healthcare providers, health-tech founders, hospital IT",
    painPoints: [
      "Clinicians spend more time on paperwork than patients",
      "Compliance requirements for data handling",
      "Integrating AI with existing clinical systems",
    ],
  },
  {
    slug: "real-estate",
    scenarioKey: "real-estate",
    name: "Real Estate",
    tagline: "AI-powered listings, staging, and marketing",
    metaTitle: "Best AI Tools for Real Estate",
    metaDescription:
      "Create AI-enhanced real estate workflows — listing generation, virtual staging, property tours, marketing content, and lead automation.",
    keywords: ["AI real estate tools", "AI virtual staging", "real estate marketing AI", "property listing AI"],
    heroHeading: "Sell properties faster with AI",
    heroSubheading:
      "AI-generated listings, virtual staging, property tours, and automated lead nurturing — everything you need to close deals faster.",
    audience: "Real estate agents, brokers, property managers",
    painPoints: [
      "Writing compelling listing descriptions for every property",
      "Staging costs for vacant properties",
      "Generating and qualifying leads consistently",
    ],
  },
  {
    slug: "gaming",
    scenarioKey: "gaming",
    name: "Gaming",
    tagline: "AI-generated assets, dialogue, and music",
    metaTitle: "Best AI Tools for Game Development",
    metaDescription:
      "Build games faster with AI — asset generation, character art, NPC dialogue, dynamic soundtracks, and voice acting tools.",
    keywords: ["AI game development", "AI game assets", "NPC dialogue AI", "game dev AI tools"],
    heroHeading: "Build richer games with AI-generated content",
    heroSubheading:
      "Generate assets, write NPC dialogue, compose soundtracks, and produce voice acting — all with AI tools built for game developers.",
    audience: "Indie game devs, studios, game designers",
    painPoints: [
      "Art and asset creation bottlenecks",
      "Writing unique dialogue for hundreds of NPCs",
      "Music and sound design costs",
    ],
  },
  {
    slug: "startup-mvp",
    scenarioKey: "startup",
    name: "Startup MVP",
    tagline: "Ship your AI-powered MVP fast",
    metaTitle: "Best AI Tools for Building a Startup MVP",
    metaDescription:
      "Build your AI startup MVP with the right tools — rapid prototyping, AI feature integration, vector storage, LLM intelligence, and deployment.",
    keywords: ["AI startup tools", "MVP development AI", "startup tech stack", "AI prototyping"],
    heroHeading: "Go from idea to MVP in days, not months",
    heroSubheading:
      "The fastest path to a working AI-powered product — prototyping, intelligence layer, data storage, and deployment.",
    audience: "First-time founders, solo developers, hackathon teams",
    painPoints: [
      "Too many tools to evaluate before building",
      "Spending months on infrastructure instead of product",
      "Choosing a stack that scales past the prototype",
    ],
  },
  {
    slug: "data-analytics",
    scenarioKey: "data-analytics",
    name: "Data Analytics",
    tagline: "AI-powered data ingestion, analysis, and insights",
    metaTitle: "Best AI Tools for Data Analytics",
    metaDescription:
      "Build AI-driven analytics pipelines — data ingestion, processing, natural language BI, insight generation, and workflow automation.",
    keywords: ["AI data analytics", "AI BI tools", "data pipeline AI", "analytics automation"],
    heroHeading: "Get insights from your data without writing SQL",
    heroSubheading:
      "Natural language queries, automated analysis, and AI-generated insights — turn raw data into decisions faster.",
    audience: "Data teams, business analysts, ops managers",
    painPoints: [
      "Non-technical stakeholders can't query data themselves",
      "Building dashboards takes longer than getting answers",
      "Connecting and cleaning data from multiple sources",
    ],
  },
  {
    slug: "agency",
    scenarioKey: "agency",
    name: "Agency",
    tagline: "Scale agency output with AI",
    metaTitle: "Best AI Tools for Agencies",
    metaDescription:
      "Run a more efficient agency with AI — campaign copy, creative direction, design production, outreach, and delivery automation.",
    keywords: ["AI agency tools", "AI copywriting", "agency automation", "creative AI tools"],
    heroHeading: "Deliver more client work without hiring more people",
    heroSubheading:
      "AI-powered copywriting, design, outreach, and delivery automation — scale your agency's output profitably.",
    audience: "Agency owners, creative directors, account managers",
    painPoints: [
      "Client deliverables bottlenecked on creative capacity",
      "Margins shrinking as project scope grows",
      "Repetitive tasks eating into strategic work",
    ],
  },
  {
    slug: "enterprise",
    scenarioKey: "enterprise",
    name: "Enterprise",
    tagline: "Secure AI for enterprise workflows",
    metaTitle: "Best AI Tools for Enterprise",
    metaDescription:
      "Deploy enterprise AI — knowledge search, app integration, on-premises LLMs, vector search, and multi-agent workflows with security and compliance.",
    keywords: ["enterprise AI tools", "enterprise LLM", "AI knowledge management", "enterprise automation"],
    heroHeading: "Deploy AI across your organization — securely",
    heroSubheading:
      "Knowledge search, on-premises models, multi-agent workflows, and enterprise integrations with the security controls you need.",
    audience: "CTOs, enterprise architects, IT leaders",
    painPoints: [
      "Data security and compliance requirements",
      "Integrating AI with legacy enterprise systems",
      "Scaling AI across departments consistently",
    ],
  },
  {
    slug: "multilingual",
    scenarioKey: "localization",
    name: "Multilingual & Localization",
    tagline: "Translate and localize content with AI",
    metaTitle: "Best AI Tools for Localization & Translation",
    metaDescription:
      "Build AI localization workflows — translation, video dubbing, voice cloning, localized visuals, and automation for global content.",
    keywords: ["AI translation tools", "AI localization", "AI dubbing", "multilingual AI"],
    heroHeading: "Go global with AI-powered localization",
    heroSubheading:
      "Translation, video dubbing, voice cloning, and localized content generation — reach every market in their language.",
    audience: "Localization managers, global brands, content teams",
    painPoints: [
      "Translation costs scaling with every new market",
      "Dubbing video content is slow and expensive",
      "Maintaining brand voice across languages",
    ],
  },
  {
    slug: "ai-agents",
    scenarioKey: "ai-agents",
    name: "AI Agents",
    tagline: "Build autonomous multi-agent systems",
    metaTitle: "Best AI Tools for Building AI Agents",
    metaDescription:
      "Build autonomous AI agent systems — multi-agent orchestration, reasoning, web research, memory, and long-term knowledge tools.",
    keywords: ["AI agents tools", "multi-agent systems", "autonomous AI", "AI agent framework"],
    heroHeading: "Build AI agents that work autonomously",
    heroSubheading:
      "Multi-agent orchestration, reasoning engines, web research, persistent memory, and tool use — everything for building autonomous AI systems.",
    audience: "AI engineers, developers, automation specialists",
    painPoints: [
      "Coordinating multiple AI agents reliably",
      "Giving agents persistent memory and context",
      "Building agents that can use tools and search the web",
    ],
  },
];

/** Look up a use case by its URL slug */
export function getUseCaseBySlug(slug: string): UseCaseData | undefined {
  return USE_CASES.find((uc) => uc.slug === slug);
}

/** Get all slugs for static page generation */
export function getAllUseCaseSlugs(): string[] {
  return USE_CASES.map((uc) => uc.slug);
}
