export interface PipelineStep {
  tool: string;
  role: string;
  detail: string;
  reason: string; // Why THIS tool specifically (the economic value)
}

export interface Pipeline {
  title: string;
  steps: PipelineStep[];
  summary: string;
}

// ─── 20 Specialized Pipeline Scenarios ───

export const PIPELINE_SCENARIOS: Record<string, Pipeline> = {

  // ── 1. E-commerce ──
  "e-commerce": {
    title: "AI-Powered E-Commerce Platform",
    steps: [
      { tool: "Claude", role: "Product Copywriter", detail: "Generate SEO-optimized product titles, descriptions, and bullet points from raw spec sheets", reason: "200K context lets you feed entire product catalogs at once for consistent brand voice" },
      { tool: "Adobe Firefly", role: "Product Image Generation", detail: "Create lifestyle product shots and marketing visuals from text descriptions", reason: "IP-safe for commercial use — no copyright risk on generated product images" },
      { tool: "Cohere Command R+", role: "Semantic Product Search", detail: "Power natural-language search across your catalog so shoppers find products by describing what they need", reason: "Purpose-built for retrieval — outperforms general LLMs on search relevance" },
      { tool: "Intercom Fin", role: "Customer Support Agent", detail: "Auto-resolve order status, returns, and FAQ queries by training on your help docs", reason: "Resolves 50%+ of tickets without human agents, cutting support costs" },
      { tool: "Zapier", role: "Order & Inventory Automation", detail: "Connect Shopify/WooCommerce to shipping, email, and accounting tools automatically", reason: "6,000+ app connectors means it integrates with whatever stack you already use" },
    ],
    summary: "A complete e-commerce AI stack: IP-safe product visuals, intelligent catalog search, automated support that actually resolves tickets, and no-code integrations with your existing tools.",
  },

  // ── 2. Content & Social Media ──
  "content-marketing": {
    title: "Content Creation & Distribution Engine",
    steps: [
      { tool: "Claude", role: "Long-Form Writer", detail: "Draft blog posts, newsletters, and whitepapers that match your brand tone and expertise level", reason: "Best at nuanced, long-form writing with consistent voice across 200K tokens" },
      { tool: "Surfer SEO", role: "SEO Optimization", detail: "Score and optimize every article against top-ranking competitors for target keywords", reason: "Data-driven content scoring tells you exactly what to add to rank higher" },
      { tool: "Midjourney", role: "Visual Content", detail: "Create branded hero images, social graphics, and thumbnails for every piece of content", reason: "Highest aesthetic quality — visuals that actually stop the scroll" },
      { tool: "ElevenLabs", role: "Audio Narration", detail: "Convert articles into podcast episodes and audio versions with your cloned brand voice", reason: "Most natural-sounding TTS — listeners can't tell it's AI-generated" },
      { tool: "Make", role: "Cross-Platform Publishing", detail: "Auto-publish to WordPress, Medium, LinkedIn, Twitter, and email with scheduling", reason: "Visual workflow builder handles complex branching (different formats per platform)" },
    ],
    summary: "Write SEO-optimized content, generate matching visuals, produce audio versions, and auto-distribute everywhere — all with consistent brand voice.",
  },

  // ── 3. YouTube / Video Content ──
  "youtube": {
    title: "YouTube Content Production Pipeline",
    steps: [
      { tool: "OpenAI GPT-4o", role: "Script & Outline Writer", detail: "Generate video scripts with hooks, segments, CTAs, and SEO-optimized titles/descriptions", reason: "Multimodal understanding lets you feed competitor videos for script analysis" },
      { tool: "HeyGen", role: "AI Avatar Videos", detail: "Create talking-head videos from scripts without recording — with lip-sync in 40+ languages", reason: "Best lip-sync quality for avatar videos, enabling multilingual content from one script" },
      { tool: "Runway", role: "B-Roll Generation", detail: "Generate cinematic B-roll clips and transitions from text descriptions to overlay on your videos", reason: "Most mature video generation with professional motion controls" },
      { tool: "Descript", role: "Video Editing", detail: "Edit the final video by editing the transcript — remove filler words, silence, and mistakes automatically", reason: "Text-based editing is 10x faster than traditional timeline editing" },
      { tool: "Ideogram", role: "Thumbnail Design", detail: "Generate click-worthy thumbnails with bold text overlays that render perfectly", reason: "Only AI tool that reliably renders text in images — critical for YouTube thumbnails" },
    ],
    summary: "A full YouTube production pipeline: AI scripts, avatar videos, generated B-roll, transcript-based editing, and thumbnails with perfect text rendering.",
  },

  // ── 4. SaaS Product ──
  "saas": {
    title: "AI-Enhanced SaaS Application Stack",
    steps: [
      { tool: "Vercel AI SDK", role: "Frontend AI Layer", detail: "Build streaming chat interfaces and AI-powered UI components with React Server Components", reason: "Edge-ready streaming UI gives users instant feedback, not loading spinners" },
      { tool: "OpenAI GPT-4o", role: "Core Intelligence", detail: "Power the primary AI features — analysis, generation, classification, and function calling", reason: "Best function-calling reliability for tool-use patterns in production apps" },
      { tool: "LlamaIndex", role: "Data Retrieval Layer", detail: "Ingest your product's data sources and build a RAG pipeline for accurate, grounded responses", reason: "Purpose-built for RAG — better data ingestion and retrieval than general frameworks" },
      { tool: "Qdrant", role: "Vector Search Engine", detail: "Store and query embeddings with advanced filtering on user permissions and metadata", reason: "Fastest vector queries with payload filtering — critical for multi-tenant SaaS" },
      { tool: "Modal", role: "GPU Infrastructure", detail: "Run custom ML models and heavy AI workloads with auto-scaling serverless GPUs", reason: "Python-native, no Docker — deploy custom models in minutes, scale to zero when idle" },
    ],
    summary: "A production SaaS AI stack: streaming UI, reliable function calling, purpose-built RAG, fast multi-tenant vector search, and serverless GPU scaling.",
  },

  // ── 5. Research & Analysis ──
  "research": {
    title: "AI Research & Intelligence Pipeline",
    steps: [
      { tool: "Tavily", role: "Web Research Agent", detail: "Gather information from across the web with clean, structured output ready for analysis", reason: "Returns LLM-ready content instead of raw HTML — saves massive preprocessing" },
      { tool: "Claude", role: "Deep Analyst", detail: "Synthesize findings across hundreds of sources, identify patterns, and flag contradictions", reason: "200K context lets you analyze entire research corpora in a single pass" },
      { tool: "AssemblyAI", role: "Interview Processing", detail: "Transcribe interviews with automatic speaker labels, topics, sentiment, and chapter breaks", reason: "Goes beyond transcription — extracts structured insights in one API call" },
      { tool: "Weaviate", role: "Research Knowledge Base", detail: "Store all findings in a hybrid search database combining semantic meaning and keyword matching", reason: "Hybrid search finds connections that pure vector or pure keyword search would miss" },
      { tool: "Gemini", role: "Fact Verification", detail: "Cross-reference claims against current web sources with built-in Google Search grounding", reason: "Native Search grounding means real-time fact-checking without building a search pipeline" },
    ],
    summary: "End-to-end research automation: web gathering, deep multi-source analysis, interview intelligence, a searchable knowledge base, and real-time fact verification.",
  },

  // ── 6. Podcast Production ──
  "podcast": {
    title: "AI Podcast Production Studio",
    steps: [
      { tool: "Claude", role: "Episode Planner", detail: "Generate episode outlines, interview questions, talking points, and show notes from topics", reason: "Long context handles full season planning with callbacks to previous episodes" },
      { tool: "Deepgram", role: "Live Transcription", detail: "Real-time transcription during recording for live show notes and highlight detection", reason: "300ms latency enables real-time transcription during live recording sessions" },
      { tool: "Descript", role: "Audio Editor", detail: "Edit episodes by editing text — remove ums, ahs, silences, and reorder segments effortlessly", reason: "Text-based audio editing is 10x faster than traditional waveform editing" },
      { tool: "ElevenLabs", role: "Intro/Outro & Ads", detail: "Generate consistent intro, outro, and ad-read audio with your show's branded voice", reason: "Clone your host's voice for consistent ad reads without re-recording" },
      { tool: "Whisper", role: "Episode Transcription", detail: "Generate accurate final transcripts for show notes, blog posts, and accessibility", reason: "Free and self-hostable — no per-minute transcription costs at scale" },
    ],
    summary: "Podcast production from planning to publishing: AI outlines, real-time transcription, text-based editing, branded voice generation, and free final transcripts.",
  },

  // ── 7. Film / Movie Production ──
  "film": {
    title: "AI Film & Video Production Pipeline",
    steps: [
      { tool: "Claude", role: "Screenwriter Assistant", detail: "Develop treatments, scene breakdowns, dialogue, and character development arcs", reason: "Best at maintaining character consistency and narrative voice across long scripts" },
      { tool: "Kling", role: "Scene Generation", detail: "Generate long-form video scenes up to 2 minutes with consistent characters and environments", reason: "Longest generation length (2 min) with the best motion consistency for narrative scenes" },
      { tool: "Luma Dream Machine", role: "VFX & Camera Moves", detail: "Create 3D-consistent camera moves, environmental shots, and physics-aware VFX sequences", reason: "Best 3D spatial consistency — camera moves feel physically grounded" },
      { tool: "Suno", role: "Original Score", detail: "Compose original background music and theme tracks tailored to each scene's mood", reason: "Full song generation with vocals — creates unique scores you actually own" },
      { tool: "ElevenLabs", role: "Voice Acting & ADR", detail: "Generate character voices, narration, and automated dialogue replacement for any language", reason: "Instant voice cloning lets you iterate on dialogue without re-recording actors" },
    ],
    summary: "AI-assisted filmmaking: script development, long-form scene generation, physics-aware VFX, original scores, and voice production — all without a traditional crew.",
  },

  // ── 8. Music Production ──
  "music": {
    title: "AI Music Production & Distribution",
    steps: [
      { tool: "Udio", role: "Music Composition", detail: "Generate full tracks with fine control over genre, mood, tempo, and instrumentation", reason: "Highest audio fidelity of any AI music tool with granular genre control" },
      { tool: "Suno", role: "Vocal Track Generation", detail: "Create songs with AI-generated vocals, harmonies, and lyrics in any style", reason: "Best vocal generation — produces singing that blends naturally with instrumentals" },
      { tool: "ElevenLabs", role: "Voice & Spoken Word", detail: "Add spoken word intros, voice samples, and narration with custom voice profiles", reason: "Most expressive TTS with emotion control for artistic vocal performances" },
      { tool: "Stable Diffusion", role: "Album Art & Visuals", detail: "Generate album covers, single artwork, and promotional visuals in any artistic style", reason: "Full style control with fine-tuning — train on your existing visual brand" },
      { tool: "n8n", role: "Distribution Automation", detail: "Auto-distribute to Spotify, Apple Music, SoundCloud and trigger social posts on release", reason: "Self-hostable automation — no per-task fees when releasing frequently" },
    ],
    summary: "Full music pipeline: AI composition, vocal generation, expressive voiceovers, custom album art, and automated multi-platform distribution.",
  },

  // ── 9. Education / Online Course ──
  "education": {
    title: "AI-Powered Online Course Builder",
    steps: [
      { tool: "Claude", role: "Curriculum Designer", detail: "Structure course modules, learning objectives, lesson plans, and assessment questions", reason: "Long context handles full curriculum planning with cross-module coherence" },
      { tool: "Synthesia", role: "Video Lectures", detail: "Create professional video lessons with AI avatars — no camera, studio, or editing needed", reason: "Enterprise-grade avatars with SCORM export for LMS integration" },
      { tool: "Canva AI", role: "Course Materials", detail: "Design slide decks, worksheets, infographics, and certificates with AI-assisted layout", reason: "Non-designers create professional learning materials in minutes with Magic Design" },
      { tool: "OpenAI GPT-4o", role: "Interactive Tutor", detail: "Build an AI tutor that answers student questions, provides hints, and adapts to learning pace", reason: "Best function calling for building interactive educational tools with guardrails" },
      { tool: "Notion AI", role: "Knowledge Base", detail: "Organize all course content, student resources, and FAQs in a searchable workspace", reason: "Students and instructors search across all docs for instant contextual answers" },
    ],
    summary: "Build complete online courses: AI curriculum design, avatar-presented lectures, professional materials, an adaptive AI tutor, and a searchable knowledge base.",
  },

  // ── 10. Customer Support / Help Desk ──
  "customer-support": {
    title: "AI-First Customer Support System",
    steps: [
      { tool: "Intercom Fin", role: "Frontline AI Agent", detail: "Resolve common questions, order lookups, and troubleshooting autonomously from your docs", reason: "50%+ autonomous resolution rate with cited sources — customers trust the answers" },
      { tool: "Deepgram", role: "Voice Call Transcription", detail: "Transcribe support calls in real-time for live agent assist and quality monitoring", reason: "300ms latency enables real-time transcription for live agent coaching" },
      { tool: "OpenAI GPT-4o", role: "Escalation Triage", detail: "Classify, prioritize, and route complex tickets with suggested responses for human agents", reason: "Best function calling for reliable ticket classification into your existing categories" },
      { tool: "LlamaIndex", role: "Knowledge Retrieval", detail: "Index your help docs, past tickets, and internal wikis for accurate answer retrieval", reason: "Purpose-built RAG pipeline pulls answers from messy enterprise knowledge bases" },
      { tool: "Make", role: "Workflow Orchestration", detail: "Connect AI support to CRM, ticketing, Slack alerts, and customer health scoring", reason: "Visual builder with advanced branching handles complex support escalation logic" },
    ],
    summary: "Automate 50%+ of support volume: AI-first resolution, real-time call transcription, intelligent triage, accurate knowledge retrieval, and full workflow integration.",
  },

  // ── 11. Legal / Compliance ──
  "legal": {
    title: "AI Legal Document & Compliance Pipeline",
    steps: [
      { tool: "Claude", role: "Contract Analyst", detail: "Review contracts, flag risky clauses, compare against templates, and suggest redlines", reason: "200K context handles 100+ page contracts in a single pass without chunking" },
      { tool: "LlamaIndex", role: "Legal Knowledge Base", detail: "Index your clause library, past contracts, and regulatory docs for instant retrieval", reason: "Best data ingestion handles PDFs, DOCx, and scanned documents seamlessly" },
      { tool: "Gemini", role: "Regulatory Monitoring", detail: "Track regulatory changes by grounding answers against current government sources", reason: "Native Search grounding catches regulatory updates in real-time" },
      { tool: "Qdrant", role: "Precedent Search", detail: "Find semantically similar clauses and past agreements with metadata filtering by jurisdiction", reason: "Payload filtering lets you search by jurisdiction, date, and contract type simultaneously" },
      { tool: "n8n", role: "Compliance Workflows", detail: "Automate review cycles, approval routing, deadline tracking, and audit trail generation", reason: "Self-hosted — keeps sensitive legal data on your own infrastructure" },
    ],
    summary: "AI-powered legal operations: full-contract analysis, instant precedent search, real-time regulatory tracking, and automated compliance workflows — all on your infrastructure.",
  },

  // ── 12. Healthcare / Medical ──
  "healthcare": {
    title: "AI Healthcare Data & Documentation Pipeline",
    steps: [
      { tool: "Whisper", role: "Clinical Transcription", detail: "Transcribe patient encounters and clinical dictation with medical terminology accuracy", reason: "Self-hostable for HIPAA compliance — medical data never leaves your servers" },
      { tool: "Claude", role: "Clinical Documentation", detail: "Generate structured clinical notes, SOAP notes, and discharge summaries from transcriptions", reason: "Best at following complex formatting rules with nuanced medical language" },
      { tool: "Llama 3", role: "On-Premises AI", detail: "Run all AI inference locally on your own hardware for complete data sovereignty", reason: "Fully open-source, self-hosted — zero patient data exposure to third-party APIs" },
      { tool: "Weaviate", role: "Medical Knowledge Base", detail: "Build a searchable database of clinical guidelines, drug interactions, and protocols", reason: "Hybrid search combines medical terminology matching with semantic understanding" },
      { tool: "Fivetran", role: "EHR Data Integration", detail: "Connect EHR systems, lab results, and scheduling into a unified data pipeline", reason: "400+ pre-built connectors with automated schema migration for healthcare systems" },
    ],
    summary: "HIPAA-ready healthcare AI: self-hosted transcription, structured clinical documentation, on-premises inference, searchable medical knowledge, and EHR integration.",
  },

  // ── 13. Real Estate ──
  "real-estate": {
    title: "AI Real Estate Marketing & Operations",
    steps: [
      { tool: "OpenAI GPT-4o", role: "Listing Generator", detail: "Write compelling MLS descriptions from property details, photos, and neighborhood data", reason: "Multimodal — feed it property photos to generate descriptions that match what buyers see" },
      { tool: "Midjourney", role: "Virtual Staging", detail: "Generate photorealistic staged interiors for empty properties across different design styles", reason: "Highest photorealism — staged rooms are indistinguishable from real photography" },
      { tool: "HeyGen", role: "Property Video Tours", detail: "Create AI-narrated walkthrough videos with an agent avatar presenting each property", reason: "Multilingual lip-sync opens listings to international buyers without re-recording" },
      { tool: "Jasper", role: "Marketing Campaigns", detail: "Generate email drips, social ads, and landing pages with consistent brand voice for each listing", reason: "Marketing-specific templates and brand voice training for real estate" },
      { tool: "Zapier", role: "Lead Pipeline Automation", detail: "Auto-route leads from Zillow, Realtor.com, and social ads into your CRM with follow-up sequences", reason: "Pre-built connectors for every major real estate platform and CRM" },
    ],
    summary: "AI-powered real estate: photo-aware listing copy, virtual staging, multilingual video tours, branded marketing campaigns, and automated lead management.",
  },

  // ── 14. Gaming / Game Dev ──
  "gaming": {
    title: "AI Game Development Pipeline",
    steps: [
      { tool: "Leonardo AI", role: "Game Asset Generation", detail: "Generate character sprites, environment textures, item icons, and concept art at scale", reason: "Specialized for game assets with style consistency and batch generation" },
      { tool: "Stable Diffusion", role: "Custom Art Pipeline", detail: "Fine-tune on your game's visual style to generate unlimited on-brand assets", reason: "Train LoRA models on your art style — every asset matches your game's aesthetic" },
      { tool: "OpenAI GPT-4o", role: "NPC Dialogue System", detail: "Power dynamic NPC conversations that respond to player choices and world state", reason: "Best function calling for game engine integration and state management" },
      { tool: "Suno", role: "Dynamic Soundtrack", detail: "Generate adaptive background music, battle themes, and ambient tracks for each biome", reason: "Full tracks with mood control — generate unique music for every game area" },
      { tool: "ElevenLabs", role: "Character Voice Acting", detail: "Give every NPC a unique voice without hiring voice actors for thousands of lines", reason: "Voice cloning creates consistent character voices across unlimited dialogue lines" },
    ],
    summary: "AI-powered game dev: consistent asset generation, custom-trained art styles, dynamic NPC dialogue, adaptive soundtracks, and scalable voice acting.",
  },

  // ── 15. Startup MVP ──
  "startup": {
    title: "AI-Accelerated Startup MVP Stack",
    steps: [
      { tool: "Cursor", role: "Rapid Prototyping", detail: "Build your full-stack MVP with an AI code editor that understands your entire codebase", reason: "Multi-file editing with repo context — build features in minutes, not days" },
      { tool: "Vercel AI SDK", role: "AI Feature Layer", detail: "Add streaming AI features to your app with React components purpose-built for AI UX", reason: "Ship AI features with proper streaming UX instead of loading spinners" },
      { tool: "Chroma", role: "Quick Vector Store", detail: "Add semantic search and RAG to your MVP with the simplest possible database setup", reason: "Runs in-process with zero infrastructure — perfect for MVP speed" },
      { tool: "OpenAI GPT-4o", role: "Core Intelligence", detail: "Power your product's AI capabilities with the most reliable API for function calling", reason: "Highest reliability for production function calling — your MVP needs to work" },
      { tool: "Replit", role: "Deploy & Iterate", detail: "Host your MVP with instant deployment — push code and it's live in seconds", reason: "Zero DevOps setup — focus on product, not infrastructure" },
    ],
    summary: "Ship your AI-powered MVP fast: AI-assisted coding, streaming UI, zero-ops vector search, reliable AI backbone, and instant deployment.",
  },

  // ── 16. Data Analytics / BI ──
  "data-analytics": {
    title: "AI-Powered Data Analytics Pipeline",
    steps: [
      { tool: "Fivetran", role: "Data Ingestion", detail: "Pull data from all your sources — Salesforce, Stripe, GA4, databases — into one warehouse", reason: "400+ connectors with zero-maintenance sync and automatic schema handling" },
      { tool: "Databricks", role: "Data Processing & ML", detail: "Transform, clean, and run ML models on your unified data lakehouse", reason: "End-to-end data + AI platform — no separate ML infrastructure needed" },
      { tool: "OpenAI GPT-4o", role: "Natural Language BI", detail: "Let anyone query data in plain English — 'Show me revenue by region this quarter'", reason: "Best at translating natural language to SQL with reliable structured output" },
      { tool: "Claude", role: "Insight Generation", detail: "Analyze trends, anomalies, and correlations across datasets and generate executive summaries", reason: "200K context ingests massive datasets for comprehensive pattern analysis" },
      { tool: "Zapier", role: "Alert & Report Automation", detail: "Auto-generate and distribute weekly reports, trigger Slack alerts on KPI thresholds", reason: "Connects to every reporting and communication tool your team uses" },
    ],
    summary: "End-to-end data intelligence: automated ingestion, unified processing, plain-English querying, AI-generated insights, and automated reporting.",
  },

  // ── 17. Agency / Freelancer ──
  "agency": {
    title: "AI-Powered Creative Agency Stack",
    steps: [
      { tool: "Jasper", role: "Campaign Copywriting", detail: "Generate ad copy, landing pages, and email campaigns with trained brand voices for each client", reason: "Brand voice profiles per client — switch voices instantly without rewriting briefs" },
      { tool: "Midjourney", role: "Creative Direction", detail: "Generate mood boards, ad concepts, and campaign visuals in seconds for client approval", reason: "Highest aesthetic quality — clients approve concepts faster with photorealistic visuals" },
      { tool: "Figma AI", role: "Design Production", detail: "Accelerate UI/UX design with AI-generated layouts, components, and design variations", reason: "AI assistance inside the tool designers already use — no workflow disruption" },
      { tool: "Copy.ai", role: "Sales Outreach", detail: "Automate personalized outreach sequences, proposal generation, and follow-up workflows", reason: "End-to-end GTM workflows — from prospecting to proposal to close" },
      { tool: "Make", role: "Client Delivery Automation", detail: "Automate deliverable handoffs, approval workflows, and cross-platform publishing for clients", reason: "Complex branching handles different delivery workflows per client" },
    ],
    summary: "Scale your agency: per-client brand voices, instant creative concepts, AI-assisted design, automated sales pipelines, and streamlined client delivery.",
  },

  // ── 18. Internal Tools / Enterprise ──
  "enterprise": {
    title: "Enterprise AI Integration Stack",
    steps: [
      { tool: "Glean", role: "Enterprise Knowledge Search", detail: "Search across Confluence, Slack, Drive, Jira, and 100+ tools with permission-aware AI", reason: "Respects existing access controls — employees only find what they're authorized to see" },
      { tool: "Semantic Kernel", role: "Application Integration", detail: "Embed AI capabilities into your existing .NET/Java enterprise applications", reason: "Best SDK for enterprise stacks — native Azure, C#, and Java support" },
      { tool: "Llama 3", role: "On-Premises LLM", detail: "Run AI inference on your own infrastructure with zero data leaving your network", reason: "Open-source, self-hosted — meets the strictest enterprise data sovereignty requirements" },
      { tool: "Weaviate", role: "Enterprise Vector Search", detail: "Build internal semantic search with role-based access control on every query", reason: "Open-source with hybrid search — deploy on-prem with enterprise access controls" },
      { tool: "AutoGen", role: "Multi-Agent Workflows", detail: "Build AI agent teams that handle complex multi-step business processes with human approval gates", reason: "Microsoft-backed with human-in-the-loop — enterprise-grade agent orchestration" },
    ],
    summary: "Enterprise AI that respects your constraints: permission-aware search, on-prem inference, existing-stack integration, secure vector search, and governed agent workflows.",
  },

  // ── 19. Multilingual / Localization ──
  "localization": {
    title: "AI Translation & Localization Pipeline",
    steps: [
      { tool: "Mistral Large", role: "Content Translation", detail: "Translate marketing copy, product content, and documentation while preserving tone and idiom", reason: "Best multilingual performance — handles nuance and cultural adaptation, not just word-for-word" },
      { tool: "HeyGen", role: "Video Localization", detail: "Dub your videos into 40+ languages with lip-synced avatar translation", reason: "Multilingual lip-sync makes it look like the speaker is naturally speaking each language" },
      { tool: "ElevenLabs", role: "Voice Localization", detail: "Clone your brand voice and generate natural-sounding speech in 30+ languages", reason: "Maintains your original voice characteristics across different languages" },
      { tool: "Ideogram", role: "Localized Visuals", detail: "Generate marketing images with text overlays in any language with perfect rendering", reason: "Only AI tool that reliably renders non-Latin scripts in generated images" },
      { tool: "n8n", role: "Localization Pipeline", detail: "Automate translation workflows — detect language, route to translators, publish to locale-specific channels", reason: "Self-hosted with custom code steps for complex locale-specific routing logic" },
    ],
    summary: "Go global: AI translation that preserves nuance, lip-synced video dubbing, multilingual voice cloning, perfect text rendering in any script, and automated localization workflows.",
  },

  // ── 20. AI Agents / Autonomous Systems ──
  "ai-agents": {
    title: "Autonomous AI Agent Architecture",
    steps: [
      { tool: "CrewAI", role: "Multi-Agent Orchestration", detail: "Design teams of specialized AI agents with defined roles, goals, and collaboration patterns", reason: "Simplest framework for building agent teams — define roles and let them collaborate" },
      { tool: "OpenAI GPT-4o", role: "Agent Brain", detail: "Power each agent's reasoning, planning, and tool-use capabilities", reason: "Most reliable function calling — agents need to use tools without errors" },
      { tool: "Tavily", role: "Web Research Tool", detail: "Give agents the ability to search the web and retrieve clean, structured information", reason: "Returns LLM-ready content — agents don't waste tokens parsing HTML" },
      { tool: "LangChain", role: "Memory & Tool Framework", detail: "Provide agents with persistent memory, conversation history, and custom tool integrations", reason: "700+ integrations gives agents access to virtually any external tool or API" },
      { tool: "Pinecone", role: "Long-Term Memory", detail: "Store agent experiences, learned patterns, and accumulated knowledge for future retrieval", reason: "Fully managed — agents can read/write memories without database maintenance" },
    ],
    summary: "Build autonomous AI teams: role-based agent design, reliable tool use, web research capability, persistent memory, and scalable knowledge storage.",
  },

  // ── Fallback ──
  "general": {
    title: "Custom AI Solution Pipeline",
    steps: [
      { tool: "Claude", role: "Problem Decomposition", detail: "Break down your challenge into components, identify requirements, and design the solution architecture", reason: "Best at structured reasoning and planning with nuanced problem understanding" },
      { tool: "OpenAI GPT-4o", role: "Multimodal Processing", detail: "Handle the core AI workload — text, images, audio, and structured data in a single model", reason: "Most versatile single model — processes any input type you throw at it" },
      { tool: "LangChain", role: "Application Framework", detail: "Wire everything together with chains, agents, memory, and 700+ tool integrations", reason: "Most mature orchestration ecosystem — whatever you need, there's an integration" },
      { tool: "Pinecone", role: "Knowledge Storage", detail: "Store and retrieve domain-specific knowledge for accurate, grounded AI responses", reason: "Zero-ops vector database — focus on your product, not infrastructure" },
      { tool: "Zapier", role: "Automation Layer", detail: "Connect your AI pipeline to thousands of existing tools and automate trigger-based workflows", reason: "6,000+ connectors bridge AI with whatever tools you already use" },
    ],
    summary: "A versatile AI foundation: structured problem-solving, multimodal processing, mature orchestration, managed knowledge storage, and universal tool connectivity.",
  },
};

// ─── Multi-Signal Weighted Classifier ───

interface SignalRule {
  keywords: RegExp;
  weight: number;
}

const SCENARIO_SIGNALS: Record<string, SignalRule[]> = {
  "e-commerce": [
    { keywords: /\b(shop|store|ecommerce|e-commerce|shopify|woocommerce)\b/, weight: 10 },
    { keywords: /\b(product|catalog|inventory|cart|checkout)\b/, weight: 7 },
    { keywords: /\b(sell|retail|merchant|wholesale|dropship)\b/, weight: 8 },
    { keywords: /\b(order|shipping|fulfillment|warehouse)\b/, weight: 5 },
    { keywords: /\b(customer.*review|recommendation|upsell)\b/, weight: 5 },
  ],
  "content-marketing": [
    { keywords: /\b(blog|article|newsletter|content.*market)\b/, weight: 10 },
    { keywords: /\b(seo|organic.*traffic|keyword|ranking)\b/, weight: 8 },
    { keywords: /\b(social.*media|instagram|twitter|linkedin|tiktok)\b/, weight: 7 },
    { keywords: /\b(copywriting|editorial|publish|medium)\b/, weight: 6 },
    { keywords: /\b(brand.*voice|content.*strategy|thought.*leader)\b/, weight: 6 },
  ],
  "youtube": [
    { keywords: /\b(youtube|youtuber|video.*content|vlog)\b/, weight: 10 },
    { keywords: /\b(thumbnail|subscriber|channel|upload)\b/, weight: 8 },
    { keywords: /\b(b-roll|footage|editing|premiere)\b/, weight: 6 },
    { keywords: /\b(script.*video|video.*script|shorts)\b/, weight: 7 },
  ],
  "saas": [
    { keywords: /\b(saas|software.*service|web.*app|platform)\b/, weight: 10 },
    { keywords: /\b(subscription|recurring|mrr|churn)\b/, weight: 7 },
    { keywords: /\b(api|sdk|developer|integration)\b/, weight: 5 },
    { keywords: /\b(multi.*tenant|dashboard|admin.*panel)\b/, weight: 6 },
    { keywords: /\b(feature|user.*experience|onboarding)\b/, weight: 3 },
  ],
  "research": [
    { keywords: /\b(research|study|academic|journal|paper)\b/, weight: 10 },
    { keywords: /\b(analy[sz]|insight|finding|hypothesis)\b/, weight: 7 },
    { keywords: /\b(survey|interview|qualitative|quantitative)\b/, weight: 8 },
    { keywords: /\b(literature.*review|meta.*analysis|systematic)\b/, weight: 9 },
    { keywords: /\b(data.*driven|evidence|methodology)\b/, weight: 5 },
  ],
  "podcast": [
    { keywords: /\b(podcast|episode|listener|audio.*show)\b/, weight: 10 },
    { keywords: /\b(interview|host|guest|recording)\b/, weight: 5 },
    { keywords: /\b(spotify|apple.*podcast|rss.*feed)\b/, weight: 8 },
    { keywords: /\b(show.*notes|transcript|audio.*edit)\b/, weight: 7 },
  ],
  "film": [
    { keywords: /\b(film|movie|cinema|short.*film|documentary)\b/, weight: 10 },
    { keywords: /\b(screenplay|script|scene|director)\b/, weight: 8 },
    { keywords: /\b(vfx|visual.*effect|post.*production|cgi)\b/, weight: 9 },
    { keywords: /\b(soundtrack|score|production|cinematograph)\b/, weight: 6 },
    { keywords: /\b(animation|animate|3d.*render)\b/, weight: 7 },
  ],
  "music": [
    { keywords: /\b(music|song|album|track|beat)\b/, weight: 10 },
    { keywords: /\b(compose|producer|mix|master|recording)\b/, weight: 8 },
    { keywords: /\b(spotify|soundcloud|distribute.*music)\b/, weight: 7 },
    { keywords: /\b(lyric|melody|chord|instrument|vocal)\b/, weight: 9 },
    { keywords: /\b(genre|hip.*hop|rock|electronic|pop)\b/, weight: 5 },
  ],
  "education": [
    { keywords: /\b(course|curriculum|lesson|teach|tutor)\b/, weight: 10 },
    { keywords: /\b(student|learn|education|training|e-learning)\b/, weight: 8 },
    { keywords: /\b(quiz|assessment|certification|module)\b/, weight: 7 },
    { keywords: /\b(lms|udemy|coursera|onboard)\b/, weight: 8 },
    { keywords: /\b(workshop|bootcamp|lecture|seminar)\b/, weight: 6 },
    { keywords: /\b(online.*course|course.*platform|class)\b/, weight: 10 },
  ],
  "customer-support": [
    { keywords: /\b(customer.*support|help.*desk|support.*ticket)\b/, weight: 10 },
    { keywords: /\b(chatbot|live.*chat|ticket|zendesk|intercom)\b/, weight: 8 },
    { keywords: /\b(faq|knowledge.*base|self.*service)\b/, weight: 7 },
    { keywords: /\b(resolution|escalat|sla|csat|nps)\b/, weight: 6 },
    { keywords: /\b(call.*center|contact.*center|agent.*assist)\b/, weight: 8 },
  ],
  "legal": [
    { keywords: /\b(legal|law|attorney|lawyer|contract)\b/, weight: 10 },
    { keywords: /\b(compliance|regulat|gdpr|hipaa|sox)\b/, weight: 9 },
    { keywords: /\b(clause|agreement|nda|terms|liability)\b/, weight: 8 },
    { keywords: /\b(litigation|patent|trademark|intellectual.*property)\b/, weight: 7 },
    { keywords: /\b(review.*contract|due.*diligence|audit)\b/, weight: 7 },
  ],
  "healthcare": [
    { keywords: /\b(health|medical|clinical|patient|doctor)\b/, weight: 10 },
    { keywords: /\b(diagnos|symptom|treatment|prescription)\b/, weight: 9 },
    { keywords: /\b(ehr|emr|hipaa|telehealth|telemedicine)\b/, weight: 9 },
    { keywords: /\b(hospital|clinic|pharma|biotech)\b/, weight: 7 },
    { keywords: /\b(medical.*record|lab.*result|radiology)\b/, weight: 8 },
    { keywords: /\b(healthcare|health.*care|nursing|therapist)\b/, weight: 10 },
  ],
  "real-estate": [
    { keywords: /\b(real.*estate|property|listing|mls|realtor)\b/, weight: 10 },
    { keywords: /\b(home|house|apartment|condo|rental)\b/, weight: 6 },
    { keywords: /\b(staging|open.*house|mortgage|broker)\b/, weight: 8 },
    { keywords: /\b(zillow|redfin|showing|walkthrough)\b/, weight: 8 },
    { keywords: /\b(real.*estate.*listing|property.*listing)\b/, weight: 12 },
  ],
  "gaming": [
    { keywords: /\b(game|gaming|game.*dev|indie.*game)\b/, weight: 10 },
    { keywords: /\b(npc|character|sprite|texture|asset)\b/, weight: 9 },
    { keywords: /\b(unity|unreal|godot|rpg|mmorpg)\b/, weight: 8 },
    { keywords: /\b(level.*design|quest|dialogue.*system)\b/, weight: 8 },
    { keywords: /\b(steam|itch\.io|console|mobile.*game)\b/, weight: 6 },
  ],
  "startup": [
    { keywords: /\b(startup|mvp|prototype|launch.*fast)\b/, weight: 10 },
    { keywords: /\b(founder|co-founder|seed|pre-seed|venture)\b/, weight: 8 },
    { keywords: /\b(pivot|iterate|validate|product.*market)\b/, weight: 7 },
    { keywords: /\b(ship.*fast|build.*quick|rapid|lean)\b/, weight: 7 },
    { keywords: /\b(pitch.*deck|investor|accelerator|yc)\b/, weight: 5 },
  ],
  "data-analytics": [
    { keywords: /\b(analytics|dashboard|bi|business.*intelligence)\b/, weight: 10 },
    { keywords: /\b(data.*warehouse|etl|pipeline|sql)\b/, weight: 9 },
    { keywords: /\b(metric|kpi|report|visualization)\b/, weight: 7 },
    { keywords: /\b(snowflake|bigquery|redshift|tableau|looker)\b/, weight: 8 },
    { keywords: /\b(data.*science|ml.*model|predict)\b/, weight: 6 },
  ],
  "agency": [
    { keywords: /\b(agency|freelanc|client|deliverable)\b/, weight: 10 },
    { keywords: /\b(creative.*agency|design.*agency|marketing.*agency)\b/, weight: 10 },
    { keywords: /\b(retainer|proposal|pitch|portfolio)\b/, weight: 7 },
    { keywords: /\b(white.*label|outsource|subcontract)\b/, weight: 6 },
    { keywords: /\b(campaign|brief|brand.*guideline)\b/, weight: 5 },
  ],
  "enterprise": [
    { keywords: /\b(enterprise|corporate|internal.*tool|intranet)\b/, weight: 10 },
    { keywords: /\b(compliance|governance|security|sso)\b/, weight: 7 },
    { keywords: /\b(on-prem|self.*host|data.*sovereign|air.*gap)\b/, weight: 9 },
    { keywords: /\b(fortune.*500|large.*org|department|division)\b/, weight: 6 },
    { keywords: /\b(sharepoint|confluence|jira|servicenow)\b/, weight: 7 },
  ],
  "localization": [
    { keywords: /\b(translat|localiz|multilingual|internationa)\b/, weight: 10 },
    { keywords: /\b(language|spanish|french|german|chinese|japanese|korean)\b/, weight: 7 },
    { keywords: /\b(dub|subtitle|caption|voice.*over)\b/, weight: 7 },
    { keywords: /\b(global.*market|internation|region|locale)\b/, weight: 6 },
    { keywords: /\b(l10n|i18n|gettext|crowdin)\b/, weight: 9 },
    { keywords: /\b(\d+\s*language|\blanguages\b)\b/, weight: 8 },
  ],
  "ai-agents": [
    { keywords: /\b(ai.*agent|autonomous|multi.*agent|agentic)\b/, weight: 10 },
    { keywords: /\b(crew|swarm|orchestrat.*agent|agent.*team)\b/, weight: 9 },
    { keywords: /\b(tool.*use|function.*call|reason.*act)\b/, weight: 7 },
    { keywords: /\b(automate.*task|autonomous.*system|self.*direct)\b/, weight: 6 },
    { keywords: /\b(autogpt|babyagi|crewai|autogen)\b/, weight: 9 },
  ],
};

export function classifyInput(text: string): string {
  const t = text.toLowerCase();

  const scores: Record<string, number> = {};

  for (const [scenario, signals] of Object.entries(SCENARIO_SIGNALS)) {
    let score = 0;
    for (const signal of signals) {
      const matches = t.match(signal.keywords);
      if (matches) {
        score += signal.weight * matches.length;
      }
    }
    if (score > 0) {
      scores[scenario] = score;
    }
  }

  // Find the highest-scoring scenario
  let bestScenario = "general";
  let bestScore = 0;

  for (const [scenario, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestScenario = scenario;
    }
  }

  return bestScenario;
}

export const SUGGESTION_CHIPS = [
  "I want to launch an online store with AI-powered recommendations",
  "Help me start a YouTube channel with AI-generated content",
  "I'm building a SaaS app that needs intelligent features",
  "I need to produce a short film using AI tools",
  "Help me create an online course platform",
  "I want to build autonomous AI agents for my business",
];
