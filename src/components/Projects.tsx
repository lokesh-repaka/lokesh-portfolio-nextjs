"use client";

import React, { useState } from "react";
import { projectCategories, projects } from "@/data/projects";
import { Project } from "@/types";
import { ProjectModal } from "@/components/ProjectModal";
import { ExternalLink, Github, ArrowRight, Layers } from "lucide-react";

const themeBorderStyles: Record<string, string> = {
  amber: "border-amber-500/30 hover:border-amber-400 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]",
  blue: "border-sky-500/30 hover:border-sky-400 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.25)]",
  green: "border-emerald-500/30 hover:border-emerald-400 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]",
  purple: "border-purple-500/30 hover:border-purple-400 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
  cyan: "border-teal-500/30 hover:border-teal-400 group-hover:shadow-[0_0_30px_rgba(20,184,166,0.25)]",
};

const themeTagStyles: Record<string, string> = {
  amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  blue: "text-sky-400 bg-sky-500/10 border-sky-500/20",
  green: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  cyan: "text-teal-400 bg-teal-500/10 border-teal-500/20",
};

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 border-t border-gold-border/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-gold font-mono text-xs uppercase tracking-widest font-semibold mb-2">
              <span>// 03</span>
              <span>PRODUCTION SYSTEMS & CODE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Featured Enterprise Deployments
            </h2>
          </div>
          <p className="text-muted text-sm max-w-md font-sans">
            Every platform is engineered for enterprise reliability, high throughput, and strict zero-trust audit compliance.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all uppercase ${
              activeCategory === "all"
                ? "bg-gold-gradient text-bg font-bold shadow-gold"
                : "bg-card border border-white/10 text-muted hover:text-white hover:border-gold-border/40"
            }`}
          >
            All Projects ({projects.length})
          </button>
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all uppercase ${
                activeCategory === cat.id
                  ? "bg-gold-gradient text-bg font-bold shadow-gold"
                  : "bg-card border border-white/10 text-muted hover:text-white hover:border-gold-border/40"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((proj) => {
            const theme = proj.theme || "amber";
            const borderStyle = themeBorderStyles[theme] || themeBorderStyles.amber;
            const tagStyle = themeTagStyles[theme] || themeTagStyles.amber;

            return (
              <div
                key={proj.id}
                className={`p-7 rounded-2xl bg-card border ${borderStyle} transition-all duration-300 flex flex-col justify-between group relative`}
              >
                <div>
                  {/* Category Pill & ID */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest border font-semibold ${tagStyle}`}>
                      {proj.category}
                    </span>
                    <span className="text-[11px] font-mono text-dim tracking-wider uppercase">
                      PROD-READY
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white group-hover:text-gold-bright transition-colors mb-3 leading-snug">
                    {proj.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted text-sm leading-relaxed mb-6">
                    {proj.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {proj.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-surface/80 border border-white/5 text-[11px] font-mono text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="flex items-center gap-1.5 text-xs font-mono font-medium text-gold-bright hover:underline"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Deep Dive</span>
                  </button>

                  <div className="flex items-center gap-3">
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-surface border border-white/10 text-muted hover:text-white hover:border-gold/40 transition-all"
                        aria-label="GitHub Repository"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/10 border border-gold-border/40 text-gold-bright text-xs font-mono font-semibold hover:bg-gold-gradient hover:text-bg transition-all"
                        title="Open Live Deployment"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
