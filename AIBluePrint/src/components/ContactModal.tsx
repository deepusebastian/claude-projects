"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Mail, CheckCircle, Lock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

interface Props {
  onClose: () => void;
}

const TIMELINE_OPTIONS = [
  "ASAP (< 2 weeks)",
  "1–2 months",
  "3–6 months",
  "6+ months",
  "Just exploring",
];

const BUDGET_OPTIONS = [
  "< $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

export default function ContactModal({ onClose }: Props) {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated" && !!session;
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const initialPathname = useRef(pathname);

  useEffect(() => { setMounted(true); }, []);

  // Close only when the route actually changes away from the page it was opened on
  useEffect(() => {
    if (pathname !== initialPathname.current) {
      onClose();
    }
  }, [pathname]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    timeline: "",
    budget: "",
    message: "",
    additionalInfo: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and email are required.");
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, _honeypot: "" }),
      });

      if (res.status === 401) {
        setError("You must be logged in to send a message.");
        return;
      }
      if (res.status === 429) {
        setError("Too many requests. Please try again in a few minutes.");
        return;
      }
      if (!res.ok) throw new Error("Request failed");

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-brand-500 to-blue-500 px-7 py-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-2.5 mb-1">
            <Mail size={18} className="text-white" />
            <h2 className="text-white font-bold text-lg">Contact Us</h2>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            Have a question or project in mind? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Body */}
        <div className="px-7 py-6 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <CheckCircle size={48} className="text-green-500" />
              <div>
                <p className="font-bold text-gray-900 text-lg mb-1">
                  Message sent!
                </p>
                <p className="text-sm text-gray-500">
                  Thanks for reaching out. We&apos;ll get back to you within 1
                  business day.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 rounded-xl bg-gradient-to-br from-brand-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </div>
          ) : !isLoggedIn ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center">
                <Lock size={22} className="text-brand-500" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base mb-1.5">
                  Sign in to send a message
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  A free account is required. It only takes a moment.
                </p>
              </div>
              <div className="flex gap-2.5 w-full max-w-xs">
                <Link
                  href="/signup"
                  onClick={onClose}
                  className="flex-1 text-center px-4 py-2.5 rounded-xl bg-gradient-to-br from-brand-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
                >
                  Create account
                </Link>
                <Link
                  href="/login"
                  onClick={onClose}
                  className="flex-1 text-center px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:border-gray-300 transition-colors"
                >
                  Log in
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Honeypot */}
              <input
                name="_honeypot"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: "none" }}
                aria-hidden="true"
              />

              {/* Name + Email */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-gray-300"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Phone Number
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-gray-300"
                />
              </div>

              {/* Timeline + Budget */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Timeline
                  </label>
                  <select
                    name="timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all bg-white"
                  >
                    <option value="">Select...</option>
                    {TIMELINE_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Approx. Budget
                  </label>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all bg-white"
                  >
                    <option value="">Select...</option>
                    {BUDGET_OPTIONS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="What's on your mind?"
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all resize-none placeholder:text-gray-300"
                />
              </div>

              {/* Additional Info */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  value={form.additionalInfo}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Anything else we should know?"
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all resize-none placeholder:text-gray-300"
                />
              </div>

              {error && (
                <p className="text-xs text-red-500 font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 w-full py-3 rounded-xl bg-gradient-to-br from-brand-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 shadow-sm"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>

              <p className="text-center text-xs text-gray-400">
                We typically respond within 1 business day.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
