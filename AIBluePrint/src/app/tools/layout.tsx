import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools Directory",
  description:
    "Browse 65+ AI tools across 24 categories. Compare LLMs, image generators, voice AI, code assistants, automation platforms, and more.",
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
