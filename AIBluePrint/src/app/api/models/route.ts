import { NextResponse } from "next/server";
import { STATIC_MODELS, type LLMModel, type QualityTier } from "@/data/llm-models";

export const dynamic = "force-dynamic";

// Known model IDs we care about (maps OpenRouter ID patterns to our display names)
const KNOWN_PROVIDERS: Record<string, { name: string; color: string }> = {
  openai: { name: "OpenAI", color: "#10a37f" },
  anthropic: { name: "Anthropic", color: "#d97706" },
  google: { name: "Google", color: "#4285f4" },
  meta: { name: "Meta", color: "#0668E1" },
  "meta-llama": { name: "Meta", color: "#0668E1" },
  mistralai: { name: "Mistral", color: "#ff7000" },
  mistral: { name: "Mistral", color: "#ff7000" },
  deepseek: { name: "DeepSeek", color: "#4D6BFE" },
  cohere: { name: "Cohere", color: "#39594D" },
  "x-ai": { name: "xAI", color: "#000000" },
  xai: { name: "xAI", color: "#000000" },
};

function classifyTier(pricing: { input: number; output: number }, contextWindow: number): QualityTier {
  const avgPrice = (pricing.input + pricing.output) / 2;
  if (avgPrice >= 5) return "Frontier";
  if (avgPrice >= 1) return "Strong";
  if (avgPrice >= 0.2) return "Good";
  return "Efficient";
}

interface OpenRouterModel {
  id: string;
  name: string;
  context_length: number;
  pricing: { prompt: string; completion: string };
  created: number;
  architecture?: { modality?: string; input_modalities?: string[]; output_modalities?: string[] };
  description?: string;
}

function parseOpenRouterModels(data: { data: OpenRouterModel[] }): LLMModel[] {
  const models: LLMModel[] = [];

  for (const m of data.data) {
    // Extract provider from ID (e.g., "openai/gpt-4o" → "openai")
    const providerKey = m.id.split("/")[0];
    const providerInfo = KNOWN_PROVIDERS[providerKey];
    if (!providerInfo) continue; // Skip providers we don't track

    // Skip free, deprecated, or variant models
    const inputPrice = parseFloat(m.pricing?.prompt || "0") * 1_000_000;
    const outputPrice = parseFloat(m.pricing?.completion || "0") * 1_000_000;
    if (inputPrice === 0 && outputPrice === 0) continue;

    // Skip extended/nitro/free variants
    if (m.id.includes(":free") || m.id.includes(":nitro") || m.id.includes(":extended")) continue;

    // Determine modality
    const modality: string[] = ["text"];
    const inputMods = m.architecture?.input_modalities || [];
    if (inputMods.includes("image") || m.name.toLowerCase().includes("vision")) modality.push("vision");
    if (inputMods.includes("audio")) modality.push("audio");

    const releaseDate = m.created
      ? new Date(m.created * 1000).toISOString().slice(0, 7)
      : "2024-01";

    models.push({
      id: m.id,
      name: m.name,
      provider: providerInfo.name,
      providerColor: providerInfo.color,
      tier: classifyTier({ input: inputPrice, output: outputPrice }, m.context_length),
      contextWindow: m.context_length || 0,
      inputPrice,
      outputPrice,
      releaseDate,
      modality,
      openSource: providerKey === "meta" || providerKey === "meta-llama" || providerKey === "deepseek",
      description: m.description?.slice(0, 100) || "",
    });
  }

  // De-duplicate: keep the first (usually latest) version of each base model
  const seen = new Set<string>();
  return models.filter((m) => {
    // Create a simplified key: provider + base model name (remove version suffixes)
    const key = `${m.provider}:${m.name.toLowerCase().replace(/[-\s]+(preview|latest|beta|exp).*$/, "")}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function GET() {
  try {
    // Try OpenRouter's free models endpoint
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    const res = await fetch("https://openrouter.ai/api/v1/models", {
      signal: controller.signal,
      headers: { "User-Agent": "AIBlueprint/1.0" },
      cache: "no-store",
    });
    clearTimeout(timer);

    if (res.ok) {
      const data = await res.json();
      const models = parseOpenRouterModels(data);
      console.log(`[MODELS API] OpenRouter: ${models.length} models parsed`);

      if (models.length > 0) {
        return NextResponse.json({
          models,
          source: "openrouter",
          fetchedAt: new Date().toISOString(),
        });
      }
    }
  } catch (err) {
    console.warn("[MODELS API] OpenRouter failed:", (err as Error).message);
  }

  // Fallback to static data
  console.log("[MODELS API] Using static fallback data");
  return NextResponse.json({
    models: STATIC_MODELS,
    source: "static",
    fetchedAt: new Date().toISOString(),
  });
}
