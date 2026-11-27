import React from "react";
import { portfolioTexts } from "@/data/portfolio";
import { Shield, Cpu, Activity, Award, CheckCircle } from "lucide-react";

export const About: React.FC = () => {
  const highlights = [
    {
      num: portfolioTexts.hlNum1 || "15+",
      label: portfolioTexts.hlLabel1 || "AI Systems Deployed",
      icon: Cpu,
    },
    {
      num: portfolioTexts.hlNum2 || "0 Trust",
      label: portfolioTexts.hlLabel2 || "Deterministic AI Security",
      icon: Shield,
    },
    {
      num: portfolioTexts.hlNum3 || "100%",
      label: portfolioTexts.hlLabel3 || "Production Grade Code",
      icon: Activity,
    },
    {
      num: portfolioTexts.hlNum4 || "1 Series",
      label: portfolioTexts.hlLabel4 || "Governance Deep Dives",
      icon: Award,
    },
  ];

  return (
    <section id="about" className="py-20 border-t border-gold-border/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-gold font-mono text-xs uppercase tracking-widest font-semibold mb-2">
            <span>// 01</span>
            <span>PHILOSOPHY & ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Deterministic Governance for Probabilistic Intelligence
          </h2>
        </div>

        {/* Narrative & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Narrative */}
          <div className="lg:col-span-7 space-y-5 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p className="font-medium text-white text-lg sm:text-xl leading-snug">
              {portfolioTexts.aboutLead}
            </p>
            <p className="text-muted text-base">
              {portfolioTexts.aboutP1}
            </p>
            <p className="text-muted text-base">
              {portfolioTexts.aboutP2}
            </p>

            {/* Quick Fact Matrix */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-surface/60 border border-white/5 space-y-1">
                <span className="text-dim uppercase tracking-wider">Role</span>
                <p className="text-slate-200 font-medium font-sans text-sm">{portfolioTexts.factRole}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-surface/60 border border-white/5 space-y-1">
                <span className="text-dim uppercase tracking-wider">Location</span>
                <p className="text-slate-200 font-medium font-sans text-sm">{portfolioTexts.factLoc}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-surface/60 border border-white/5 space-y-1">
                <span className="text-dim uppercase tracking-wider">Specialization</span>
                <p className="text-slate-200 font-medium font-sans text-sm">{portfolioTexts.factSpec}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-surface/60 border border-white/5 space-y-1">
                <span className="text-dim uppercase tracking-wider">Availability</span>
                <p className="text-slate-200 font-medium font-sans text-sm text-gold-bright">{portfolioTexts.factAvail}</p>
              </div>
            </div>
          </div>

          {/* Stat Cards Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-card border border-gold-border/20 flex flex-col justify-between hover:border-gold-border/60 hover:shadow-gold transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold-bright group-hover:scale-110 transition-transform mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-serif font-black text-white group-hover:text-gold-bright transition-colors">
                      {item.num}
                    </div>
                    <div className="text-xs text-muted font-mono mt-1 uppercase tracking-wider">
                      {item.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
