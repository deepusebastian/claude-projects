"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Sparkles,
  Zap,
  LayoutDashboard,
  LogOut,
  BookOpen,
  Newspaper,
  BarChart3,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Builder", icon: <Zap size={15} /> },
  { href: "/news", label: "News", icon: <Newspaper size={15} /> },
  { href: "/models", label: "Models", icon: <BarChart3 size={15} /> },
  { href: "/tools", label: "AI Tools", icon: <BookOpen size={15} /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
      {/* ── Row 1: Logo + Auth ── */}
      <div className="max-w-6xl mx-auto px-6 h-[60px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-[34px] h-[34px] rounded-[9px] bg-gradient-to-br from-brand-500 to-blue-500 flex items-center justify-center text-white transition-transform group-hover:scale-105 flex-shrink-0">
            <Sparkles size={18} />
          </div>
          <span className="hidden sm:inline text-[19px] font-bold text-gray-900 tracking-tight">
            AI Blueprint
          </span>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {!session ? (
            <>
              <Link
                href="/login"
                className="px-3 sm:px-4 py-2 text-sm font-semibold text-brand-500 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="px-3 sm:px-4 py-2 text-sm font-semibold text-white bg-gradient-to-br from-brand-500 to-blue-500 rounded-lg hover:opacity-90 transition-opacity shadow-sm whitespace-nowrap"
              >
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Sign up</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  pathname === "/dashboard"
                    ? "text-brand-500 bg-brand-50"
                    : "text-gray-500 hover:text-brand-500 hover:bg-brand-50"
                }`}
              >
                <LayoutDashboard size={16} /> Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <LogOut size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Row 2: Tab bar ── */}
      <div className="border-t border-gray-100 overflow-x-auto scrollbar-none">
        <div className="flex min-w-max px-4 sm:px-6 max-w-6xl mx-auto">
          {NAV_LINKS.map(({ href, label, icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-4 sm:px-5 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  active
                    ? "border-brand-500 text-brand-500"
                    : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200"
                }`}
              >
                {icon}
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
