"use client";

import React from "react";
import { PortfolioTexts } from "@/types";

interface HomeViewProps {
  texts: PortfolioTexts;
  isActive: boolean;
  onNavigate: (view: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  texts,
  isActive,
  onNavigate,
}) => {
  return (
    <div id="view-home" className={`page-view ${isActive ? "active" : ""}`}>
      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            <span id="display-heroBadge">{texts.heroBadge}</span>
          </div>

          <div className="hero-greeting" id="display-heroGreeting">
            {texts.heroGreeting}
          </div>
          <h1 className="hero-name" id="display-heroName">
            {texts.heroName}
          </h1>
          <div className="hero-role" id="display-heroRole">
            {texts.heroRole}
          </div>

          <p className="hero-bio" id="display-heroBio">
            {texts.heroBio}
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="btn-gold"
              onClick={() => onNavigate("contact")}
            >
              <span>📬</span> Contact Me
            </button>
            <button
              type="button"
              className="btn-outline-gold"
              onClick={() => onNavigate("projects")}
            >
              View Projects
            </button>
            <button
              type="button"
              className="btn-outline-gold"
              onClick={() => onNavigate("resume")}
            >
              View Resume
            </button>
          </div>

          <div className="hero-socials">
            <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", marginRight: "0.5rem" }}>
              Connect:
            </span>
            <a
              id="display-linkedinLink"
              href={texts.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn"
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              id="display-githubLink"
              href={texts.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn"
              title="GitHub"
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Hero Photo Card */}
        <div className="hero-photo-wrapper">
          <div className="hero-photo-card">
            <div className="photo-display">
              {texts.profilePhoto ? (
                <img
                  id="userUploadedPhoto"
                  src={texts.profilePhoto}
                  alt={texts.heroName}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div className="photo-avatar-placeholder" id="avatarPlaceholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="hero-photo-name" id="display-cardName">
              {texts.cardName || texts.heroName}
            </div>
            <div className="hero-photo-sub" id="display-cardSub">
              {texts.cardSub || texts.heroRole}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
