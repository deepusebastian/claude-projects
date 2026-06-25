"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ArrowUpDown,
  RefreshCw,
  Unlock,
} from "lucide-react";
import {
  STATIC_MODELS,
  TIER_CONFIG,
  PROVIDERS,
  formatContext,
  formatPrice,
  type LLMModel,
  type QualityTier,
} from "@/data/llm-models";

type SortKey = "name" | "tier" | "contextWindow" | "inputPrice" | "outputPrice" | "releaseDate";
type SortDir = "asc" | "desc";

const TIER_ORDER: Record<QualityTier, number> = {
  Frontier: 0,
  Strong: 1,
  Good: 2,
  Efficient: 3,
};

export default function ModelsLeaderboard() {
  const [models, setModels] = useState<LLMModel[]>(STATIC_MODELS);
  const [source, setSource] = useState<string>("static");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [provider, setProvider] = useState("All");
  const [tierFilter, setTierFilter] = useState<QualityTier | "All">("All");
  const [sortKey, setSortKey] = useState<SortKey>("tier");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const fetchModels = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    try {
      const res = await fetch("/api/models");
      if (res.ok) {
        const data = await res.json();
        if (data.models?.length > 0) {
          setModels(data.models);
          setSource(data.source);
        }
      }
    } catch {
      // Keep static data
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir(key === "inputPrice" || key === "outputPrice" ? "asc" : "desc");
    }
  };

  const filtered = useMemo(() => {
    let result = models;
    if (provider !== "All") {
      result = result.filter((m) => m.provider === provider);
    }
    if (tierFilter !== "All") {
      result = result.filter((m) => m.tier === tierFilter);
    }

    result = [...result].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "tier":
          cmp = TIER_ORDER[a.tier] - TIER_ORDER[b.tier];
          break;
        case "contextWindow":
          cmp = a.contextWindow - b.contextWindow;
          break;
        case "inputPrice":
          cmp = a.inputPrice - b.inputPrice;
          break;
        case "outputPrice":
          cmp = a.outputPrice - b.outputPrice;
          break;
        case "releaseDate":
          cmp = a.releaseDate.localeCompare(b.releaseDate);
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [models, provider, tierFilter, sortKey, sortDir]);

  const SortHeader = ({ label, field, className = "" }: { label: string; field: SortKey; className?: string }) => (
    <button
      onClick={() => handleSort(field)}
      className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gray-400 hover:text-gray-600 transition-colors ${className}`}
    >
      {label}
      <ArrowUpDown
        size={11}
        className={sortKey === field ? "text-brand-500" : "text-gray-300"}
      />
    </button>
  );

  return (
    <div>
      {/* Filters bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        {/* Provider filter */}
        <div className="flex gap-2 flex-wrap flex-1">
          {PROVIDERS.map((p) => {
            const isActive = provider === p;
            const count = p === "All" ? models.length : models.filter((m) => m.provider === p).length;
            if (count === 0 && p !== "All") return null;
            return (
              <button
                key={p}
                onClick={() => setProvider(p)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100"
                }`}
              >
                {p}
                <span className={`ml-1 text-xs ${isActive ? "text-gray-400" : "text-gray-300"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tier + source info */}
        <div className="flex items-center gap-3">
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value as QualityTier | "All")}
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-200"
          >
            <option value="All">All tiers</option>
            <option value="Frontier">Frontier</option>
            <option value="Strong">Strong</option>
            <option value="Good">Good</option>
            <option value="Efficient">Efficient</option>
          </select>

          {source === "openrouter" && (
            <span className="text-[11px] text-gray-300 whitespace-nowrap">
              via OpenRouter
            </span>
          )}
          <button
            onClick={() => fetchModels(true)}
            className={`p-1.5 text-gray-300 hover:text-gray-500 rounded-md hover:bg-gray-50 transition-colors ${refreshing ? "animate-spin" : ""}`}
            title="Refresh data"
            disabled={refreshing}
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Tier legend */}
      <div className="flex gap-4 flex-wrap mb-6">
        {(Object.keys(TIER_CONFIG) as QualityTier[]).map((tier) => {
          const cfg = TIER_CONFIG[tier];
          return (
            <div key={tier} className="flex items-center gap-1.5">
              <span className={`inline-block w-2 h-2 rounded-full ${cfg.bg} border ${cfg.border}`} />
              <span className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
            </div>
          );
        })}
      </div>

      {/* Table */}
      {(
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 pr-4">
                  <SortHeader label="Model" field="name" />
                </th>
                <th className="text-left py-3 px-4">
                  <SortHeader label="Tier" field="tier" />
                </th>
                <th className="text-right py-3 px-4">
                  <SortHeader label="Context" field="contextWindow" className="justify-end" />
                </th>
                <th className="text-right py-3 px-4">
                  <SortHeader label="Input /1M" field="inputPrice" className="justify-end" />
                </th>
                <th className="text-right py-3 px-4">
                  <SortHeader label="Output /1M" field="outputPrice" className="justify-end" />
                </th>
                <th className="text-right py-3 pl-4">
                  <SortHeader label="Released" field="releaseDate" className="justify-end" />
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((model) => {
                const tierCfg = TIER_CONFIG[model.tier];
                return (
                  <tr
                    key={model.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
                  >
                    {/* Model name + provider */}
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                          style={{ backgroundColor: model.providerColor }}
                        >
                          {model.provider.slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900 truncate">
                              {model.name}
                            </span>
                            {model.openSource && (
                              <span title="Open Source">
                                <Unlock size={11} className="text-green-500 flex-shrink-0" />
                              </span>
                            )}
                            {model.modality.includes("vision") && (
                              <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-500 rounded font-medium flex-shrink-0">
                                Vision
                              </span>
                            )}
                            {model.modality.includes("audio") && (
                              <span className="text-[10px] px-1.5 py-0.5 bg-purple-50 text-purple-500 rounded font-medium flex-shrink-0">
                                Audio
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-400">
                            {model.provider}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Tier badge */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-md text-[11px] font-semibold border ${tierCfg.bg} ${tierCfg.color} ${tierCfg.border}`}
                      >
                        {model.tier}
                      </span>
                    </td>

                    {/* Context window */}
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-sm font-medium text-gray-700">
                        {formatContext(model.contextWindow)}
                      </span>
                    </td>

                    {/* Input price */}
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-sm text-gray-600">
                        {formatPrice(model.inputPrice)}
                      </span>
                    </td>

                    {/* Output price */}
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-sm text-gray-600">
                        {formatPrice(model.outputPrice)}
                      </span>
                    </td>

                    {/* Release date */}
                    <td className="py-3.5 pl-4 text-right">
                      <span className="text-sm text-gray-400">
                        {model.releaseDate}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400 text-sm">
              No models match your filters.
            </div>
          )}
        </div>
      )}

      {/* Footer note */}
      {(
        <p className="text-xs text-gray-300 mt-6 text-center">
          Prices are per 1M tokens in USD. Data sourced from {source === "openrouter" ? "OpenRouter API" : "manual research"}.
          Context window in tokens.
        </p>
      )}
    </div>
  );
}
