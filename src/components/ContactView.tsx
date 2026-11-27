"use client";

import React from "react";
import { PortfolioTexts } from "@/types";

interface ContactViewProps {
  texts: PortfolioTexts;
  isActive: boolean;
}

export const ContactView: React.FC<ContactViewProps> = ({
  texts,
  isActive,
}) => {
  return (
    <div id="view-contact" className={`page-view ${isActive ? "active" : ""}`}>
      <div className="page-header">
        <div className="page-tag">Let&apos;s Connect</div>
        <h2 className="page-title">
          Contact <span>Me</span>
        </h2>
        <p className="page-subtitle">
          Interested in discussing AI engineering, governance frameworks, or collaborating on a project?
        </p>
      </div>

      <div className="contact-card-box">
        <p className="contact-lead" id="display-contactLead">
          {texts.contactLead}
        </p>

        <div className="contact-buttons-list">
          <a
            id="display-contactEmailLink"
            href={`mailto:${texts.emailUrl}`}
            className="contact-btn-item"
          >
            <span>✉️</span> Email Me
          </a>
          <a
            id="display-contactLinkedinLink"
            href={texts.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="contact-btn-item"
          >
            <span>💼</span> LinkedIn
          </a>
          <a
            id="display-contactGithubLink"
            href={texts.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="contact-btn-item"
          >
            <span>🐙</span> GitHub
          </a>
        </div>

        <div style={{ fontSize: "0.85rem", color: "var(--text-dim)", marginTop: "1rem" }}>
          📍 Based in India · Open to Remote & Worldwide Relocation
        </div>
      </div>
    </div>
  );
};
