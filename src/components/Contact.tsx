"use client";

import React, { useState } from "react";
import { portfolioTexts } from "@/data/portfolio";
import { useToast } from "@/components/Toast";
import { Mail, Copy, Check, Send, Linkedin, Github, MapPin } from "lucide-react";

export const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioTexts.emailUrl);
    setCopied(true);
    showToast("Email address copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 border-t border-gold-border/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-gold font-mono text-xs uppercase tracking-widest font-semibold mb-2">
            <span>// 06</span>
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Initiate Conversation
          </h2>
        </div>

        {/* Contact Container */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-card border border-gold-border/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative Background Radial */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-8">
            <div>
              <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-sans">
                {portfolioTexts.contactLead}
              </p>
            </div>

            {/* Email Box */}
            <div className="p-6 rounded-2xl bg-surface/80 border border-gold-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center text-gold-bright shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-muted">Direct Email</span>
                  <p className="text-lg font-mono font-semibold text-white">{portfolioTexts.emailUrl}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={copyEmail}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-white/10 hover:border-gold-border/40 text-slate-200 text-xs font-mono font-medium tracking-wider transition-all"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Copied!" : "Copy Email"}</span>
                </button>
                <a
                  href={`mailto:${portfolioTexts.emailUrl}?subject=Connecting%20via%20Portfolio`}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gold-gradient text-bg text-xs font-mono font-bold tracking-wider shadow-gold hover:opacity-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Mail</span>
                </a>
              </div>
            </div>

            {/* Matrix of Connect Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 font-mono text-xs">
              <a
                href={portfolioTexts.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-surface/40 border border-white/5 hover:border-gold-border/40 hover:bg-gold/5 flex items-center gap-3 text-slate-300 transition-all"
              >
                <Linkedin className="w-5 h-5 text-gold-bright shrink-0" />
                <div>
                  <span className="text-[10px] uppercase text-dim block">Professional</span>
                  <span className="font-semibold text-white">LinkedIn Profile</span>
                </div>
              </a>

              <a
                href={portfolioTexts.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-surface/40 border border-white/5 hover:border-gold-border/40 hover:bg-gold/5 flex items-center gap-3 text-slate-300 transition-all"
              >
                <Github className="w-5 h-5 text-gold-bright shrink-0" />
                <div>
                  <span className="text-[10px] uppercase text-dim block">Open Source</span>
                  <span className="font-semibold text-white">GitHub Profile</span>
                </div>
              </a>

              <div className="p-4 rounded-xl bg-surface/40 border border-white/5 flex items-center gap-3 text-slate-300">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase text-dim block">Location</span>
                  <span className="font-semibold text-white">{portfolioTexts.factLoc.split("|")[0].trim()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
