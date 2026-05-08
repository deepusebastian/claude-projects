import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aiblueprint.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI Blueprint — AI Tools News & Pipeline Builder",
    template: "%s | AI Blueprint",
  },
  description:
    "Stay ahead of the AI revolution. Daily curated AI tool launches, updates, and news — plus an instant pipeline builder for your next idea.",
  keywords: [
    "AI tools",
    "AI news",
    "AI tool launches",
    "AI pipeline",
    "AI blueprint",
    "startup tools",
    "AI stack",
    "AI tool recommendations",
    "artificial intelligence tools",
    "AI updates",
    "new AI tools",
  ],
  authors: [{ name: "AI Blueprint" }],
  creator: "AI Blueprint",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "AI Blueprint",
    title: "AI Blueprint — AI Tools News & Pipeline Builder",
    description:
      "Stay ahead of the AI revolution. Daily curated AI tool launches, updates, and news — plus an instant pipeline builder for your next idea.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Blueprint — Know exactly which AI tools to build with",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Blueprint — Turn your idea into an AI-powered reality",
    description:
      "Describe what you want to build. Get an instant blueprint of the exact AI tools you need.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
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
