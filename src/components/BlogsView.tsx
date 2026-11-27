"use client";

import React, { useState } from "react";
import { BlogCategory, Blog } from "@/types";

interface BlogsViewProps {
  categories: BlogCategory[];
  blogs: Blog[];
  isActive: boolean;
  onSelectBlog: (blogId: string) => void;
}

export const BlogsView: React.FC<BlogsViewProps> = ({
  categories,
  blogs,
  isActive,
  onSelectBlog,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredBlogs =
    activeCategory === "all"
      ? blogs
      : blogs.filter((b) => b.category === activeCategory);

  return (
    <div id="view-blogs" className={`page-view ${isActive ? "active" : ""}`}>
      <div className="page-header">
        <div className="page-tag">Engineering Articles</div>
        <h2 className="page-title">
          Technical <span>Blogs</span>
        </h2>
        <p className="page-subtitle">
          Deep architectural analyses, real disaster post-mortems, and reproducible zero-trust code.
        </p>
      </div>

      <div className="filter-container">
        <div className="filter-bar" id="blogsFilterBar">
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

      <div className="blogs-grid" id="blogsGrid">
        {filteredBlogs.map((b) => {
          return (
            <div
              key={b.id}
              className="gold-project-card clickable-card"
              data-category={b.category}
              style={{ cursor: "pointer", position: "relative" }}
              onClick={() => onSelectBlog(b.id)}
            >
              {b.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "rgba(8,11,17,0.85)",
                    border: "1px solid rgba(234,179,8,0.4)",
                    color: "var(--gold-bright)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    padding: "0.25rem 0.65rem",
                    borderRadius: "9999px",
                    zIndex: 2,
                  }}
                >
                  {b.badge}
                </div>
              )}

              <div className="card-image-box">
                {b.img ? (
                  <img
                    src={b.img}
                    alt={b.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://raw.githubusercontent.com/lokesh-repaka/articles/main/articles/01-ai-and-identity-governance/images/ai_governance_safety_highway.jpg";
                    }}
                  />
                ) : (
                  <div
                    className="mockup-dashboard"
                    style={{ background: "linear-gradient(135deg, #1c1917 0%, #292524 100%)" }}
                  >
                    <div className="mockup-center-title" style={{ color: "#fbbf24" }}>
                      {b.title}
                    </div>
                  </div>
                )}
              </div>

              <div className="card-bottom-bar">
                <h3 className="card-main-title">{b.title}</h3>
                <p className="card-desc">{b.desc}</p>
                <div className="card-tags">
                  {b.tags.map((t, idx) => (
                    <span key={idx} className="card-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="card-links-row">
                  <span className="card-link-item">Read Article →</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
