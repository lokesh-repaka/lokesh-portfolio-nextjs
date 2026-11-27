"use client";

import React, { useState } from "react";
import { skillCategories, skills } from "@/data/skills";
import { Check } from "lucide-react";

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-20 border-t border-gold-border/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-gold font-mono text-xs uppercase tracking-widest font-semibold mb-2">
            <span>// 02</span>
            <span>CAPABILITIES & SYSTEM MASTERY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Technical Skills & Engineering Competencies
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all uppercase ${
              activeCategory === "all"
                ? "bg-gold-gradient text-bg font-bold shadow-gold"
                : "bg-card border border-white/10 text-muted hover:text-white hover:border-gold-border/40"
            }`}
          >
            All Skills ({skills.length})
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all uppercase ${
                activeCategory === cat.id
                  ? "bg-gold-gradient text-bg font-bold shadow-gold"
                  : "bg-card border border-white/10 text-muted hover:text-white hover:border-gold-border/40"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-6 rounded-2xl bg-card border border-gold-border/25 hover:border-gold-border/70 hover:shadow-gold transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white group-hover:text-gold-bright transition-colors">
                      {skill.title}
                    </h3>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold/80 font-semibold">
                      {skill.category.replace("_", " ")}
                    </span>
                  </div>
                </div>

                {/* Bullet items */}
                <ul className="space-y-2.5 mt-5">
                  {skill.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-slate-300 font-sans"
                    >
                      <span className="mt-1 w-4 h-4 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold-bright shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
