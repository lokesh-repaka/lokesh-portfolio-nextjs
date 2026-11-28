"use client";

import React from "react";
import { PortfolioTexts, ResumeData } from "@/types";

interface ResumeViewProps {
  texts: PortfolioTexts;
  resume: ResumeData;
  isActive: boolean;
}

export const ResumeView: React.FC<ResumeViewProps> = ({
  texts,
  resume,
  isActive,
}) => {
  return (
    <div id="view-resume" className={`page-view ${isActive ? "active" : ""}`}>
      <div className="page-header">
        <div className="page-tag">Career & Credentials</div>
        <h2 className="page-title">
          My <span>Resume</span>
        </h2>
        <p className="page-subtitle">
          Review my credentials, achievements, or download a printable PDF copy.
        </p>
      </div>

      <div className="resume-actions-bar">
        <button
          type="button"
          className="btn-gold"
          onClick={() => window.print()}
        >
          <span>📥</span> Download / Print Resume
        </button>
      </div>

      <div className="resume-viewer-container">
        <div className="resume-topbar">
          <div style={{ display: "flex", gap: "0.4rem" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }}></span>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#eab308" }}></span>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e" }}></span>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--gold-bright)" }}>
            lokesh_repaka_resume.pdf
          </div>
          <div style={{ fontSize: "0.75rem", color: "#10b981" }}>● Verified Profile</div>
        </div>

        <div className="resume-paper" id="resumePaper">
          <div className="resume-header">
            <div className="resume-name" id="display-resumeName">
              {texts.resumeName || "LOKESH REPAKA"}
            </div>
            <div className="resume-title" id="display-resumeRole">
              {texts.resumeRole || "AI Engineer & AI Governance Architect"}
            </div>
            <div className="resume-contact-line">
              <span id="display-resumeContact">
                {texts.resumeContact || "📍 India  |  📧 lokeshrepaka4@gmail.com  |  🌐 github.com/lokesh-repaka"}
              </span>
            </div>
          </div>

          <div className="resume-section-heading">Professional Summary</div>
          <p
            style={{ fontSize: "0.92rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}
            id="display-resumeSummary"
          >
            {texts.resumeSummary}
          </p>

          <div className="resume-section-heading">Core Technical Skills</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "150px 1fr",
              gap: "0.8rem",
              fontSize: "0.9rem",
              marginBottom: "1.5rem",
            }}
            id="display-resumeSkillsMatrix"
          >
            {resume.skillsMatrix.map((m, idx) => (
              <React.Fragment key={idx}>
                <span style={{ color: "var(--gold-bright)", fontWeight: 600 }}>{m.label}:</span>
                <span>{m.value}</span>
              </React.Fragment>
            ))}
          </div>

          <div className="resume-section-heading">Professional Experience</div>
          <div id="display-resumeExperienceList">
            {resume.experience.map((exp) => (
              <div key={exp.id} className="resume-item">
                <div className="resume-item-top">
                  <span>{exp.title}</span>
                  <span>{exp.company || ""}</span>
                </div>
                <div className="resume-item-sub">
                  <span>{exp.role || ""}</span>
                  <span>{exp.duration || ""}</span>
                </div>
                <ul className="resume-bullets">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="resume-section-heading">Key Engineering & Personal Projects</div>
          <div id="display-resumeProjectsList">
            {resume.projects.map((proj) => (
              <div key={proj.id} className="resume-item">
                <div className="resume-item-top">
                  <span style={{ fontWeight: 600, color: "var(--text-bright, #fff)" }}>{proj.title}</span>
                </div>
                <ul className="resume-bullets">
                  {proj.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="resume-section-heading">Certifications</div>
          <div id="display-resumeCertificationsList">
            <ul className="resume-bullets">
              {resume.certifications.map((cert, idx) => (
                <li key={idx}>{cert}</li>
              ))}
            </ul>
          </div>

          <div className="resume-section-heading">Education</div>
          <div id="display-resumeEducationList">
            {resume.education.map((edu) => (
              <div key={edu.id} className="resume-item">
                <div className="resume-item-top">
                  <span>{edu.degree}</span>
                  <span>{edu.year}</span>
                </div>
                <div className="resume-item-sub">
                  <span>{edu.institution}</span>
                  {edu.major && <span>{edu.major}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
