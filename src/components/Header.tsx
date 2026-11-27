"use client";

import React from "react";

interface HeaderProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, onNavigate }) => {
  return (
    <header id="header">
      <div className="nav-brand" onClick={() => onNavigate("home")}>
        <div className="nav-brand-logo">L</div>
        <div className="nav-brand-text">
          LOKESH<span>.DEV</span>
        </div>
      </div>

      <ul className="nav-links">
        <li>
          <button
            type="button"
            className={`nav-item-btn ${activeView === "home" ? "active" : ""}`}
            onClick={() => onNavigate("home")}
          >
            Home
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`nav-item-btn ${activeView === "about" ? "active" : ""}`}
            onClick={() => onNavigate("about")}
          >
            About Me
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`nav-item-btn ${activeView === "skills" ? "active" : ""}`}
            onClick={() => onNavigate("skills")}
          >
            Skills
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`nav-item-btn ${activeView === "resume" ? "active" : ""}`}
            onClick={() => onNavigate("resume")}
          >
            Resume
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`nav-item-btn ${activeView === "projects" ? "active" : ""}`}
            onClick={() => onNavigate("projects")}
          >
            Projects
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`nav-item-btn ${activeView === "blogs" ? "active" : ""}`}
            onClick={() => onNavigate("blogs")}
          >
            Blogs
          </button>
        </li>
      </ul>

      <div className="nav-right-actions">
        <button
          type="button"
          className="nav-cta-btn"
          onClick={() => onNavigate("contact")}
        >
          Contact Me
        </button>
        <button
          type="button"
          className={`nav-item-btn ${activeView === "admin" ? "active" : ""}`}
          onClick={() => onNavigate("admin")}
          title="Admin CMS Portal"
          style={{ padding: "0.45rem 0.6rem", fontSize: "1rem" }}
        >
          ⚙️
        </button>
      </div>
    </header>
  );
};
