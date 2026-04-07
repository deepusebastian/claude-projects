"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Sparkles, Zap, LayoutDashboard, LogOut, Menu, X, BookOpen } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-[34px] h-[34px] rounded-[9px] bg-gradient-to-br from-brand-500 to-blue-500 flex items-center justify-center text-white transition-transform group-hover:scale-105">
            <Sparkles size={18} />
          </div>
          <span className="text-[19px] font-bold text-gray-900 tracking-tight">
            AI Blueprint
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1.5">
          {/* Tools Directory — always visible */}
          <Link
            href="/tools"
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
              pathname === "/tools"
                ? "text-brand-500 bg-brand-50"
                : "text-gray-500 hover:text-brand-500 hover:bg-brand-50"
            }`}
          >
            <BookOpen size={16} /> AI Tools
          </Link>

          {!session ? (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-brand-500 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-br from-brand-500 to-blue-500 rounded-lg hover:opacity-90 transition-opacity shadow-sm"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/builder"
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  pathname === "/builder"
                    ? "text-brand-500 bg-brand-50"
                    : "text-gray-500 hover:text-brand-500 hover:bg-brand-50"
                }`}
              >
                <Zap size={16} /> Builder
              </Link>
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
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors ml-1"
              >
                <LogOut size={16} />
              </button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-500 hover:text-gray-700 rounded-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-2 shadow-lg">
          {/* Tools link — always visible on mobile */}
          <Link
            href="/tools"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-50"
          >
            <BookOpen size={16} /> AI Tools
          </Link>

          {!session ? (
            <>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-br from-brand-500 to-blue-500 rounded-lg text-center"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/builder"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <Zap size={16} /> Builder
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <LayoutDashboard size={16} /> Dashboard
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-red-500 rounded-lg hover:bg-red-50"
              >
                <LogOut size={16} /> Sign out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
