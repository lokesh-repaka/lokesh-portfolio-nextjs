import type { Metadata } from "next";
import { Inter, Cinzel, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lokesh Repaka — Generative AI Engineer & Forward Deployed Architect",
  description:
    "Portfolio of Lokesh Repaka: Generative AI Engineer, Multi-Agent LangGraph Architect, Enterprise RAG & Deterministic AI Governance Specialist.",
  keywords: [
    "AI Engineer",
    "Forward Deployed Engineer",
    "LangGraph",
    "Multi-Agent Systems",
    "Enterprise RAG",
    "Lokesh Repaka",
    "AI Governance",
    "Python",
    "FastAPI",
  ],
  authors: [{ name: "Lokesh Repaka", url: "https://github.com/lokesh-repaka" }],
  openGraph: {
    title: "Lokesh Repaka — AI Engineer & Governance Architect",
    description:
      "Engineering Mission-Critical AI Systems, Multi-Agent Workflows, and Enterprise RAG Architectures.",
    url: "https://lokesh-repaka.github.io",
    siteName: "Lokesh Repaka Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-bg text-text-white selection:bg-gold/30 selection:text-gold-bright flex flex-col min-h-screen">
        <ToastProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
