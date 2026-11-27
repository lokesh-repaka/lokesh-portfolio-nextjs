"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@/types";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (project && typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}${window.location.pathname}#project&id=${project.id}`);
    }
  }, [project]);

  if (!project) return null;

  const icons: Record<string, string> = {
    amber: "🛡️",
    blue: "🔍",
    purple: "🧠",
    green: "⚡",
    cyan: "🛡️",
  };
  const icon = icons[project.theme || ""] || "⚙️";

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(shareUrl);
      onShowToast("Project share link copied to clipboard!", "📋");
    }
  };

  const handleShareLinkedIn = () => {
    if (typeof window !== "undefined") {
      const url = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(shareUrl);
      window.open(url, "_blank", "width=600,height=600");
    }
  };

  return (
    <div
      id="projectModalOverlay"
      className={`project-modal-overlay ${isOpen ? "active" : ""}`}
      onClick={onClose}
    >
      <div
        className="project-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="project-modal-close"
          onClick={onClose}
          title="Close"
        >
          ✕
        </button>

        <div className="project-modal-header">
          <div id="modalProjIcon" className="project-modal-icon">
            {icon}
          </div>
          <div>
            <span id="modalProjCategory" className="project-modal-category">
              {(project.category || "PROJECT").toUpperCase()}
            </span>
            <h2 id="modalProjTitle" className="project-modal-title">
              {project.title}
            </h2>
          </div>
        </div>

        <p id="modalProjDesc" className="project-modal-desc">
          {project.desc}
        </p>

        <div id="modalProjTags" className="project-modal-tags">
          {project.tags.map((t, idx) => (
            <span key={idx} className="card-tag">
              {t}
            </span>
          ))}
        </div>

        <div className="project-modal-actions">
          {project.liveUrl && (
            <a
              id="modalProjLiveBtn"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link-item live-link"
              style={{ display: "inline-flex", padding: "0.6rem 1.2rem", fontSize: "0.9rem" }}
            >
              🌐 Open Live Demo ↗
            </a>
          )}
          {project.url ? (
            <a
              id="modalProjGitBtn"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link-item github-link"
              style={{ display: "inline-flex", padding: "0.6rem 1.2rem", fontSize: "0.9rem" }}
            >
              💻 View GitHub Repo →
            </a>
          ) : (
            <span
              className="card-link-item"
              style={{
                opacity: 0.85,
                cursor: "default",
                borderStyle: "dashed",
                color: "var(--text-muted)",
                fontSize: "0.75rem",
                display: "inline-flex",
              }}
            >
              🔒 Enterprise Private Repository (Code available upon request)
            </span>
          )}
        </div>

        {/* Shareable Link Box */}
        <div className="project-modal-share-box">
          <div
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--gold-bright)",
              marginBottom: "0.4rem",
            }}
          >
            🔗 Shareable Project Link
          </div>
          <div className="project-modal-share-row">
            <input
              type="text"
              id="modalProjShareUrl"
              value={shareUrl}
              readOnly
            />
            <button
              type="button"
              className="btn-gold"
              style={{ padding: "0.45rem 1rem", fontSize: "0.82rem" }}
              onClick={handleCopyLink}
            >
              📋 Copy
            </button>
            <button
              type="button"
              className="card-link-item github-link"
              style={{ padding: "0.45rem 1rem", fontSize: "0.82rem" }}
              onClick={handleShareLinkedIn}
            >
              LinkedIn ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
