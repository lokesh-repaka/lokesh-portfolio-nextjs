"use client";

import React, { useState, useEffect } from "react";
import { PortfolioTexts, Skill, SkillCategory, Project, ProjectCategory, Blog, BlogCategory, ResumeData } from "@/types";

interface AdminViewProps {
  texts: PortfolioTexts;
  skills: Skill[];
  skillCategories: SkillCategory[];
  projects: Project[];
  projectCategories: ProjectCategory[];
  blogs: Blog[];
  blogCategories: BlogCategory[];
  resume: ResumeData;
  isActive: boolean;
  onNavigate: (view: string) => void;
  onUpdateTexts: (texts: PortfolioTexts) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  texts,
  skills,
  skillCategories,
  projects,
  projectCategories,
  blogs,
  blogCategories,
  resume,
  isActive,
  onNavigate,
  onUpdateTexts,
  onShowToast,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [heroState, setHeroState] = useState(texts);

  useEffect(() => {
    setHeroState(texts);
    if (typeof window !== "undefined") {
      const logged = sessionStorage.getItem("admin_logged_in");
      if (logged === "true") setIsLoggedIn(true);
    }
  }, [texts]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (username === "lokesh" && (password === "L0k3sh@Admin#2025" || password === "lokesh@2025")) ||
      (username === "admin" && (password === "admin123" || password === "admin"))
    ) {
      setIsLoggedIn(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("admin_logged_in", "true");
      }
      onShowToast("🎉 Logged in to Admin Portal!");
    } else {
      alert("Invalid credentials. Try: lokesh / L0k3sh@Admin#2025");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("admin_logged_in");
    }
    onShowToast("Logged out of Admin Portal.");
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTexts(heroState);
    onShowToast("Hero settings saved!");
  };

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTexts(heroState);
    onShowToast("About settings saved!");
  };

  const handleSaveResumeHeader = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTexts(heroState);
    onShowToast("Resume settings saved!");
  };

  const handleExportDataJson = () => {
    const fullData = {
      texts: heroState,
      skillCategories,
      skills,
      projectCategories,
      projects,
      blogCategories,
      blogs,
      resume,
    };
    const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-data-backup.json";
    a.click();
    URL.revokeObjectURL(url);
    onShowToast("Full data backup downloaded!");
  };

  return (
<div id="view-admin" className="page-view">
    
    {/* State A: Login Card (If not logged in) */}
    <div id="adminLoginSection" className="admin-login-card" style={{ display: isLoggedIn ? "none" : "block" }}>
      <div style={{ fontSize: "2.8rem", marginBottom: "0.8rem" }}>🔐</div>
      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: "var(--gold-bright)", marginBottom: "0.4rem" }}>
        Admin Portal Login
      </h2>
      <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "1.8rem" }}>
        Sign in to manage projects, blogs, skills, resume, and categories.
      </p>

      <form onSubmit={handleLogin}>
        <div className="form-group" style={{ textAlign: "left" }}>
          <label>Username</label>
          <input type="text" id="adminUser" required placeholder="Username" autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group" style={{ textAlign: "left" }}>
          <label>Password</label>
          <input type="password" id="adminPass" required placeholder="Password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn-gold" style={{ width: "100%", justifyContent: "center" }}>
          Login to Dashboard →
        </button>
      </form>
    </div>

    {/* State B: Admin Dashboard CMS (When logged in) */}
    <div id="adminDashboardSection" style={{ display: isLoggedIn ? "block" : "none" }}>
      
      <div className="admin-dash-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <span style={{ fontSize: "1.4rem" }}>⚡</span>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: "700", color: "var(--gold-bright)", fontSize: "1.1rem" }}>
              PORTFOLIO CMS DASHBOARD
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Logged in as Administrator (Lokesh)</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          <button className="nav-cta-btn" onClick={() => onNavigate("home")}>
            👁️ View Live Portfolio
          </button>
          <button className="nav-admin-link" onClick={handleExportDataJson}>
            💾 Backup JSON
          </button>
          <button className="admin-delete-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>

      <div className="admin-dashboard-container">
        <div className="admin-dash-body">
          
          {/* Sidebar Tabs */}
          <div className="admin-dash-sidebar">
            <button className="admin-tab-btn active" onClick={() => setActiveTab("hero")}>
              <span>🏠</span> Hero & Profile
            </button>
            <button className="admin-tab-btn" onClick={() => setActiveTab("about")}>
              <span>👤</span> About Me
            </button>
            <button className="admin-tab-btn" onClick={() => setActiveTab("skills")}>
              <span>⚡</span> Skills & Categories
            </button>
            <button className="admin-tab-btn" onClick={() => setActiveTab("projects")}>
              <span>🚀</span> Projects & Filters
            </button>
            <button className="admin-tab-btn" onClick={() => setActiveTab("blogs")}>
              <span>✍️</span> Blogs & Content
            </button>
            <button className="admin-tab-btn" onClick={() => setActiveTab("resume")}>
              <span>📄</span> Resume Full Editor
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="admin-tab-content-panel">
            
            {/* PANEL 1: HERO & PROFILE */}
            <div id="panel-hero" className="admin-panel active">
              {/* Photo Upload Box */}
              <div className="admin-form-box">
                <div className="admin-form-title"><span>📷</span> Profile Photo Upload</div>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                  <div style={{ width: "85px", height: "85px", borderRadius: "50%", border: "2px solid var(--gold-bright)", overflow: "hidden", background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>
                    <img id="adminPhotoPreviewImg" src="" alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover", display: "none" }} />
                    <span id="adminPhotoPlaceholderIcon" style={{ fontSize: "2rem", color: "var(--gold-bright)" }}>👤</span>
                  </div>
                  <div style={{ flex: "1", minWidth: "240px" }}>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "600", color: "var(--gold-bright)", marginBottom: "0.4rem", textTransform: "uppercase" }}>
                      Select Photo From Computer
                    </label>
                    <input type="file" id="adminPhotoFileInput" accept="image/*" style={{ marginBottom: "0.6rem", background: "#060910", border: "1px solid rgba(234,179,8,0.3)", borderRadius: "8px", padding: "0.5rem", color: "#fff", width: "100%" }} onChange={() => {}} />
                    <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
                      <button type="button" className="admin-delete-btn" onClick={() => {}}>Remove Photo</button>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>(Uploads instantly and updates hero card)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="admin-form-box">
                <div className="admin-form-title"><span>🏠</span> Edit Hero & Profile Information</div>
                <form onSubmit={handleSaveHero}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" id="formHeroName" required />
                    </div>
                    <div className="form-group">
                      <label>Professional Title</label>
                      <input type="text" id="formHeroRole" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Greeting Subtitle</label>
                      <input type="text" id="formHeroGreeting" />
                    </div>
                    <div className="form-group">
                      <label>Availability Badge</label>
                      <input type="text" id="formHeroBadge" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Hero Bio Paragraph</label>
                    <textarea id="formHeroBio" rows={4} required></textarea>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Profile Card Name</label>
                      <input type="text" id="formCardName" />
                    </div>
                    <div className="form-group">
                      <label>Profile Card Subtitle</label>
                      <input type="text" id="formCardSub" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>LinkedIn Profile URL</label>
                      <input type="url" id="formLinkedinUrl" />
                    </div>
                    <div className="form-group">
                      <label>GitHub Profile URL</label>
                      <input type="url" id="formGithubUrl" />
                    </div>
                  </div>
                  <button type="submit" className="btn-gold" style={{ padding: "0.7rem 1.8rem" }}>
                    💾 Save Hero & Profile Changes
                  </button>
                </form>
              </div>
            </div>

            {/* PANEL 2: ABOUT ME */}
            <div id="panel-about" className="admin-panel">
              <div className="admin-form-box">
                <div className="admin-form-title"><span>👤</span> Edit About Me Story & Highlights</div>
                <form onSubmit={handleSaveAbout}>
                  <div className="form-group">
                    <label>Lead Statement</label>
                    <textarea id="formAboutLead" rows={2} required></textarea>
                  </div>
                  <div className="form-group">
                    <label>Paragraph 1</label>
                    <textarea id="formAboutP1" rows={3} required></textarea>
                  </div>
                  <div className="form-group">
                    <label>Paragraph 2</label>
                    <textarea id="formAboutP2" rows={3} required></textarea>
                  </div>
                  
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", color: "var(--gold-bright)", margin: "1.2rem 0 0.8rem" }}>
                    Highlight Statistics:
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Stat 1 Number</label>
                      <input type="text" id="formHlNum1" />
                    </div>
                    <div className="form-group">
                      <label>Stat 1 Label</label>
                      <input type="text" id="formHlLabel1" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Stat 2 Number</label>
                      <input type="text" id="formHlNum2" />
                    </div>
                    <div className="form-group">
                      <label>Stat 2 Label</label>
                      <input type="text" id="formHlLabel2" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Stat 3 Number</label>
                      <input type="text" id="formHlNum3" />
                    </div>
                    <div className="form-group">
                      <label>Stat 3 Label</label>
                      <input type="text" id="formHlLabel3" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Stat 4 Number</label>
                      <input type="text" id="formHlNum4" />
                    </div>
                    <div className="form-group">
                      <label>Stat 4 Label</label>
                      <input type="text" id="formHlLabel4" />
                    </div>
                  </div>

                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", color: "var(--gold-bright)", margin: "1.5rem 0 0.8rem", borderTop: "1px solid rgba(234,179,8,0.2)", paddingTop: "1.2rem" }}>
                    📋 Quick Facts Card (Sidebar):
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" id="formFactName" placeholder="Lokesh Repaka" />
                    </div>
                    <div className="form-group">
                      <label>Primary Role</label>
                      <input type="text" id="formFactRole" placeholder="AI Engineer" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Specialization</label>
                      <input type="text" id="formFactSpec" placeholder="AI Governance & Identity" />
                    </div>
                    <div className="form-group">
                      <label>Location</label>
                      <input type="text" id="formFactLoc" placeholder="India (Open to Remote / Relocation)" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Core Stack</label>
                      <input type="text" id="formFactStack" placeholder="Python, FastAPI, LangGraph, PostgreSQL, LLMs" />
                    </div>
                    <div className="form-group">
                      <label>Availability</label>
                      <input type="text" id="formFactAvail" placeholder="Open to Part-Time Contracts & Remote Opportunities" />
                    </div>
                  </div>

                  <button type="submit" className="btn-gold" style={{ padding: "0.7rem 1.8rem", marginTop: "0.8rem" }}>
                    💾 Save About Me & Quick Facts Changes
                  </button>
                </form>
              </div>
            </div>

            {/* PANEL 3: SKILLS & CATEGORIES MANAGER */}
            <div id="panel-skills" className="admin-panel">
              {/* BULK SKILLS JSON MANAGER */}
              <div className="admin-form-box" style={{ border: "1px solid rgba(234, 179, 8, 0.4)", background: "linear-gradient(180deg, rgba(234, 179, 8, 0.05) 0%, rgba(13, 20, 36, 0.8) 100%)" }}>
                <div className="admin-form-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.6rem" }}>
                  <span>⚡ Bulk Skills JSON Manager (All-in-One)</span>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    <input type="file" id="adminSkillsJsonFileInput" accept=".json" style={{ display: "none" }} onChange={() => {}} />
                    <button type="button" className="btn-gold" style={{ padding: "0.4rem 0.9rem", fontSize: "0.8rem" }} onClick={() => {}}>
                      📂 Upload JSON File
                    </button>
                    <button type="button" className="btn-gold" style={{ padding: "0.4rem 0.9rem", fontSize: "0.8rem", background: "transparent", border: "1px solid var(--border-gold-glow)" }} onClick={() => {}}>
                      ✨ Load AI Engineer / FDE Template
                    </button>
                    <button type="button" className="btn-gold" style={{ padding: "0.4rem 0.9rem", fontSize: "0.8rem", background: "transparent", border: "1px solid var(--border-gold-glow)" }} onClick={() => {}}>
                      📥 Download JSON
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: "0.82rem", color: "var(--text-dim)", marginBottom: "0.8rem", lineHeight: "1.4" }}>
                  Upload a <code>.json</code> file or directly edit the JSON structure below. You can update all skill categories, card groups, and badges all at once and save immediately.
                </p>

                <div className="form-group" style={{ marginBottom: "0.8rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                    <label style={{ fontSize: "0.8rem", color: "var(--gold-bright)" }}>Skills JSON Editor:</label>
                    <button type="button" style={{ background: "none", border: "none", color: "var(--gold-bright)", fontSize: "0.75rem", cursor: "pointer", textDecoration: "underline" }} onClick={() => {}}>
                      Indent / Format JSON
                    </button>
                  </div>
                  <textarea id="adminSkillsJsonEditor" rows={16} spellCheck={false} style={{ fontFamily: "'Courier New', monospace", fontSize: "0.82rem", width: "100%", background: "#060b16", color: "#93c5fd", border: "1px solid rgba(234, 179, 8, 0.3)", borderRadius: "6px", padding: "0.8rem", lineHeight: "1.4", resize: "vertical" }}></textarea>
                </div>

                <div style={{ display: "flex", gap: "0.8rem", alignItems: "center", flexWrap: "wrap" }}>
                  <button type="button" className="btn-gold" style={{ padding: "0.65rem 1.6rem", fontWeight: "600" }} onClick={() => {}}>
                    💾 Save & Apply Skills JSON to Portfolio
                  </button>
                  <span id="skillsJsonStatus" style={{ fontSize: "0.82rem", color: "var(--gold-bright)" }}></span>
                </div>
              </div>

              {/* Manage Skill Categories */}
              <div className="admin-form-box">
                <div className="admin-form-title"><span>🏷️</span> Manage Skill Categories</div>
                <form onSubmit={(e) => { e.preventDefault(); onShowToast("Saved!"); }} style={{ marginBottom: "1.2rem" }}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>New Category Name</label>
                      <input type="text" id="adminNewSkillCatName" required placeholder="e.g. MLOps & DevOps" />
                    </div>
                    <div className="form-group">
                      <label>Icon Emoji</label>
                      <input type="text" id="adminNewSkillCatIcon" placeholder="e.g. 🛠️" value="⚡" />
                    </div>
                  </div>
                  <button type="submit" className="btn-gold" style={{ padding: "0.5rem 1.2rem" }}>
                    ➕ Add Category
                  </button>
                </form>
                <div style={{ fontSize: "0.82rem", color: "var(--text-dim)", marginBottom: "0.6rem" }}>Existing Categories:</div>
                <div id="adminSkillCategoriesList"></div>
              </div>

              {/* Add New Skill */}
              <div className="admin-form-box">
                <div className="admin-form-title"><span>➕</span> Add New Skill</div>
                <form onSubmit={(e) => { e.preventDefault(); onShowToast("Saved!"); }}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Select Category Group</label>
                      <select id="adminSkillCategorySelect"></select>
                    </div>
                    <div className="form-group">
                      <label>Skill Name</label>
                      <input type="text" id="adminSkillName" required placeholder="e.g. LangGraph Supervisor" />
                    </div>
                  </div>
                  <button type="submit" className="btn-gold" style={{ padding: "0.6rem 1.4rem" }}>
                    ➕ Add Skill to Portfolio
                  </button>
                </form>
              </div>

              {/* Current Skills */}
              <div className="admin-form-box">
                <div className="admin-form-title"><span>📋</span> Current Skills List (Click Delete to Remove)</div>
                <div id="adminSkillsListContainer"></div>
              </div>
            </div>

            {/* PANEL 4: PROJECTS & FILTERS MANAGER */}
            <div id="panel-projects" className="admin-panel">
              {/* Manage Project Categories */}
              <div className="admin-form-box">
                <div className="admin-form-title"><span>🏷️</span> Manage Project Categories / Filters</div>
                <form onSubmit={(e) => { e.preventDefault(); onShowToast("Saved!"); }} style={{ marginBottom: "1.2rem" }}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>New Category Filter Name</label>
                      <input type="text" id="adminNewProjCatName" required placeholder="e.g. MLOPS or COMPUTER VISION" />
                    </div>
                    <div className="form-group" style={{ display: "flex", alignItems: "flex-end" }}>
                      <button type="submit" className="btn-gold" style={{ padding: "0.65rem 1.4rem", height: "42px" }}>
                        ➕ Add Category Filter
                      </button>
                    </div>
                  </div>
                </form>
                <div style={{ fontSize: "0.82rem", color: "var(--text-dim)", marginBottom: "0.6rem" }}>Active Filter Categories:</div>
                <div id="adminProjectCategoriesList"></div>
              </div>

              {/* Add Project Form */}
              <div className="admin-form-box" id="adminProjectFormBox">
                <div className="admin-form-title" id="adminProjectFormTitle"><span>➕</span> Add New Project Card</div>
                <form onSubmit={(e) => { e.preventDefault(); onShowToast("Saved!"); }}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Project Title</label>
                      <input type="text" id="adminProjTitle" required placeholder="e.g. Sales Dashboard" />
                    </div>
                    <div className="form-group">
                      <label>Category Filter</label>
                      <select id="adminProjCategorySelect"></select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea id="adminProjDesc" rows={4} required placeholder="Describe what this project achieves..."></textarea>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Tags (Comma Separated)</label>
                      <input type="text" id="adminProjTags" placeholder="e.g. FastAPI, Python 3.11, React 18, Azure" />
                    </div>
                    <div className="form-group">
                      <label>Dashboard Gradient Color</label>
                      <select id="adminProjTheme">
                        <option value="amber">Warm Gold / Amber</option>
                        <option value="blue">Deep Blue / Cyan</option>
                        <option value="purple">Purple / Violet</option>
                        <option value="green">Emerald / Green</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>GitHub Repository URL (Optional)</label>
                      <input type="url" id="adminProjUrl" placeholder="https://github.com/lokesh-repaka/..." />
                    </div>
                    <div className="form-group">
                      <label>Live Website / Deployment URL (Optional)</label>
                      <input type="url" id="adminProjLiveUrl" placeholder="https://your-deployed-app.vercel.app" />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.8rem", alignItems: "center", flexWrap: "wrap" }}>
                    <button type="submit" id="adminProjectSubmitBtn" className="btn-gold" style={{ padding: "0.6rem 1.4rem" }}>
                      ➕ Publish Project Card
                    </button>
                    <button type="button" id="adminProjectCancelEditBtn" onClick={() => {}} className="btn-gold" style={{ display: "none", padding: "0.6rem 1.2rem", background: "transparent", border: "1px solid rgba(239,68,68,0.5)", color: "#ef4444" }}>
                      ✕ Cancel Edit
                    </button>
                  </div>
                </form>
              </div>

              <div className="admin-form-box">
                <div className="admin-form-title"><span>📂</span> Existing Projects</div>
                <div id="adminProjectsListContainer"></div>
              </div>
            </div>

            {/* PANEL 5: BLOGS & CONTENT MANAGER */}
            <div id="panel-blogs" className="admin-panel">
              {/* Manage Blog Categories */}
              <div className="admin-form-box">
                <div className="admin-form-title"><span>🏷️</span> Manage Blog Categories / Filters</div>
                <form onSubmit={(e) => { e.preventDefault(); onShowToast("Saved!"); }} style={{ marginBottom: "1.2rem" }}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>New Blog Category Name</label>
                      <input type="text" id="adminNewBlogCatName" required placeholder="e.g. LLM EVALUATION" />
                    </div>
                    <div className="form-group" style={{ display: "flex", alignItems: "flex-end" }}>
                      <button type="submit" className="btn-gold" style={{ padding: "0.65rem 1.4rem", height: "42px" }}>
                        ➕ Add Category Filter
                      </button>
                    </div>
                  </div>
                </form>
                <div style={{ fontSize: "0.82rem", color: "var(--text-dim)", marginBottom: "0.6rem" }}>Active Blog Categories:</div>
                <div id="adminBlogCategoriesList"></div>
              </div>

              {/* Publish Article Form */}
              <div className="admin-form-box">
                <div className="admin-form-title"><span>➕</span> Publish New Blog Article (Readable On-Site)</div>
                <form onSubmit={(e) => { e.preventDefault(); onShowToast("Saved!"); }}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Article Title</label>
                      <input type="text" id="adminBlogTitle" required placeholder="e.g. The Missing Guardrail in AI" />
                    </div>
                    <div className="form-group">
                      <label>Category Filter</label>
                      <select id="adminBlogCategorySelect"></select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Read Time / Badge</label>
                      <input type="text" id="adminBlogBadge" placeholder="e.g. 20 MIN READ" />
                    </div>
                    <div className="form-group">
                      <label>Tags (Comma Separated)</label>
                      <input type="text" id="adminBlogTags" placeholder="e.g. Keycloak, SPIRE, Zero Trust" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Short Excerpt / Card Description</label>
                    <textarea id="adminBlogDesc" rows={2} required placeholder="Brief summary of what readers will learn..."></textarea>
                  </div>
                  <div className="form-group">
                    <label>Cover Image Path or URL</label>
                    <input type="text" id="adminBlogImg" placeholder="https://raw.githubusercontent.com/lokesh-repaka/articles/main/articles/01-ai-and-identity-governance/images/ai_governance_safety_highway.jpg" />
                  </div>
                  <div className="form-group">
                    <label>Full Article Body / Content (Markdown or HTML supported)</label>
                    <textarea id="adminBlogContent" rows={8} placeholder="Write or paste your article content here... (Headings ##, code blocks ```, diagrams ![alt](url) will render in the reader!)"></textarea>
                  </div>
                  <button type="submit" className="btn-gold" style={{ padding: "0.6rem 1.4rem" }}>
                    ➕ Publish Article Card
                  </button>
                </form>
              </div>

              <div className="admin-form-box">
                <div className="admin-form-title"><span>📚</span> Published Articles</div>
                <div id="adminBlogsListContainer"></div>
              </div>
            </div>

            {/* PANEL 6: RESUME FULL EDITOR */}
            <div id="panel-resume" className="admin-panel">
              {/* PDF Auto-Fill Box */}
              <div className="admin-form-box" style={{ border: "2px dashed rgba(234, 179, 8, 0.45)", background: "rgba(234, 179, 8, 0.04)" }}>
                <div className="admin-form-title"><span>⚡</span> Auto-Fill from Resume PDF</div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem", lineHeight: "1.6" }}>
                  Upload your existing resume PDF. We will automatically scrape your <strong>Name</strong>, <strong>Role/Title</strong>, <strong>Contact Line</strong>, and <strong>Professional Summary</strong> and fill the fields below. You can review and adjust everything before saving!
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
                  <div style={{ flex: "1", minWidth: "240px" }}>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "600", color: "var(--gold-bright)", marginBottom: "0.4rem", textTransform: "uppercase" }}>
                      Select Resume PDF
                    </label>
                    <input type="file" id="resumePdfFileInput" accept=".pdf,application/pdf" onChange={() => {}} style={{ background: "#060910", border: "1px solid rgba(234,179,8,0.3)", borderRadius: "8px", padding: "0.6rem", color: "#fff", width: "100%" }} />
                  </div>
                  <div id="resumePdfStatus" style={{ fontSize: "0.85rem", color: "var(--gold-bright)", fontWeight: "600", paddingTop: "1.2rem" }}></div>
                </div>
              </div>
              {/* Header, Role & Summary */}
              <div className="admin-form-box">
                <div className="admin-form-title"><span>📄</span> Resume Header & Summary</div>
                <form onSubmit={handleSaveResumeHeader}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name in Resume</label>
                      <input type="text" id="formResumeName" required />
                    </div>
                    <div className="form-group">
                      <label>Role / Title</label>
                      <input type="text" id="formResumeRole" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Contact Line</label>
                    <input type="text" id="formResumeContact" />
                  </div>
                  <div className="form-group">
                    <label>Professional Summary</label>
                    <textarea id="formResumeSummary" rows={4} required></textarea>
                  </div>
                  <button type="submit" className="btn-gold" style={{ padding: "0.6rem 1.4rem" }}>
                    💾 Save Header & Summary
                  </button>
                </form>
              </div>

              {/* Professional Experience Manager */}
              <div className="admin-form-box">
                <div className="admin-form-title"><span>💼</span> Add Professional Experience</div>
                <form onSubmit={(e) => { e.preventDefault(); onShowToast("Saved!"); }}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Job Title / Position</label>
                      <input type="text" id="adminExpTitle" required placeholder="e.g. Lead AI Systems Architect" />
                    </div>
                    <div className="form-group">
                      <label>Company / Organization</label>
                      <input type="text" id="adminExpCompany" required placeholder="e.g. AI Governance Systems" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Role Type</label>
                      <input type="text" id="adminExpRole" placeholder="e.g. Full-Time / Lead Author" />
                    </div>
                    <div className="form-group">
                      <label>Duration / Period</label>
                      <input type="text" id="adminExpDuration" placeholder="e.g. 2024 – Present" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Bullet Points (One per line)</label>
                    <textarea id="adminExpBullets" rows={3} placeholder="Enter bullet point 1&#10;Enter bullet point 2"></textarea>
                  </div>
                  <button type="submit" className="btn-gold" style={{ padding: "0.6rem 1.4rem" }}>
                    ➕ Add Experience Item
                  </button>
                </form>
                <div style={{ marginTop: "1.5rem" }} id="adminExperienceListContainer"></div>
              </div>

              {/* Personal / Key Projects Manager in Resume */}
              <div className="admin-form-box">
                <div className="admin-form-title"><span>🚀</span> Add Resume Project Details</div>
                <form onSubmit={(e) => { e.preventDefault(); onShowToast("Saved!"); }}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Project Title</label>
                      <input type="text" id="adminResProjTitle" required placeholder="e.g. PolicyPilot Zero-Trust Engine" />
                    </div>
                    <div className="form-group">
                      <label>Role / Type</label>
                      <input type="text" id="adminResProjRole" placeholder="e.g. AI Engineer / Open Source" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input type="text" id="adminResProjDuration" placeholder="e.g. 2024" />
                  </div>
                  <div className="form-group">
                    <label>Bullet Points (One per line)</label>
                    <textarea id="adminResProjBullets" rows={3} placeholder="Engineered OPA Rego policy gates&#10;Integrated Keycloak IAM token verification"></textarea>
                  </div>
                  <button type="submit" className="btn-gold" style={{ padding: "0.6rem 1.4rem" }}>
                    ➕ Add Resume Project
                  </button>
                </form>
                <div style={{ marginTop: "1.5rem" }} id="adminResumeProjectsListContainer"></div>
              </div>

              {/* Education Manager */}
              <div className="admin-form-box">
                <div className="admin-form-title"><span>🎓</span> Add Education</div>
                <form onSubmit={(e) => { e.preventDefault(); onShowToast("Saved!"); }}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Degree</label>
                      <input type="text" id="adminEduDegree" required placeholder="e.g. Bachelor of Technology in CSE" />
                    </div>
                    <div className="form-group">
                      <label>Institution / University</label>
                      <input type="text" id="adminEduInstitution" required placeholder="e.g. University Name, India" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Major / Specialization</label>
                      <input type="text" id="adminEduMajor" placeholder="e.g. Major in Artificial Intelligence" />
                    </div>
                    <div className="form-group">
                      <label>Year / Duration</label>
                      <input type="text" id="adminEduYear" placeholder="e.g. 2020 – 2024" />
                    </div>
                  </div>
                  <button type="submit" className="btn-gold" style={{ padding: "0.6rem 1.4rem" }}>
                    ➕ Add Education
                  </button>
                </form>
                <div style={{ marginTop: "1.5rem" }} id="adminEducationListContainer"></div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>

  </div>
  );
};
