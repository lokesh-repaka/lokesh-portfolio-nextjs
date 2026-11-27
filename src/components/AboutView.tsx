"use client";

import React from "react";
import { PortfolioTexts } from "@/types";

interface AboutViewProps {
  texts: PortfolioTexts;
  isActive: boolean;
  onNavigate: (view: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  texts,
  isActive,
  onNavigate,
}) => {
  return (
    <div id="view-about" className={`page-view ${isActive ? "active" : ""}`}>
      <div className="page-header">
        <div className="page-tag">Background & Philosophy</div>
        <h2 className="page-title">
          About <span>Me</span>
        </h2>
        <p className="page-subtitle">
          Bridging the gap between bleeding-edge AI models and enterprise zero-trust security.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-content">
          <div className="about-lead" id="display-aboutLead">
            {texts.aboutLead}
          </div>
          <p className="about-text" id="display-aboutP1">
            {texts.aboutP1}
          </p>
          <p className="about-text" id="display-aboutP2">
            {texts.aboutP2}
          </p>

          <div className="about-highlights">
            <div className="highlight-card">
              <div className="highlight-num" id="display-hlNum1">
                {texts.hlNum1}
              </div>
              <div className="highlight-label" id="display-hlLabel1">
                {texts.hlLabel1}
              </div>
            </div>
            <div className="highlight-card">
              <div className="highlight-num" id="display-hlNum2">
                {texts.hlNum2}
              </div>
              <div className="highlight-label" id="display-hlLabel2">
                {texts.hlLabel2}
              </div>
            </div>
            <div className="highlight-card">
              <div className="highlight-num" id="display-hlNum3">
                {texts.hlNum3}
              </div>
              <div className="highlight-label" id="display-hlLabel3">
                {texts.hlLabel3}
              </div>
            </div>
            <div className="highlight-card">
              <div className="highlight-num" id="display-hlNum4">
                {texts.hlNum4}
              </div>
              <div className="highlight-label" id="display-hlLabel4">
                {texts.hlLabel4}
              </div>
            </div>
          </div>
        </div>

        <div className="about-visual-card">
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.2rem",
              color: "var(--gold-bright)",
              marginBottom: "1rem",
              borderBottom: "1px solid rgba(234, 179, 8, 0.2)",
              paddingBottom: "0.6rem",
            }}
          >
            📋 Quick Facts
          </div>
          <ul className="info-list">
            <li className="info-item">
              <span className="info-key">Name</span>
              <span className="info-val" id="display-factName">
                {texts.factName || texts.heroName || "Lokesh Repaka"}
              </span>
            </li>
            <li className="info-item">
              <span className="info-key">Primary Role</span>
              <span className="info-val gold" id="display-factRole">
                {texts.factRole || texts.heroRole || "AI Engineer"}
              </span>
            </li>
            <li className="info-item">
              <span className="info-key">Specialization</span>
              <span className="info-val" id="display-factSpec">
                {texts.factSpec || "AI Governance & Identity"}
              </span>
            </li>
            <li className="info-item">
              <span className="info-key">Location</span>
              <span className="info-val" id="display-factLoc">
                {texts.factLoc || "India (Open to Remote / Relocation)"}
              </span>
            </li>
            <li className="info-item">
              <span className="info-key">Core Stack</span>
              <span className="info-val" id="display-factStack">
                {texts.factStack || "Python, FastAPI, LangGraph, PostgreSQL, LLMs"}
              </span>
            </li>
            <li className="info-item">
              <span className="info-key">Availability</span>
              <span className="info-val gold" id="display-factAvail">
                {texts.factAvail || "Open to Part-Time Contracts & Remote Opportunities"}
              </span>
            </li>
          </ul>
          <div style={{ marginTop: "1.8rem", textAlign: "center" }}>
            <button
              type="button"
              className="btn-gold"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => onNavigate("resume")}
            >
              View / Download Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
