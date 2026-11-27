"use client";

import React, { useState } from "react";
import { ProjectCategory, Project } from "@/types";

interface ProjectsViewProps {
  categories: ProjectCategory[];
  projects: Project[];
  isActive: boolean;
  onOpenModal: (project: Project) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  categories,
  projects,
  isActive,
  onOpenModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesCategory;

    const matchesSearch =
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
      (p.category && p.category.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const gradients: Record<string, string> = {
    amber: "linear-gradient(135deg, #0e172a 0%, #1e293b 100%)",
    blue: "linear-gradient(135deg, #091e3a 0%, #172554 100%)",
    purple: "linear-gradient(135deg, #180d2b 0%, #3b0764 100%)",
    green: "linear-gradient(135deg, #062b1a 0%, #064e3b 100%)",
    cyan: "linear-gradient(135deg, #0e172a 0%, #1e293b 100%)",
  };

  const icons: Record<string, string> = {
    amber: "🛡️",
    blue: "🔍",
    purple: "🧠",
    green: "⚡",
    cyan: "🛡️",
  };

  return (
    <div id="view-projects" className={`page-view ${isActive ? "active" : ""}`}>
      <div className="page-header">
        <div className="page-tag">Portfolio Showcase</div>
        <h2 className="page-title">
          Featured <span>Projects</span>
        </h2>
        <p className="page-subtitle">
          Real-world AI systems built for security, resilience, and production scale.
        </p>
      </div>

      {/* Real-Time Search Bar */}
      <div style={{ maxWidth: "560px", margin: "0 auto 1.4rem auto", position: "relative" }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <span
            style={{
              position: "absolute",
              left: "16px",
              color: "var(--gold-bright)",
              fontSize: "1rem",
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, tech stack, or keyword..."
            style={{
              width: "100%",
              padding: "0.75rem 2.8rem 0.75rem 2.8rem",
              background: "#080c16",
              border: "1px solid rgba(234, 179, 8, 0.35)",
              borderRadius: "9999px",
              color: "#f8fafc",
              fontSize: "0.9rem",
              outline: "none",
              boxShadow: "0 0 15px rgba(234, 179, 8, 0.08)",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--gold-bright)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(234, 179, 8, 0.25)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(234, 179, 8, 0.35)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(234, 179, 8, 0.08)";
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: "14px",
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                fontSize: "1rem",
                cursor: "pointer",
                padding: "4px 8px",
              }}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="filter-container">
        <div className="filter-bar" id="projectsFilterBar">
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

      {filteredProjects.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 1rem",
            color: "var(--text-muted)",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <div style={{ fontSize: "2.4rem", marginBottom: "0.8rem" }}>🔍</div>
          <div style={{ fontSize: "1.15rem", color: "var(--gold-bright)", fontWeight: 600 }}>
            No projects found
          </div>
          <p style={{ fontSize: "0.88rem", marginTop: "0.4rem", lineHeight: "1.5" }}>
            No projects matched &quot;{searchQuery}&quot;. Try adjusting your search query or switching category filters.
          </p>
          <button
            type="button"
            className="btn-gold"
            style={{ marginTop: "1.2rem", padding: "0.5rem 1.4rem", fontSize: "0.85rem" }}
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="projects-grid" id="projectsGrid">
          {filteredProjects.map((p) => {
            const theme = p.theme || "amber";
            const icon = icons[theme] || "⚙️";

            return (
              <div
                key={p.id}
                className="gold-project-card clickable-card"
                data-category={p.category}
                style={{ cursor: "pointer" }}
                onClick={() => onOpenModal(p)}
              >
                <div className="card-image-box">
                  <div
                    className="mockup-dashboard"
                    style={{ background: gradients[theme] || gradients.amber }}
                  >
                    <div className="mockup-project-icon">{icon}</div>
                    <div className="mockup-center-title">{p.title}</div>
                    <div className="mockup-tech-row">
                      {p.tags.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="mockup-tech-pill">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="card-bottom-bar">
                  <h3 className="card-main-title">{p.title}</h3>
                  <div className="card-tags" style={{ margin: "0.6rem 0 0.8rem" }}>
                    {p.tags.map((t, idx) => (
                      <span key={idx} className="card-tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="card-links-row">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-link-item live-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        🌐 Live Demo ↗
                      </a>
                    )}
                    {p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-link-item github-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        💻 GitHub Repo →
                      </a>
                    ) : (
                      <span
                        className="card-link-item"
                        style={{
                          opacity: 0.8,
                          cursor: "default",
                          borderStyle: "dashed",
                          color: "var(--text-muted)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        🔒 Enterprise Private Repo
                      </span>
                    )}
                    <button
                      type="button"
                      className="card-link-item share-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenModal(p);
                      }}
                    >
                      🔍 View Details & Share
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
