import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "AI Blueprint — Turn your idea into an AI-powered reality",
  description:
    "Describe what you want to build. Get an instant, actionable blueprint of the exact AI tools and pipeline you need to make it happen.",
  keywords: [
    "AI tools",
    "AI pipeline",
    "AI blueprint",
    "startup tools",
    "AI stack",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
