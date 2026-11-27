"use client";

import React, { useState } from "react";
import { SkillCategory, Skill } from "@/types";

interface SkillsViewProps {
  categories: SkillCategory[];
  skills: Skill[];
  isActive: boolean;
}

export const SkillsView: React.FC<SkillsViewProps> = ({
  categories,
  skills,
  isActive,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <div id="view-skills" className={`page-view ${isActive ? "active" : ""}`}>
      <div className="page-header">
        <div className="page-tag">Technical Competencies</div>
        <h2 className="page-title">
          My <span>Skills</span>
        </h2>
        <p className="page-subtitle">
          Full-spectrum capabilities from LLM engineering to cryptographic workload security.
        </p>
      </div>

      <div className="filter-container">
        <div className="filter-bar" id="skillsFilterBar">
          <button
            type="button"
            className={`filter-btn ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            ALL
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`filter-btn ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="skills-grid" id="skillsGrid">
        {filteredSkills.map((g) => (
          <div key={g.id} className="skill-group-card" data-category={g.category}>
            <div className="skill-group-header">
              <span style={{ fontSize: "1.5rem" }}>{g.icon || "⚡"}</span>
              <h3 className="skill-group-title">{g.title}</h3>
            </div>
            <div className="skill-badges">
              {g.items.map((item, idx) => (
                <span key={idx} className="skill-badge">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
