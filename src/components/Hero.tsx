"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Download, Github, Linkedin, Mail, ShieldCheck, Terminal, Cpu } from "lucide-react";
import { portfolioTexts } from "@/data/portfolio";
import { useToast } from "@/components/Toast";

export const Hero: React.FC = () => {
  const { showToast } = useToast();

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioTexts.emailUrl);
    showToast("Email address copied to clipboard!", "success");
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold-border/40 text-gold-bright text-xs font-mono font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-gold-bright animate-ping"></span>
              <span>{portfolioTexts.heroBadge}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-serif text-slate-300 tracking-wide">
                {portfolioTexts.heroGreeting}
              </h2>
              <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-white uppercase">
                {portfolioTexts.heroName}
              </h1>
              <p className="text-lg sm:text-2xl font-sans font-semibold bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
                {portfolioTexts.heroRole}
              </p>
            </div>

            {/* Bio Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-sans">
              Engineering mission-critical AI systems, high-throughput enterprise RAG architectures, and autonomous multi-agent pipelines. Combining autonomous <span className="text-gold-bright font-semibold">LangGraph agents</span> with deterministic zero-trust security guardrails (<span className="text-gold-bright font-semibold">Keycloak, SPIFFE/SPIRE, OPA</span>) for enterprise production environments.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href="/projects"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-gradient text-bg font-mono font-bold text-sm uppercase tracking-wider shadow-gold hover:opacity-95 hover:shadow-gold-lg transition-all"
              >
                <span>Explore Architecture</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blogs"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-card border border-gold-border/40 text-white font-mono text-sm tracking-wider hover:bg-gold/10 hover:border-gold-bright transition-all"
              >
                <BookOpen className="w-4 h-4 text-gold-bright" />
                <span>Read Articles</span>
              </Link>
              <Link
                href="/resume"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-surface border border-white/10 text-muted font-mono text-sm tracking-wider hover:text-white hover:border-white/30 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </Link>
            </div>

            {/* Social Links & Quick Contact */}
            <div className="pt-4 flex items-center gap-4 text-muted text-sm">
              <span className="font-mono text-xs uppercase tracking-wider text-dim">Connect:</span>
              <div className="flex items-center gap-2.5">
                <a
                  href={portfolioTexts.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-card border border-white/5 hover:border-gold/40 hover:text-gold-bright transition-all"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={portfolioTexts.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-card border border-white/5 hover:border-gold/40 hover:text-gold-bright transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-card border border-white/5 hover:border-gold/40 hover:text-gold-bright transition-all"
                  aria-label="Copy Email"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Profile Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500/30 to-yellow-600/20 rounded-3xl blur-xl opacity-75"></div>
              
              <div className="relative rounded-2xl bg-card border border-gold-border/40 p-7 shadow-2xl backdrop-blur-xl">
                {/* Header of Card */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center font-serif font-black text-bg text-xl shadow-gold">
                      LR
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-white text-lg tracking-wide">
                        {portfolioTexts.cardName}
                      </h3>
                      <p className="text-xs text-gold font-mono font-medium">
                        {portfolioTexts.cardSub}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[11px] text-emerald-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>ONLINE</span>
                  </div>
                </div>

                {/* Tech Highlights Inside Card */}
                <div className="py-5 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface/70 border border-white/5">
                    <span className="text-muted flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-gold-bright" />
                      Specialization
                    </span>
                    <span className="text-slate-200 font-medium">Multi-Agent & RAG</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface/70 border border-white/5">
                    <span className="text-muted flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Governance
                    </span>
                    <span className="text-slate-200 font-medium">Zero-Trust & IAM</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface/70 border border-white/5">
                    <span className="text-muted flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-sky-400" />
                      Core Stack
                    </span>
                    <span className="text-slate-200 font-medium">Python, FastAPI, LangGraph</span>
                  </div>
                </div>

                {/* Live Availability Pill */}
                <div className="pt-2">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between text-xs">
                    <span className="text-amber-200/90 font-medium font-sans">
                      Open to Global Remote Opportunities & Advisory
                    </span>
                    <span className="text-gold-bright font-bold">✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
