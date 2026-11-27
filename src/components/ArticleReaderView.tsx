"use client";

import React, { useState, useEffect } from "react";
import { Blog } from "@/types";
import { marked } from "marked";
import { GITHUB_RAW_BASE } from "@/lib/github-blogs";

interface ArticleReaderViewProps {
  article: Blog | null;
  isActive: boolean;
  onBack: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const ArticleReaderView: React.FC<ArticleReaderViewProps> = ({
  article,
  isActive,
  onBack,
  onShowToast,
}) => {
  const [contentHtml, setContentHtml] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!article) return;

    let isMounted = true;

    async function loadContent() {
      if (!article) return;

      // If GitHub raw URL exists, attempt to fetch live markdown
      if (article.githubRaw) {
        setLoading(true);
        try {
          const res = await fetch(article.githubRaw);
          if (!res.ok) throw new Error("Fetch failed");
          const markdown = await res.text();

          marked.setOptions({
            breaks: true,
            gfm: true,
          });

          const baseImgUrl = `${GITHUB_RAW_BASE}/articles/${article.githubSlug || article.id}/`;
          const fixedMarkdown = markdown.replace(
            /!\[([^\]]*)\]\((images\/[^)]+)\)/g,
            (_, alt, path) => `![${alt}](${baseImgUrl}${path})`
          );

          const parsed = marked.parse(fixedMarkdown) as string;
          if (isMounted) {
            setContentHtml(`<div class="github-article-rendered">${parsed}</div>`);
            setLoading(false);
          }
          return;
        } catch {
          // Fallback to embedded content
        }
      }

      // Local / embedded content fallback
      if (article.content) {
        if (isMounted) {
          setContentHtml(article.content);
          setLoading(false);
        }
      } else {
        if (isMounted) {
          setContentHtml(`<p>${article.desc || ""}</p>`);
          setLoading(false);
        }
      }
    }

    loadContent();

    return () => {
      isMounted = false;
    };
  }, [article]);

  if (!article) return null;

  const handleShareLinkedIn = () => {
    if (typeof window !== "undefined") {
      const shareUrl = window.location.href;
      const linkedinShareUrl =
        "https://www.linkedin.com/sharing/share-offsite/?url=" +
        encodeURIComponent(shareUrl);
      window.open(linkedinShareUrl, "_blank", "width=600,height=600");
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      onShowToast("Article share link copied to clipboard!", "📋");
    }
  };

  return (
    <div
      id="view-article-reader"
      className={`page-view ${isActive ? "active" : ""}`}
    >
      <div className="article-reader-container">
        <div className="reader-top-nav">
          <button type="button" className="reader-back-btn" onClick={onBack}>
            ← Back to All Blogs
          </button>

          <div className="reader-share-group">
            <button
              type="button"
              className="share-btn"
              onClick={handleShareLinkedIn}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              Share on LinkedIn
            </button>
            <button type="button" className="share-btn" onClick={handleCopyLink}>
              🔗 Copy Link
            </button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            marginBottom: "0.8rem",
          }}
        >
          <span className="card-tag" id="readerCategoryBadge">
            {(article.category || "AI GOVERNANCE").toUpperCase()}
          </span>
          <span
            style={{ fontSize: "0.82rem", color: "var(--gold-bright)" }}
            id="readerReadTimeBadge"
          >
            {article.badge || "ARTICLE"}
          </span>
          <span
            style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}
            id="readerDateBadge"
          >
            · {article.date || "2025"}
          </span>
        </div>

        <h1 className="article-title-hero" id="readerTitle">
          {article.title}
        </h1>

        <div className="article-author-bar">
          <div className="author-avatar-mini">LR</div>
          <div>
            <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>
              Lokesh Repaka
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              AI Engineer & Governance Architect ·{" "}
              <a
                href="https://linkedin.com/in/lokesh-repaka"
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--gold-bright)", textDecoration: "none" }}
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="article-body-content" id="readerBody">
          {loading ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                color: "var(--gold-bright)",
                fontSize: "1.1rem",
              }}
            >
              ⟳ Loading full article from GitHub...
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          )}
        </div>
      </div>
    </div>
  );
};
