import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lokesh Repaka | AI Engineer",
  description:
    "Production AI Engineer and Governance Architect. Specializing in LangGraph multi-agent supervisors, enterprise RAG, Keycloak IAM, and SPIFFE/SPIRE zero-trust workload identity.",
  keywords: [
    "AI Engineer",
    "Lokesh Repaka",
    "AI Governance",
    "LangGraph",
    "Multi-Agent Systems",
    "Keycloak",
    "SPIFFE",
    "SPIRE",
    "RAG",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
