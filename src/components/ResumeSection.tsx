"use client";

import React from "react";
import Link from "next/link";
import { resumeData } from "@/data/resume";
import { portfolioTexts } from "@/data/portfolio";
import { FileText, Printer, Download, ExternalLink, Briefcase, GraduationCap, Award, Cpu } from "lucide-react";

export const ResumeSection: React.FC = () => {
  return (
    <section id="resume" className="py-20 border-t border-gold-border/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-gold font-mono text-xs uppercase tracking-widest font-semibold mb-2">
              <span>// 05</span>
              <span>VERIFIED TRACK RECORD</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Curriculum Vitae & Experience
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/resume"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-gradient text-bg font-mono text-xs uppercase font-bold tracking-wider shadow-gold hover:opacity-95 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Printable View</span>
            </Link>
          </div>
        </div>

        {/* Paper-styled resume card */}
        <div className="rounded-2xl bg-card border border-gold-border/30 p-6 sm:p-10 shadow-2xl space-y-10">
          
          {/* Header Block */}
          <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
                {portfolioTexts.resumeName}
              </h1>
              <p className="text-gold font-mono text-sm uppercase tracking-wider font-semibold mt-1">
                {portfolioTexts.resumeRole}
              </p>
              <p className="text-muted text-xs sm:text-sm font-mono mt-2">
                {portfolioTexts.resumeContact}
              </p>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-gold-bright font-semibold mb-3">
              // Professional Summary
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {portfolioTexts.resumeSummary}
            </p>
          </div>

          {/* Technical Skills Matrix */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-gold-bright font-semibold mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Technical Skills Matrix
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm font-sans">
              {resumeData.skillsMatrix.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-surface/60 border border-white/5 space-y-1">
                  <span className="font-mono text-gold/90 font-semibold uppercase text-xs">
                    {item.label}
                  </span>
                  <p className="text-slate-200">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-gold-bright font-semibold mb-6 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Professional Experience
            </h3>
            <div className="space-y-8">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-gold-border/40 space-y-2">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-bg border-2 border-gold"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-serif font-bold text-lg text-white">
                      {exp.title} <span className="text-gold font-sans font-normal text-sm">@ {exp.company}</span>
                    </h4>
                    <span className="text-xs font-mono text-dim">{exp.duration}</span>
                  </div>
                  <ul className="space-y-2 pt-2">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="text-sm text-slate-300 leading-relaxed list-disc ml-4">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Enterprise Projects */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-gold-bright font-semibold mb-6 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Key Enterprise Projects
            </h3>
            <div className="space-y-6">
              {resumeData.projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-surface/40 border border-white/5 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-serif font-bold text-base text-white">
                      {proj.title}
                    </h4>
                    <span className="text-xs font-mono text-gold-bright">{proj.duration}</span>
                  </div>
                  <p className="text-xs font-mono text-muted uppercase">Role: {proj.role}</p>
                  <ul className="space-y-1.5 pt-1">
                    {proj.bullets.map((bullet, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-300 leading-relaxed list-disc ml-4">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/10">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-gold-bright font-semibold mb-3 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Certifications
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {resumeData.certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-gold font-bold">✓</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-gold-bright font-semibold mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Education
              </h3>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="text-xs sm:text-sm text-slate-300 space-y-1">
                  <p className="font-bold text-white">{edu.degree}</p>
                  <p className="text-gold">{edu.institution}</p>
                  <p className="text-dim font-mono">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
