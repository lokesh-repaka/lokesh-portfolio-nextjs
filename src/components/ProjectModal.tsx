"use client";

import React from "react";
import { Project } from "@/types";
import { X, ExternalLink, Github, Layers, CheckCircle2, ShieldAlert } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card border border-gold-border/50 rounded-2xl p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg bg-surface border border-white/10 text-muted hover:text-white hover:border-gold/40 transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pr-10">
          <div className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-bright text-xs font-mono uppercase tracking-wider mb-3">
            {project.category}
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
            {project.title}
          </h2>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-lg bg-surface border border-white/5 text-xs font-mono text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description & Architecture Breakdown */}
        <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base border-t border-white/10 pt-6">
          <div>
            <h4 className="text-sm font-mono uppercase tracking-wider text-gold-bright font-semibold mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Overview & Problem Statement
            </h4>
            <p className="text-slate-300">
              {project.desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface/60 border border-white/10 space-y-2">
            <h4 className="text-sm font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Key Architectural Guarantees
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 font-sans">
              <li>• Deterministic policy gates and Human-in-the-Loop approval before any critical state mutation.</li>
              <li>• Immutable audit trails and compliance verification suitable for regulated enterprise deployments.</li>
              <li>• Sub-millisecond vector indexing and cross-encoder re-ranking pipelines minimizing token costs and latency.</li>
            </ul>
          </div>
        </div>

        {/* Action Links */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-white/10 hover:border-gold-border/40 text-slate-200 text-xs font-mono tracking-wider transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-gradient text-bg text-xs font-mono font-bold tracking-wider shadow-gold hover:opacity-95 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Deployment</span>
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-xs font-mono text-muted hover:text-white transition-colors"
          >
            Close Window ✕
          </button>
        </div>
      </div>
    </div>
  );
};
