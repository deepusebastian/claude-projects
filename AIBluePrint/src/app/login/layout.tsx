import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
  description: "Sign in to your AI Blueprint account to access saved blueprints and Pro features.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
