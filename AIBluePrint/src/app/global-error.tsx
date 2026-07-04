"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

// global-error replaces the root layout when it fires, so it must include
// its own <html> and <body> tags.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "Inter, system-ui, sans-serif",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "24px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <p style={{ fontSize: 36, margin: "0 0 16px" }}>⚠️</p>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#111",
              margin: "0 0 8px",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "#9ca3af",
              lineHeight: 1.6,
              margin: "0 0 24px",
            }}
          >
            A critical error occurred. Our team has been notified.
          </p>
          <button
            onClick={reset}
            style={{
              padding: "10px 20px",
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              background: "linear-gradient(135deg, #6c3cef, #3b82f6)",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          {error.digest && (
            <p
              style={{
                marginTop: 16,
                fontSize: 11,
                color: "#d1d5db",
                fontFamily: "monospace",
              }}
            >
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
