"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import {
  Sparkles,
  LayoutDashboard,
  Clock,
  ArrowRight,
  CreditCard,
  Plus,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import Button from "@/components/Button";

interface Blueprint {
  id: string;
  title: string;
  prompt: string;
  scenario: string;
  pipeline: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function countTools(pipelineJson: string): number {
  try {
    const parsed = JSON.parse(pipelineJson);
    return Array.isArray(parsed?.steps) ? parsed.steps.length : 0;
  } catch {
    return 0;
  }
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlueprints = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/blueprints");
      if (!res.ok) {
        throw new Error(`Failed to load blueprints (${res.status})`);
      }
      const data = await res.json();
      setBlueprints(data.blueprints ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === "authenticated") {
      fetchBlueprints();
    }
  }, [status, router, fetchBlueprints]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[60px]">
        <div className="text-gray-400 text-sm animate-pulse">Loading…</div>
      </div>
    );
  }

  if (!session) return null;

  // ── Derived stats ──
  const totalTools = blueprints.reduce((sum, bp) => sum + countTools(bp.pipeline), 0);
  const freeUsed = blueprints.length >= 1;

  const stats = [
    {
      label: "Blueprints Created",
      value: String(blueprints.length),
      sub: freeUsed ? "Free blueprint used" : "1 free blueprint available",
      subColor: freeUsed ? "text-amber-500" : "text-green-600",
    },
    {
      label: "Tools Recommended",
      value: String(totalTools),
      sub: "across all blueprints",
      subColor: "text-brand-500",
    },
    {
      label: "Current Plan",
      value: "Starter",
      sub: "Upgrade for unlimited",
      subColor: "text-brand-500",
    },
  ];

  return (
    <div className="min-h-screen pt-[96px] pb-16 px-6 max-w-[960px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-9">
        <div>
          <h1 className="text-[26px] font-bold text-gray-900 mb-1">Your Dashboard</h1>
          <p className="text-sm text-gray-400">
            Welcome back, {session.user?.name?.split(" ")[0] ?? "there"}
          </p>
        </div>
        <Button onClick={() => router.push("/builder")}>
          <Sparkles size={16} /> New Blueprint
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-9">
        {stats.map((s, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-[14px] p-[22px] shadow-sm">
            <p className="text-xs text-gray-400 mb-1.5">{s.label}</p>
            <p className="text-[26px] font-bold text-gray-900 mb-0.5">{s.value}</p>
            <p className={`text-xs font-medium ${s.subColor}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Blueprint list */}
      <div className="mb-9">
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-[17px] font-semibold text-gray-900">Saved Blueprints</h2>
          {!loading && blueprints.length > 0 && (
            <button
              onClick={fetchBlueprints}
              className="text-xs text-gray-400 hover:text-brand-500 flex items-center gap-1 transition-colors"
            >
              <RefreshCw size={12} /> Refresh
            </button>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col gap-2.5">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[72px] rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="flex items-center gap-3 p-4 rounded-xl border border-red-100 bg-red-50 text-red-600 text-sm">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>{error}</span>
            <button onClick={fetchBlueprints} className="ml-auto underline text-xs hover:no-underline">
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && blueprints.length === 0 && (
          <div className="flex flex-col items-center justify-center py-14 px-6 rounded-2xl border border-dashed border-gray-200 text-center bg-gray-50">
            <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 mb-4">
              <LayoutDashboard size={22} />
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-1">No blueprints yet</p>
            <p className="text-xs text-gray-400 mb-5 max-w-xs">
              Describe your idea in the builder and generate your first AI pipeline blueprint — it&apos;s free.
            </p>
            <button
              onClick={() => router.push("/builder")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors"
            >
              <Plus size={14} /> Create your first blueprint
            </button>
          </div>
        )}

        {/* Blueprint rows */}
        {!loading && !error && blueprints.length > 0 && (
          <div className="flex flex-col gap-2.5">
            {blueprints.map((bp) => (
              <div
                key={bp.id}
                onClick={() => router.push("/builder")}
                className="flex items-center justify-between px-5 py-3.5 rounded-xl bg-white border border-gray-200 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-[10px] bg-brand-50 flex items-center justify-center text-brand-500 flex-shrink-0">
                    <LayoutDashboard size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{bp.title}</p>
                    <div className="flex items-center gap-2.5 mt-0.5 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {formatDate(bp.createdAt)}
                      </span>
                      <span>{countTools(bp.pipeline)} tools</span>
                      <span className="capitalize hidden sm:inline text-gray-300">
                        {bp.scenario.replace(/-/g, " ")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 flex-shrink-0 ml-3">
                  <span
                    className={`px-2.5 py-[3px] rounded-full text-[11px] font-semibold border ${
                      bp.status === "completed"
                        ? "bg-green-50 text-green-600 border-green-200"
                        : "bg-amber-50 text-amber-600 border-amber-200"
                    }`}
                  >
                    {bp.status === "completed" ? "Completed" : "Draft"}
                  </span>
                  <ArrowRight size={16} className="text-gray-300" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Account Settings */}
      <div className="bg-white border border-gray-200 rounded-[14px] p-6 shadow-sm">
        <h2 className="text-[17px] font-semibold text-gray-900 mb-5">Account Settings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs text-gray-400 font-medium mb-1.5">Name</label>
            <div className="px-3.5 py-2.5 rounded-lg text-sm bg-gray-50 border border-gray-100 text-gray-600">
              {session.user?.name || "—"}
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 font-medium mb-1.5">Email</label>
            <div className="px-3.5 py-2.5 rounded-lg text-sm bg-gray-50 border border-gray-100 text-gray-500">
              {session.user?.email || "—"}
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 font-medium mb-1.5">Plan</label>
            <div className="px-3.5 py-2.5 rounded-lg text-sm bg-gray-50 border border-gray-100 text-gray-500 flex justify-between items-center">
              <span>Starter (Free)</span>
              <button
                onClick={() => router.push("/builder")}
                className="text-brand-500 text-xs font-semibold hover:text-brand-600 transition-colors"
              >
                Upgrade to Pro
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 font-medium mb-1.5">Payment Method</label>
            <div className="px-3.5 py-2.5 rounded-lg text-sm bg-gray-50 border border-gray-100 text-gray-500 flex justify-between items-center">
              <span className="flex items-center gap-2">
                <CreditCard size={16} /> No payment method on file
              </span>
              <button className="text-brand-500 text-xs font-semibold hover:text-brand-600 transition-colors">
                Add card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
