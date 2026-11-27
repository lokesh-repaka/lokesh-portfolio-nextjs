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
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredBlogs = blogs.filter((b) => {
    const matchesCategory = activeCategory === "all" || b.category === activeCategory;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesCategory;

    const matchesSearch =
      b.title.toLowerCase().includes(q) ||
      b.desc.toLowerCase().includes(q) ||
      (b.tags && b.tags.some((t) => t.toLowerCase().includes(q))) ||
      (b.category && b.category.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

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
            placeholder="Search articles by title, tags, or keyword..."
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

      {filteredBlogs.length === 0 ? (
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
            No articles found
          </div>
          <p style={{ fontSize: "0.88rem", marginTop: "0.4rem", lineHeight: "1.5" }}>
            No articles matched &quot;{searchQuery}&quot;. Try adjusting your search query.
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
                    <div className="card-img-placeholder">
                      <span>✍️</span>
                    </div>
                  )}
                </div>

                <div className="card-bottom-bar">
                  <div className="card-category-label">
                    {(b.category || "ARTICLE").toUpperCase()}
                  </div>
                  <h3 className="card-main-title">{b.title}</h3>
                  <p className="card-desc">{b.desc}</p>
                  <div className="card-tags" style={{ margin: "0.6rem 0 0.8rem" }}>
                    {b.tags &&
                      b.tags.map((t, idx) => (
                        <span key={idx} className="card-tag">
                          {t}
                        </span>
                      ))}
                  </div>
                  <div className="card-links-row">
                    <span className="card-link-item read-link">Read Full Analysis →</span>
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
