"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Printer, Download, Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap, Cpu } from "lucide-react";
import { resumeData } from "@/data/resume";
import { portfolioTexts } from "@/data/portfolio";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="no-print flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-card border border-gold-border/30">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-gold-bright hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home Portfolio</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-gradient text-bg font-mono text-xs font-bold uppercase tracking-wider shadow-gold hover:opacity-95 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="printable-resume rounded-2xl bg-card border border-gold-border/30 p-8 sm:p-14 shadow-2xl space-y-10">
          
          {/* Header */}
          <header className="border-b border-white/10 pb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-white uppercase">
                {portfolioTexts.resumeName}
              </h1>
              <p className="text-gold font-mono text-sm uppercase tracking-wider font-semibold mt-1">
                {portfolioTexts.resumeRole}
              </p>
            </div>
            <div className="text-xs font-mono text-muted space-y-1 sm:text-right">
              <p className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Hyderabad, India (Open to Global Remote)</span>
              </p>
              <p className="flex items-center sm:justify-end gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>{portfolioTexts.emailUrl}</span>
              </p>
              <p className="flex items-center sm:justify-end gap-1.5">
                <Globe className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>github.com/lokesh-repaka</span>
              </p>
            </div>
          </header>

          {/* Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-gold-bright font-bold mb-3 border-b border-white/10 pb-1">
              // Professional Summary
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              {portfolioTexts.resumeSummary}
            </p>
          </div>

          {/* Technical Skills Matrix */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-gold-bright font-bold mb-4 border-b border-white/10 pb-1 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Technical Skills Matrix
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {resumeData.skillsMatrix.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-surface/60 border border-white/5 space-y-1">
                  <span className="font-mono text-gold-bright font-semibold uppercase">
                    {item.label}
                  </span>
                  <p className="text-slate-200">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-gold-bright font-bold mb-6 border-b border-white/10 pb-1 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Professional Experience
            </h2>
            <div className="space-y-6">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-serif font-bold text-base text-white">
                      {exp.title} <span className="text-gold font-sans font-normal text-sm">@ {exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-dim">{exp.duration}</span>
                  </div>
                  <ul className="space-y-2 pt-1">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-300 leading-relaxed list-disc ml-5">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Projects */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-gold-bright font-bold mb-6 border-b border-white/10 pb-1 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Key Enterprise Projects
            </h2>
            <div className="space-y-5">
              {resumeData.projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-surface/40 border border-white/5 space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-serif font-bold text-sm text-white">
                      {proj.title}
                    </h3>
                    <span className="text-xs font-mono text-gold-bright">{proj.duration}</span>
                  </div>
                  <p className="text-[11px] font-mono text-muted uppercase">Role: {proj.role}</p>
                  <ul className="space-y-1.5 pt-1">
                    {proj.bullets.map((bullet, idx) => (
                      <li key={idx} className="text-xs text-slate-300 leading-relaxed list-disc ml-5">
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
              <h2 className="text-xs font-mono uppercase tracking-widest text-gold-bright font-bold mb-3 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Certifications
              </h2>
              <ul className="space-y-2 text-xs text-slate-300">
                {resumeData.certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-gold font-bold">✓</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-gold-bright font-bold mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Education
              </h2>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="text-xs text-slate-300 space-y-1">
                  <p className="font-bold text-white">{edu.degree}</p>
                  <p className="text-gold">{edu.institution}</p>
                  <p className="text-dim font-mono">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
