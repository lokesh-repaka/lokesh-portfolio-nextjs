import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { portfolioTexts } from "@/data/portfolio";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-bg border-t border-gold-border/20 pt-16 pb-12 mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Col 1: Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center font-serif font-black text-bg text-base shadow-gold">
                LR
              </div>
              <span className="font-serif font-bold text-xl text-white tracking-wide">
                Lokesh Repaka
              </span>
            </div>
            <p className="text-muted text-sm max-w-md leading-relaxed">
              Generative AI Engineer & Forward Deployed Engineer architecting mission-critical multi-agent workflows, enterprise RAG systems, and deterministic AI governance.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={portfolioTexts.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-surface border border-white/10 flex items-center justify-center text-muted hover:text-gold-bright hover:border-gold/40 transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={portfolioTexts.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-surface border border-white/10 flex items-center justify-center text-muted hover:text-gold-bright hover:border-gold/40 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${portfolioTexts.emailUrl}`}
                className="w-9 h-9 rounded-lg bg-surface border border-white/10 flex items-center justify-center text-muted hover:text-gold-bright hover:border-gold/40 transition-all"
                aria-label="Email Me"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-gold-bright font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  About Architecture
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="hover:text-white transition-colors">
                  Technical Skills
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Production Projects
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-white transition-colors">
                  Governance Deep Dives
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-white transition-colors">
                  Curriculum Vitae
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Focus Areas */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-gold-bright font-semibold mb-4">
              Specializations
            </h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                <span>Multi-Agent LangGraph Loops</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                <span>Enterprise Hybrid RAG & Vector DBs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                <span>Document AI & AP Invoice Automation</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                <span>Deterministic Safety & IAM Governance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-dim">
          <p>
            © {new Date().getFullYear()} Lokesh Repaka. All rights reserved.
          </p>
          <p className="font-mono">
            Engineered with Next.js, TypeScript & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};
