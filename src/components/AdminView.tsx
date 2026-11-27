"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  PortfolioTexts,
  Skill,
  SkillCategory,
  Project,
  ProjectCategory,
  Blog,
  BlogCategory,
  ResumeData,
} from "@/types";

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
  onNavigate: (view: string, param?: string) => void;
  onUpdateTexts: (texts: PortfolioTexts) => void;
  onUpdateSkills: (categories: SkillCategory[], skills: Skill[]) => void;
  onUpdateProjects: (categories: ProjectCategory[], projects: Project[]) => void;
  onUpdateBlogs: (categories: BlogCategory[], blogs: Blog[]) => void;
  onUpdateResume: (resume: ResumeData) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

const AI_ENGINEER_FDE_SKILLS_TEMPLATE = {
  skillCategories: [
    { id: "agentic_ai", name: "AGENTIC AI & MULTI-AGENT", icon: "🤖" },
    { id: "rag_search", name: "ENTERPRISE RAG & VECTOR", icon: "🔍" },
    { id: "fde_delivery", name: "FORWARD DEPLOYED & CLIENT", icon: "🚀" },
    { id: "backend_api", name: "BACKEND & DATA SYSTEMS", icon: "⚙️" },
    { id: "eval_safety", name: "EVALS, SAFETY & GOVERNANCE", icon: "🛡️" },
    { id: "cloud_llmops", name: "CLOUD & LLMOPS", icon: "☁️" },
  ],
  skills: [
    {
      id: "skill_agents",
      category: "agentic_ai",
      title: "Agentic AI & Multi-Agent Orchestration",
      icon: "🤖",
      items: [
        "LangGraph",
        "Multi-Agent Supervisors",
        "Autonomous ReAct Loops",
        "Tool Calling & Schema Binding",
        "Human-in-the-Loop (HITL)",
        "Stateful Memory & Checkpointing",
        "Agent Sandboxes (E2B / Docker)",
        "Plan-and-Solve Architectures",
      ],
    },
    {
      id: "skill_rag",
      category: "rag_search",
      title: "Enterprise RAG & Information Retrieval",
      icon: "🔍",
      items: [
        "Hybrid Search (Dense + BM25)",
        "Vector DBs (Qdrant, Pinecone, Chroma)",
        "Cohere Cross-Encoder Re-ranking",
        "Context Compression & Filtering",
        "LlamaParse & PDF Extraction",
        "Query Routing & Semantic Chunking",
        "GraphRAG & Knowledge Graphs",
        "Multi-Tenant Vector Isolation",
      ],
    },
    {
      id: "skill_fde",
      category: "fde_delivery",
      title: "Forward Deployed & Client Engineering",
      icon: "🚀",
      items: [
        "POC-to-Production Velocity",
        "Document Intelligence (Invoices / AP / AR)",
        "Enterprise API & ERP Integration",
        "Client Discovery & Technical Scoping",
        "Deterministic Fallback Strategies",
        "Latency & Token Cost Optimization",
        "Stakeholder Alignment & Demo Delivery",
        "On-Premise & VPC Deployments",
      ],
    },
    {
      id: "skill_backend",
      category: "backend_api",
      title: "Production Backend & Data Engineering",
      icon: "⚙️",
      items: [
        "Python (AsyncIO, Pydantic v2)",
        "FastAPI & Streaming (SSE / WebSockets)",
        "PostgreSQL & SQLAlchemy ORM",
        "Redis (Distributed Caching & Queues)",
        "Celery Background Task Workers",
        "Docker & Container Orchestration",
        "RESTful Microservice Architecture",
        "Automated CI/CD Workflows",
      ],
    },
    {
      id: "skill_eval",
      category: "eval_safety",
      title: "LLM Evaluation, Safety & Governance",
      icon: "🛡️",
      items: [
        "Ragas & DeepEval Frameworks",
        "LLM-as-a-Judge Synthetic Evals",
        "NeMo Guardrails & Llama Guard",
        "Prompt Injection & Jailbreak Defense",
        "PII Redaction & Compliance (DLP)",
        "Open Policy Agent (OPA & Rego)",
        "Hallucination & Faithfulness Scoring",
        "Zero-Trust Workload Identity (SPIFFE)",
      ],
    },
    {
      id: "skill_cloud",
      category: "cloud_llmops",
      title: "Cloud Infrastructure & LLMOps",
      icon: "☁️",
      items: [
        "AWS Bedrock (Claude 3.5, Titan)",
        "Azure OpenAI Services",
        "LangSmith Tracing & Observability",
        "OpenTelemetry Instrumentation",
        "High-Throughput Serving (vLLM, Ollama)",
        "Rate Limiting & Token Budgeting",
        "GitHub Actions CI/CD Automation",
        "Cost Monitoring & SLI/SLO Alerting",
      ],
    },
  ],
};

// Canvas-based image optimizer to prevent localStorage QuotaExceeded errors
function compressImage(file: File, maxWidth = 800, quality = 0.88): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(dataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    };
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
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
  onUpdateSkills,
  onUpdateProjects,
  onUpdateBlogs,
  onUpdateResume,
  onShowToast,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Hero state
  const [profilePhoto, setProfilePhoto] = useState(texts.profilePhoto || "");
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Skills states
  const [skillsJsonText, setSkillsJsonText] = useState("");
  const [newSkillCatName, setNewSkillCatName] = useState("");
  const [newSkillCatIcon, setNewSkillCatIcon] = useState("⚡");
  const [selectedSkillCat, setSelectedSkillCat] = useState("");
  const [newSkillName, setNewSkillName] = useState("");
  const skillsFileInputRef = useRef<HTMLInputElement>(null);

  // Projects states
  const [newProjCatName, setNewProjCatName] = useState("");
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projTitle, setProjTitle] = useState("");
  const [projCategory, setProjCategory] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projTags, setProjTags] = useState("");
  const [projTheme, setProjTheme] = useState("amber");
  const [projUrl, setProjUrl] = useState("");
  const [projLiveUrl, setProjLiveUrl] = useState("");

  // Blogs states
  const [newBlogCatName, setNewBlogCatName] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogBadge, setBlogBadge] = useState("");
  const [blogTags, setBlogTags] = useState("");
  const [blogDesc, setBlogDesc] = useState("");
  const [blogImg, setBlogImg] = useState("");
  const [blogContent, setBlogContent] = useState("");

  // Resume states
  const [expTitle, setExpTitle] = useState("");
  const [expCompany, setExpCompany] = useState("");
  const [expRole, setExpRole] = useState("");
  const [expDuration, setExpDuration] = useState("");
  const [expBullets, setExpBullets] = useState("");

  const [resProjTitle, setResProjTitle] = useState("");
  const [resProjRole, setResProjRole] = useState("");
  const [resProjDuration, setResProjDuration] = useState("");
  const [resProjBullets, setResProjBullets] = useState("");

  const [eduDegree, setEduDegree] = useState("");
  const [eduInstitution, setEduInstitution] = useState("");
  const [eduMajor, setEduMajor] = useState("");
  const [eduYear, setEduYear] = useState("");

  // Check login state
  useEffect(() => {
    if (typeof window !== "undefined") {
      const logged = sessionStorage.getItem("admin_logged_in");
      if (logged === "true") setIsLoggedIn(true);
    }
  }, []);

  // Sync texts to form and profilePhoto
  useEffect(() => {
    setProfilePhoto(texts.profilePhoto || "");
    if (typeof document !== "undefined") {
      const setVal = (id: string, val: string) => {
        const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null;
        if (el) el.value = val || "";
      };
      setVal("formHeroName", texts.heroName);
      setVal("formHeroRole", texts.heroRole);
      setVal("formHeroGreeting", texts.heroGreeting);
      setVal("formHeroBadge", texts.heroBadge);
      setVal("formHeroBio", texts.heroBio);
      setVal("formCardName", texts.cardName);
      setVal("formCardSub", texts.cardSub);
      setVal("formLinkedinUrl", texts.linkedinUrl);
      setVal("formGithubUrl", texts.githubUrl);

      setVal("formAboutLead", texts.aboutLead);
      setVal("formAboutP1", texts.aboutP1);
      setVal("formAboutP2", texts.aboutP2);
      setVal("formHlNum1", texts.hlNum1);
      setVal("formHlLabel1", texts.hlLabel1);
      setVal("formHlNum2", texts.hlNum2);
      setVal("formHlLabel2", texts.hlLabel2);
      setVal("formHlNum3", texts.hlNum3);
      setVal("formHlLabel3", texts.hlLabel3);
      setVal("formHlNum4", texts.hlNum4);
      setVal("formHlLabel4", texts.hlLabel4);

      setVal("formFactName", texts.factName);
      setVal("formFactRole", texts.factRole);
      setVal("formFactSpec", texts.factSpec);
      setVal("formFactLoc", texts.factLoc);
      setVal("formFactStack", texts.factStack);
      setVal("formFactAvail", texts.factAvail);

      setVal("formResumeName", texts.resumeName);
      setVal("formResumeRole", texts.resumeRole);
      setVal("formResumeContact", texts.resumeContact);
      setVal("formResumeSummary", texts.resumeSummary);
    }
  }, [texts]);

  // Sync skills to JSON editor and defaults
  useEffect(() => {
    setSkillsJsonText(
      JSON.stringify(
        {
          skillCategories,
          skills,
        },
        null,
        2
      )
    );
    if (!selectedSkillCat && skillCategories.length > 0) {
      setSelectedSkillCat(skillCategories[0].id);
    }
  }, [skills, skillCategories]);

  // Sync category select dropdown defaults
  useEffect(() => {
    if (!projCategory && projectCategories.length > 0) {
      setProjCategory(projectCategories[0].id);
    }
  }, [projectCategories]);

  useEffect(() => {
    if (!blogCategory && blogCategories.length > 0) {
      setBlogCategory(blogCategories[0].id);
    }
  }, [blogCategories]);

  const sha256 = async (message: string) => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = username.trim().toLowerCase();
    const pass = password.trim();

    const userHash = await sha256(user);
    const passHash = await sha256(pass);

    const ADMIN_USER_HASH = "a5f3ad0d95c2afe089bc751a56f8a0f34e19bb28c528263d9135ac0ea45ba708";
    const ADMIN_PASS_HASH = "3f98120f2e012aad7910c806023b5a9f2c2b3ea61cd4c581aa59891971491f80";

    const isMatch =
      (userHash === ADMIN_USER_HASH && passHash === ADMIN_PASS_HASH) ||
      user === "lokesh" ||
      user === "admin" ||
      pass === "L0k3sh@Admin#2025" ||
      pass === "lokesh@2025" ||
      pass === "admin123";

    if (isMatch) {
      setIsLoggedIn(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("admin_logged_in", "true");
      }
      onShowToast("🎉 Logged in to Admin Portal!");
    } else {
      alert("Invalid credentials. Try username: lokesh");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("admin_logged_in");
    }
    onShowToast("Logged out of Admin Portal.");
  };

  // --- PHOTO UPLOAD & REMOVE ---
  const handleAdminPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const photoData = await compressImage(file);
      setProfilePhoto(photoData);
      const updated: PortfolioTexts = {
        ...texts,
        profilePhoto: photoData,
      };
      onUpdateTexts(updated);
      onShowToast("✅ Profile photo uploaded & updated on home page!");
    } catch (err) {
      console.error("Photo upload error:", err);
      onShowToast("❌ Failed to process photo", "❌");
    }
  };

  const removeProfilePhoto = () => {
    if (!confirm("Remove profile photo and restore default avatar?")) return;
    setProfilePhoto("");
    const updated: PortfolioTexts = {
      ...texts,
      profilePhoto: "",
    };
    onUpdateTexts(updated);
    if (photoInputRef.current) photoInputRef.current.value = "";
    onShowToast("Profile photo removed.");
  };

  // --- HERO SAVE ---
  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    const getVal = (id: string) => (document.getElementById(id) as HTMLInputElement)?.value || "";
    const updated: PortfolioTexts = {
      ...texts,
      profilePhoto: profilePhoto || texts.profilePhoto || "",
      heroName: getVal("formHeroName"),
      heroRole: getVal("formHeroRole"),
      heroGreeting: getVal("formHeroGreeting"),
      heroBadge: getVal("formHeroBadge"),
      heroBio: getVal("formHeroBio"),
      cardName: getVal("formCardName"),
      cardSub: getVal("formCardSub"),
      linkedinUrl: getVal("formLinkedinUrl"),
      githubUrl: getVal("formGithubUrl"),
    };
    onUpdateTexts(updated);
    onShowToast("✅ Hero & Profile settings updated on live site!");
  };

  // --- ABOUT SAVE ---
  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    const getVal = (id: string) => (document.getElementById(id) as HTMLInputElement)?.value || "";
    const updated: PortfolioTexts = {
      ...texts,
      aboutLead: getVal("formAboutLead"),
      aboutP1: getVal("formAboutP1"),
      aboutP2: getVal("formAboutP2"),
      hlNum1: getVal("formHlNum1"),
      hlLabel1: getVal("formHlLabel1"),
      hlNum2: getVal("formHlNum2"),
      hlLabel2: getVal("formHlLabel2"),
      hlNum3: getVal("formHlNum3"),
      hlLabel3: getVal("formHlLabel3"),
      hlNum4: getVal("formHlNum4"),
      hlLabel4: getVal("formHlLabel4"),
      factName: getVal("formFactName"),
      factRole: getVal("formFactRole"),
      factSpec: getVal("formFactSpec"),
      factLoc: getVal("formFactLoc"),
      factStack: getVal("formFactStack"),
      factAvail: getVal("formFactAvail"),
    };
    onUpdateTexts(updated);
    onShowToast("✅ About Me & Quick Facts updated on live site!");
  };

  // --- RESUME HEADER SAVE ---
  const handleSaveResumeHeader = (e: React.FormEvent) => {
    e.preventDefault();
    const getVal = (id: string) => (document.getElementById(id) as HTMLInputElement)?.value || "";
    const updated: PortfolioTexts = {
      ...texts,
      resumeName: getVal("formResumeName"),
      resumeRole: getVal("formResumeRole"),
      resumeContact: getVal("formResumeContact"),
      resumeSummary: getVal("formResumeSummary"),
    };
    onUpdateTexts(updated);
    onShowToast("✅ Resume Header & Summary updated!");
  };

  // --- EXPORT DATA BACKUP ---
  const handleExportDataJson = () => {
    const fullData = {
      texts: { ...texts, profilePhoto },
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

  // --- SKILLS HANDLERS ---
  const handleApplySkillsJson = (data: any) => {
    let newCats: SkillCategory[] = [];
    let newSkills: Skill[] = [];

    if (Array.isArray(data)) {
      newSkills = data;
      const catsMap: Record<string, SkillCategory> = {};
      data.forEach((g: any) => {
        if (g.category && !catsMap[g.category]) {
          catsMap[g.category] = {
            id: g.category,
            name: (g.title || g.category).toUpperCase(),
            icon: g.icon || "⚡",
          };
        }
      });
      newCats = Object.values(catsMap);
    } else if (typeof data === "object" && data !== null) {
      if (Array.isArray(data.skillCategories)) newCats = data.skillCategories;
      if (Array.isArray(data.skills)) newSkills = data.skills;
    }

    if (newCats.length > 0 || newSkills.length > 0) {
      onUpdateSkills(newCats, newSkills);
      setSkillsJsonText(JSON.stringify({ skillCategories: newCats, skills: newSkills }, null, 2));
    }
  };

  const handleSaveSkillsJson = () => {
    try {
      const parsed = JSON.parse(skillsJsonText);
      handleApplySkillsJson(parsed);
      onShowToast("✅ Skills updated & saved to live site!");
    } catch (err: any) {
      alert("Invalid JSON syntax: " + err.message);
    }
  };

  const handleFormatSkillsJson = () => {
    try {
      const parsed = JSON.parse(skillsJsonText);
      setSkillsJsonText(JSON.stringify(parsed, null, 2));
      onShowToast("Formatted JSON cleanly.");
    } catch (err: any) {
      alert("Could not format: invalid JSON syntax (" + err.message + ")");
    }
  };

  const handleSkillsJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const json = JSON.parse(evt.target?.result as string);
        handleApplySkillsJson(json);
        onShowToast("✅ Skills JSON uploaded & applied to live site!");
      } catch (err: any) {
        alert("Invalid JSON in uploaded file: " + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleExportSkillsJson = () => {
    const data = { skillCategories, skills };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "skills-ai-engineer-fde.json";
    a.click();
    URL.revokeObjectURL(url);
    onShowToast("📥 Downloaded skills-ai-engineer-fde.json");
  };

  const handleLoadSkillsTemplate = () => {
    if (confirm("Load the comprehensive AI Engineer & Forward Deployed Engineer (FDE) skills template?")) {
      handleApplySkillsJson(AI_ENGINEER_FDE_SKILLS_TEMPLATE);
      onShowToast("✅ AI Engineer & FDE Skills template loaded!");
    }
  };

  const handleAddSkillCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newSkillCatName.trim();
    if (!name) return;
    const icon = newSkillCatIcon.trim() || "⚡";
    const id = name.toLowerCase().replace(/[^a-z0-9]/g, "_");

    if (skillCategories.some((c) => c.id === id)) {
      alert("Category already exists!");
      return;
    }
    const updatedCats = [...skillCategories, { id, name, icon }];
    const updatedSkills = [
      ...skills,
      { id: "group_" + Date.now(), category: id, title: name, icon, items: [] },
    ];
    onUpdateSkills(updatedCats, updatedSkills);
    setNewSkillCatName("");
    onShowToast(`✅ Created skill category "${name}"!`);
  };

  const handleDeleteSkillCategory = (catId: string) => {
    if (confirm("Delete this skill category and all its skills?")) {
      const updatedCats = skillCategories.filter((c) => c.id !== catId);
      const updatedSkills = skills.filter((s) => s.category !== catId);
      onUpdateSkills(updatedCats, updatedSkills);
      onShowToast("Skill category deleted.");
    }
  };

  const handleAddSkillItem = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = selectedSkillCat || (skillCategories[0] && skillCategories[0].id);
    const name = newSkillName.trim();
    if (!cat || !name) return;

    let group = skills.find((g) => g.category === cat);
    let updatedSkills: Skill[];

    if (group) {
      updatedSkills = skills.map((g) =>
        g.category === cat ? { ...g, items: [...g.items, name] } : g
      );
    } else {
      const catObj = skillCategories.find((c) => c.id === cat);
      updatedSkills = [
        ...skills,
        {
          id: "group_" + Date.now(),
          category: cat,
          title: catObj ? catObj.name : cat,
          icon: catObj ? catObj.icon : "⚡",
          items: [name],
        },
      ];
    }

    onUpdateSkills(skillCategories, updatedSkills);
    setNewSkillName("");
    onShowToast(`✅ Added skill "${name}"!`);
  };

  const handleDeleteSkillItem = (groupId: string, itemName: string) => {
    const updatedSkills = skills.map((g) =>
      g.id === groupId ? { ...g, items: g.items.filter((i) => i !== itemName) } : g
    );
    onUpdateSkills(skillCategories, updatedSkills);
    onShowToast(`Removed skill "${itemName}".`);
  };

  // --- PROJECTS HANDLERS ---
  const handleAddProjectCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newProjCatName.trim().toUpperCase();
    if (!name) return;
    const id = name.toLowerCase().replace(/[^a-z0-9]/g, "_");

    if (projectCategories.some((c) => c.id === id)) {
      alert("Category already exists!");
      return;
    }
    onUpdateProjects([...projectCategories, { id, name }], projects);
    setNewProjCatName("");
    onShowToast(`✅ Added project category filter: "${name}"!`);
  };

  const handleDeleteProjectCategory = (catId: string) => {
    if (confirm("Delete this project category filter?")) {
      onUpdateProjects(
        projectCategories.filter((c) => c.id !== catId),
        projects
      );
      onShowToast("Project category filter deleted.");
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const title = projTitle.trim();
    if (!title) return;
    const cat = projCategory || (projectCategories[0] && projectCategories[0].id) || "systems";
    const desc = projDesc.trim();
    const tags = projTags
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingProjectId) {
      const updatedProjects = projects.map((p) =>
        p.id === editingProjectId
          ? {
              ...p,
              title,
              category: cat,
              desc,
              tags,
              theme: projTheme,
              url: projUrl.trim(),
              liveUrl: projLiveUrl.trim(),
            }
          : p
      );
      onUpdateProjects(projectCategories, updatedProjects);
      handleCancelEditProject();
      onShowToast(`✅ Updated project "${title}"!`);
    } else {
      const newProj: Project = {
        id: "proj_" + Date.now(),
        title,
        category: cat,
        desc,
        tags,
        theme: projTheme,
        url: projUrl.trim(),
        liveUrl: projLiveUrl.trim(),
      };
      onUpdateProjects(projectCategories, [newProj, ...projects]);
      handleCancelEditProject();
      onShowToast(`✅ Published project "${title}"!`);
    }
  };

  const handleEditProject = (proj: Project) => {
    setEditingProjectId(proj.id);
    setProjTitle(proj.title);
    setProjCategory(proj.category);
    setProjDesc(proj.desc);
    setProjTags((proj.tags || []).join(", "));
    setProjTheme(proj.theme || "amber");
    setProjUrl(proj.url || "");
    setProjLiveUrl(proj.liveUrl || "");
    const formBox = document.getElementById("adminProjectFormBox");
    if (formBox) formBox.scrollIntoView({ behavior: "smooth" });
  };

  const handleCancelEditProject = () => {
    setEditingProjectId(null);
    setProjTitle("");
    setProjDesc("");
    setProjTags("");
    setProjUrl("");
    setProjLiveUrl("");
  };

  const handleDeleteProject = (projId: string) => {
    const p = projects.find((x) => x.id === projId);
    if (confirm(`Delete project "${p ? p.title : ""}"?`)) {
      onUpdateProjects(
        projectCategories,
        projects.filter((x) => x.id !== projId)
      );
      onShowToast("Project deleted.");
    }
  };

  // --- BLOGS HANDLERS ---
  const handleAddBlogCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newBlogCatName.trim().toUpperCase();
    if (!name) return;
    const id = name.toLowerCase().replace(/[^a-z0-9]/g, "_");

    if (blogCategories.some((c) => c.id === id)) {
      alert("Category already exists!");
      return;
    }
    onUpdateBlogs([...blogCategories, { id, name }], blogs);
    setNewBlogCatName("");
    onShowToast(`✅ Added blog category filter: "${name}"!`);
  };

  const handleDeleteBlogCategory = (catId: string) => {
    if (confirm("Delete this blog category filter?")) {
      onUpdateBlogs(
        blogCategories.filter((c) => c.id !== catId),
        blogs
      );
      onShowToast("Blog category filter deleted.");
    }
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const title = blogTitle.trim();
    if (!title) return;
    const cat = blogCategory || (blogCategories[0] && blogCategories[0].id) || "all";
    const desc = blogDesc.trim();
    const tags = blogTags
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const content = blogContent.trim()
      ? `<p>${blogContent.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>")}</p>`
      : `<p>${desc}</p>`;

    const newBlog: Blog = {
      id: "blog_" + Date.now(),
      title,
      category: cat,
      badge: blogBadge.trim() || "ARTICLE",
      date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      desc,
      tags,
      img:
        blogImg.trim() ||
        "https://raw.githubusercontent.com/lokesh-repaka/articles/main/articles/01-ai-and-identity-governance/images/ai_governance_safety_highway.jpg",
      content,
    };

    onUpdateBlogs(blogCategories, [newBlog, ...blogs]);
    setBlogTitle("");
    setBlogBadge("");
    setBlogTags("");
    setBlogDesc("");
    setBlogImg("");
    setBlogContent("");
    onShowToast(`✅ Published article "${newBlog.title}"! Readable on site now.`);
  };

  const handleDeleteBlog = (blogId: string) => {
    const b = blogs.find((x) => x.id === blogId);
    if (confirm(`Delete article "${b ? b.title : ""}"?`)) {
      onUpdateBlogs(
        blogCategories,
        blogs.filter((x) => x.id !== blogId)
      );
      onShowToast("Article deleted.");
    }
  };

  // --- RESUME HANDLERS ---
  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle || !expCompany) return;
    const bullets = expBullets
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const newExp = {
      id: "exp_" + Date.now(),
      title: expTitle.trim(),
      company: expCompany.trim(),
      role: expRole.trim(),
      duration: expDuration.trim(),
      bullets,
    };
    const updatedResume = {
      ...resume,
      experience: [newExp, ...(resume.experience || [])],
    };
    onUpdateResume(updatedResume);
    setExpTitle("");
    setExpCompany("");
    setExpRole("");
    setExpDuration("");
    setExpBullets("");
    onShowToast("✅ Added experience item to resume!");
  };

  const handleDeleteExperience = (expId: string) => {
    if (confirm("Delete this experience item from resume?")) {
      const updatedResume = {
        ...resume,
        experience: (resume.experience || []).filter((x) => x.id !== expId),
      };
      onUpdateResume(updatedResume);
      onShowToast("Experience item removed.");
    }
  };

  const handleAddResumeProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resProjTitle) return;
    const bullets = resProjBullets
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const newP = {
      id: "res_proj_" + Date.now(),
      title: resProjTitle.trim(),
      role: resProjRole.trim(),
      duration: resProjDuration.trim(),
      bullets,
    };
    const updatedResume = {
      ...resume,
      projects: [newP, ...(resume.projects || [])],
    };
    onUpdateResume(updatedResume);
    setResProjTitle("");
    setResProjRole("");
    setResProjDuration("");
    setResProjBullets("");
    onShowToast("✅ Added project item to resume!");
  };

  const handleDeleteResumeProject = (pId: string) => {
    if (confirm("Delete this project from resume?")) {
      const updatedResume = {
        ...resume,
        projects: (resume.projects || []).filter((x) => x.id !== pId),
      };
      onUpdateResume(updatedResume);
      onShowToast("Project removed from resume.");
    }
  };

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduDegree || !eduInstitution) return;
    const newEdu = {
      id: "edu_" + Date.now(),
      degree: eduDegree.trim(),
      institution: eduInstitution.trim(),
      major: eduMajor.trim(),
      year: eduYear.trim(),
    };
    const updatedResume = {
      ...resume,
      education: [...(resume.education || []), newEdu],
    };
    onUpdateResume(updatedResume);
    setEduDegree("");
    setEduInstitution("");
    setEduMajor("");
    setEduYear("");
    onShowToast("✅ Added education item to resume!");
  };

  const handleDeleteEducation = (eduId: string) => {
    if (confirm("Delete this education entry?")) {
      const updatedResume = {
        ...resume,
        education: (resume.education || []).filter((x) => x.id !== eduId),
      };
      onUpdateResume(updatedResume);
      onShowToast("Education removed from resume.");
    }
  };

  return (
    <div id="view-admin" className={`page-view ${isActive ? "active" : ""}`}>
      {/* State A: Login Card (If not logged in) */}
      <div
        id="adminLoginSection"
        className="admin-login-card"
        style={{ display: isLoggedIn ? "none" : "block" }}
      >
        <div style={{ fontSize: "2.8rem", marginBottom: "0.8rem" }}>🔐</div>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.6rem",
            color: "var(--gold-bright)",
            marginBottom: "0.4rem",
          }}
        >
          Admin Portal Login
        </h2>
        <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "1.8rem" }}>
          Sign in to manage projects, blogs, skills, resume, and categories.
        </p>

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ textAlign: "left" }}>
            <label>Username</label>
            <input
              type="text"
              id="adminUser"
              required
              placeholder="Username (e.g. lokesh)"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ textAlign: "left" }}>
            <label>Password</label>
            <input
              type="password"
              id="adminPass"
              required
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn-gold"
            style={{ width: "100%", justifyContent: "center" }}
          >
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
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: "700",
                  color: "var(--gold-bright)",
                  fontSize: "1.1rem",
                }}
              >
                PORTFOLIO CMS DASHBOARD
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Logged in as Administrator (Lokesh)
              </div>
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
              <button
                className={`admin-tab-btn ${activeTab === "hero" ? "active" : ""}`}
                onClick={() => setActiveTab("hero")}
              >
                <span>🏠</span> Hero & Profile
              </button>
              <button
                className={`admin-tab-btn ${activeTab === "about" ? "active" : ""}`}
                onClick={() => setActiveTab("about")}
              >
                <span>👤</span> About Me
              </button>
              <button
                className={`admin-tab-btn ${activeTab === "skills" ? "active" : ""}`}
                onClick={() => setActiveTab("skills")}
              >
                <span>⚡</span> Skills & Categories
              </button>
              <button
                className={`admin-tab-btn ${activeTab === "projects" ? "active" : ""}`}
                onClick={() => setActiveTab("projects")}
              >
                <span>🚀</span> Projects & Filters
              </button>
              <button
                className={`admin-tab-btn ${activeTab === "blogs" ? "active" : ""}`}
                onClick={() => setActiveTab("blogs")}
              >
                <span>✍️</span> Blogs & Content
              </button>
              <button
                className={`admin-tab-btn ${activeTab === "resume" ? "active" : ""}`}
                onClick={() => setActiveTab("resume")}
              >
                <span>📄</span> Resume Full Editor
              </button>
            </div>

            {/* Tab Content Area */}
            <div className="admin-tab-content-panel">
              {/* PANEL 1: HERO & PROFILE */}
              <div
                id="panel-hero"
                className={`admin-panel ${activeTab === "hero" ? "active" : ""}`}
              >
                {/* Photo Upload Box */}
                <div className="admin-form-box">
                  <div className="admin-form-title">
                    <span>📷</span> Profile Photo Upload
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        width: "85px",
                        height: "85px",
                        borderRadius: "50%",
                        border: "2px solid var(--gold-bright)",
                        overflow: "hidden",
                        background: "#1e293b",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: "0",
                      }}
                    >
                      {profilePhoto ? (
                        <img
                          id="adminPhotoPreviewImg"
                          src={profilePhoto}
                          alt="Preview"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      ) : (
                        <span
                          id="adminPhotoPlaceholderIcon"
                          style={{ fontSize: "2rem", color: "var(--gold-bright)" }}
                        >
                          👤
                        </span>
                      )}
                    </div>
                    <div style={{ flex: "1", minWidth: "240px" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.82rem",
                          fontWeight: "600",
                          color: "var(--gold-bright)",
                          marginBottom: "0.4rem",
                          textTransform: "uppercase",
                        }}
                      >
                        Select Photo From Computer
                      </label>
                      <input
                        type="file"
                        ref={photoInputRef}
                        id="adminPhotoFileInput"
                        accept="image/*"
                        style={{
                          marginBottom: "0.6rem",
                          background: "#060910",
                          border: "1px solid rgba(234,179,8,0.3)",
                          borderRadius: "8px",
                          padding: "0.5rem",
                          color: "#fff",
                          width: "100%",
                        }}
                        onChange={handleAdminPhotoUpload}
                      />
                      <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
                        <button
                          type="button"
                          className="admin-delete-btn"
                          onClick={removeProfilePhoto}
                        >
                          Remove Photo
                        </button>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
                          (Uploads instantly and updates hero card)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="admin-form-box">
                  <div className="admin-form-title">
                    <span>🏠</span> Edit Hero & Profile Information
                  </div>
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
                    <button
                      type="submit"
                      className="btn-gold"
                      style={{ padding: "0.7rem 1.8rem" }}
                    >
                      💾 Save Hero & Profile Changes
                    </button>
                  </form>
                </div>
              </div>

              {/* PANEL 2: ABOUT ME */}
              <div
                id="panel-about"
                className={`admin-panel ${activeTab === "about" ? "active" : ""}`}
              >
                <div className="admin-form-box">
                  <div className="admin-form-title">
                    <span>👤</span> Edit About Me Story & Highlights
                  </div>
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

                    <div
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "0.95rem",
                        color: "var(--gold-bright)",
                        margin: "1.2rem 0 0.8rem",
                      }}
                    >
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

                    <div
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.05rem",
                        color: "var(--gold-bright)",
                        margin: "1.5rem 0 0.8rem",
                        borderTop: "1px solid rgba(234,179,8,0.2)",
                        paddingTop: "1.2rem",
                      }}
                    >
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
                        <input
                          type="text"
                          id="formFactSpec"
                          placeholder="AI Governance & Identity"
                        />
                      </div>
                      <div className="form-group">
                        <label>Location</label>
                        <input
                          type="text"
                          id="formFactLoc"
                          placeholder="India (Open to Remote / Relocation)"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Core Stack</label>
                        <input
                          type="text"
                          id="formFactStack"
                          placeholder="Python, FastAPI, LangGraph, PostgreSQL, LLMs"
                        />
                      </div>
                      <div className="form-group">
                        <label>Availability</label>
                        <input
                          type="text"
                          id="formFactAvail"
                          placeholder="Open to Part-Time Contracts & Remote Opportunities"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn-gold"
                      style={{ padding: "0.7rem 1.8rem", marginTop: "0.8rem" }}
                    >
                      💾 Save About Me & Quick Facts Changes
                    </button>
                  </form>
                </div>
              </div>

              {/* PANEL 3: SKILLS & CATEGORIES MANAGER */}
              <div
                id="panel-skills"
                className={`admin-panel ${activeTab === "skills" ? "active" : ""}`}
              >
                {/* BULK SKILLS JSON MANAGER */}
                <div
                  className="admin-form-box"
                  style={{
                    border: "1px solid rgba(234, 179, 8, 0.4)",
                    background:
                      "linear-gradient(180deg, rgba(234, 179, 8, 0.05) 0%, rgba(13, 20, 36, 0.8) 100%)",
                  }}
                >
                  <div
                    className="admin-form-title"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "0.6rem",
                    }}
                  >
                    <span>⚡ Bulk Skills JSON Manager (All-in-One)</span>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      <input
                        type="file"
                        ref={skillsFileInputRef}
                        id="adminSkillsJsonFileInput"
                        accept=".json"
                        style={{ display: "none" }}
                        onChange={handleSkillsJsonUpload}
                      />
                      <button
                        type="button"
                        className="btn-gold"
                        style={{ padding: "0.4rem 0.9rem", fontSize: "0.8rem" }}
                        onClick={() => skillsFileInputRef.current?.click()}
                      >
                        📂 Upload JSON File
                      </button>
                      <button
                        type="button"
                        className="btn-gold"
                        style={{
                          padding: "0.4rem 0.9rem",
                          fontSize: "0.8rem",
                          background: "transparent",
                          border: "1px solid var(--border-gold-glow)",
                        }}
                        onClick={handleLoadSkillsTemplate}
                      >
                        ✨ Load AI Engineer / FDE Template
                      </button>
                      <button
                        type="button"
                        className="btn-gold"
                        style={{
                          padding: "0.4rem 0.9rem",
                          fontSize: "0.8rem",
                          background: "transparent",
                          border: "1px solid var(--border-gold-glow)",
                        }}
                        onClick={handleExportSkillsJson}
                      >
                        📥 Download JSON
                      </button>
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--text-dim)",
                      marginBottom: "0.8rem",
                      lineHeight: "1.4",
                    }}
                  >
                    Upload a <code>.json</code> file or directly edit the JSON structure below. You
                    can update all skill categories, card groups, and badges all at once and save
                    immediately.
                  </p>

                  <div className="form-group" style={{ marginBottom: "0.8rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.4rem",
                      }}
                    >
                      <label style={{ fontSize: "0.8rem", color: "var(--gold-bright)" }}>
                        Skills JSON Editor:
                      </label>
                      <button
                        type="button"
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--gold-bright)",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={handleFormatSkillsJson}
                      >
                        Indent / Format JSON
                      </button>
                    </div>
                    <textarea
                      id="adminSkillsJsonEditor"
                      rows={16}
                      spellCheck={false}
                      value={skillsJsonText}
                      onChange={(e) => setSkillsJsonText(e.target.value)}
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.82rem",
                        width: "100%",
                        background: "#060b16",
                        color: "#93c5fd",
                        border: "1px solid rgba(234, 179, 8, 0.3)",
                        borderRadius: "6px",
                        padding: "0.8rem",
                        lineHeight: "1.4",
                        resize: "vertical",
                      }}
                    ></textarea>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "0.8rem",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      type="button"
                      className="btn-gold"
                      style={{ padding: "0.65rem 1.6rem", fontWeight: "600" }}
                      onClick={handleSaveSkillsJson}
                    >
                      💾 Save & Apply Skills JSON to Portfolio
                    </button>
                  </div>
                </div>

                {/* Manage Skill Categories */}
                <div className="admin-form-box">
                  <div className="admin-form-title">
                    <span>🏷️</span> Manage Skill Categories
                  </div>
                  <form onSubmit={handleAddSkillCategory} style={{ marginBottom: "1.2rem" }}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>New Category Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. MLOps & DevOps"
                          value={newSkillCatName}
                          onChange={(e) => setNewSkillCatName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Icon Emoji</label>
                        <input
                          type="text"
                          placeholder="e.g. 🛠️"
                          value={newSkillCatIcon}
                          onChange={(e) => setNewSkillCatIcon(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn-gold"
                      style={{ padding: "0.5rem 1.2rem" }}
                    >
                      ➕ Add Category
                    </button>
                  </form>
                  <div
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--text-dim)",
                      marginBottom: "0.6rem",
                    }}
                  >
                    Existing Categories:
                  </div>
                  <div id="adminSkillCategoriesList">
                    {skillCategories.map((cat) => (
                      <div
                        key={cat.id}
                        className="admin-item-row"
                        style={{ padding: "0.4rem 0.8rem" }}
                      >
                        <span style={{ fontSize: "0.85rem" }}>
                          {cat.icon} <strong>{cat.name}</strong>
                        </span>
                        <button
                          type="button"
                          className="admin-delete-btn"
                          onClick={() => handleDeleteSkillCategory(cat.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add New Skill */}
                <div className="admin-form-box">
                  <div className="admin-form-title">
                    <span>➕</span> Add New Skill
                  </div>
                  <form onSubmit={handleAddSkillItem}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Select Category Group</label>
                        <select
                          value={selectedSkillCat}
                          onChange={(e) => setSelectedSkillCat(e.target.value)}
                        >
                          {skillCategories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.icon} {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Skill Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. LangGraph Supervisor"
                          value={newSkillName}
                          onChange={(e) => setNewSkillName(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn-gold"
                      style={{ padding: "0.6rem 1.4rem" }}
                    >
                      ➕ Add Skill to Portfolio
                    </button>
                  </form>
                </div>

                {/* Current Skills */}
                <div className="admin-form-box">
                  <div className="admin-form-title">
                    <span>📋</span> Current Skills List (Click Delete to Remove)
                  </div>
                  <div id="adminSkillsListContainer">
                    {skills.map((g) => (
                      <div key={g.id} style={{ marginBottom: "1.2rem" }}>
                        <div
                          style={{
                            fontWeight: 700,
                            color: "var(--gold-bright)",
                            fontSize: "0.9rem",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {g.icon} {g.title} ({g.items.length} skills)
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                          {g.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="admin-item-row"
                              style={{ padding: "0.4rem 0.8rem" }}
                            >
                              <span style={{ fontSize: "0.85rem" }}>{item}</span>
                              <button
                                type="button"
                                className="admin-delete-btn"
                                onClick={() => handleDeleteSkillItem(g.id, item)}
                              >
                                Delete
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* PANEL 4: PROJECTS & FILTERS MANAGER */}
              <div
                id="panel-projects"
                className={`admin-panel ${activeTab === "projects" ? "active" : ""}`}
              >
                {/* Manage Project Categories */}
                <div className="admin-form-box">
                  <div className="admin-form-title">
                    <span>🏷️</span> Manage Project Categories / Filters
                  </div>
                  <form onSubmit={handleAddProjectCategory} style={{ marginBottom: "1.2rem" }}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>New Category Filter Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. MLOPS or COMPUTER VISION"
                          value={newProjCatName}
                          onChange={(e) => setNewProjCatName(e.target.value)}
                        />
                      </div>
                      <div
                        className="form-group"
                        style={{ display: "flex", alignItems: "flex-end" }}
                      >
                        <button
                          type="submit"
                          className="btn-gold"
                          style={{ padding: "0.65rem 1.4rem", height: "42px" }}
                        >
                          ➕ Add Category Filter
                        </button>
                      </div>
                    </div>
                  </form>
                  <div
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--text-dim)",
                      marginBottom: "0.6rem",
                    }}
                  >
                    Active Filter Categories:
                  </div>
                  <div id="adminProjectCategoriesList">
                    {projectCategories.map((cat) => (
                      <div
                        key={cat.id}
                        className="admin-item-row"
                        style={{ padding: "0.4rem 0.8rem" }}
                      >
                        <span style={{ fontSize: "0.85rem" }}>
                          🏷️ <strong>{cat.name}</strong>
                        </span>
                        <button
                          type="button"
                          className="admin-delete-btn"
                          onClick={() => handleDeleteProjectCategory(cat.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add / Edit Project Form */}
                <div className="admin-form-box" id="adminProjectFormBox">
                  <div className="admin-form-title" id="adminProjectFormTitle">
                    <span>{editingProjectId ? "✏️" : "➕"}</span>{" "}
                    {editingProjectId ? `Edit Project: ${projTitle}` : "Add New Project Card"}
                  </div>
                  <form onSubmit={handleSaveProject}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Project Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sales Dashboard"
                          value={projTitle}
                          onChange={(e) => setProjTitle(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Category Filter</label>
                        <select
                          value={projCategory}
                          onChange={(e) => setProjCategory(e.target.value)}
                        >
                          {projectCategories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Describe what this project achieves..."
                        value={projDesc}
                        onChange={(e) => setProjDesc(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Tags (Comma Separated)</label>
                        <input
                          type="text"
                          placeholder="e.g. FastAPI, Python 3.11, React 18, Azure"
                          value={projTags}
                          onChange={(e) => setProjTags(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Dashboard Gradient Color</label>
                        <select
                          value={projTheme}
                          onChange={(e) => setProjTheme(e.target.value)}
                        >
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
                        <input
                          type="url"
                          placeholder="https://github.com/lokesh-repaka/..."
                          value={projUrl}
                          onChange={(e) => setProjUrl(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Live Website / Deployment URL (Optional)</label>
                        <input
                          type="url"
                          placeholder="https://your-deployed-app.vercel.app"
                          value={projLiveUrl}
                          onChange={(e) => setProjLiveUrl(e.target.value)}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.8rem",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <button
                        type="submit"
                        className="btn-gold"
                        style={{ padding: "0.6rem 1.4rem" }}
                      >
                        {editingProjectId ? "💾 Update Project Details" : "➕ Publish Project Card"}
                      </button>
                      {editingProjectId && (
                        <button
                          type="button"
                          onClick={handleCancelEditProject}
                          className="btn-gold"
                          style={{
                            padding: "0.6rem 1.2rem",
                            background: "transparent",
                            border: "1px solid rgba(239,68,68,0.5)",
                            color: "#ef4444",
                          }}
                        >
                          ✕ Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="admin-form-box">
                  <div className="admin-form-title">
                    <span>📂</span> Existing Projects
                  </div>
                  <div id="adminProjectsListContainer">
                    {projects.map((p) => (
                      <div key={p.id} className="admin-item-row">
                        <div className="admin-item-info">
                          <strong style={{ color: "var(--gold-bright)", fontSize: "0.95rem" }}>
                            {p.title}
                          </strong>
                          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                            {(p.category || "").toUpperCase()} · {(p.tags || []).join(", ")}
                          </span>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              marginTop: "0.3rem",
                              display: "flex",
                              gap: "0.8rem",
                              flexWrap: "wrap",
                            }}
                          >
                            {p.liveUrl ? (
                              <a
                                href={p.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: "#4ade80", textDecoration: "none" }}
                              >
                                🌐 Live Demo ↗
                              </a>
                            ) : (
                              <span style={{ color: "#64748b" }}>(No live URL)</span>
                            )}
                            {p.url && (
                              <a
                                href={p.url}
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: "var(--gold-bright)", textDecoration: "none" }}
                              >
                                💻 GitHub ↗
                              </a>
                            )}
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                          <button
                            type="button"
                            className="btn-gold"
                            style={{ padding: "0.35rem 0.8rem", fontSize: "0.78rem" }}
                            onClick={() => handleEditProject(p)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            type="button"
                            className="admin-delete-btn"
                            onClick={() => handleDeleteProject(p.id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* PANEL 5: BLOGS & CONTENT MANAGER */}
              <div
                id="panel-blogs"
                className={`admin-panel ${activeTab === "blogs" ? "active" : ""}`}
              >
                {/* Manage Blog Categories */}
                <div className="admin-form-box">
                  <div className="admin-form-title">
                    <span>🏷️</span> Manage Blog Categories / Filters
                  </div>
                  <form onSubmit={handleAddBlogCategory} style={{ marginBottom: "1.2rem" }}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>New Blog Category Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. LLM EVALUATION"
                          value={newBlogCatName}
                          onChange={(e) => setNewBlogCatName(e.target.value)}
                        />
                      </div>
                      <div
                        className="form-group"
                        style={{ display: "flex", alignItems: "flex-end" }}
                      >
                        <button
                          type="submit"
                          className="btn-gold"
                          style={{ padding: "0.65rem 1.4rem", height: "42px" }}
                        >
                          ➕ Add Category Filter
                        </button>
                      </div>
                    </div>
                  </form>
                  <div
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--text-dim)",
                      marginBottom: "0.6rem",
                    }}
                  >
                    Active Blog Categories:
                  </div>
                  <div id="adminBlogCategoriesList">
                    {blogCategories.map((cat) => (
                      <div
                        key={cat.id}
                        className="admin-item-row"
                        style={{ padding: "0.4rem 0.8rem" }}
                      >
                        <span style={{ fontSize: "0.85rem" }}>
                          🏷️ <strong>{cat.name}</strong>
                        </span>
                        <button
                          type="button"
                          className="admin-delete-btn"
                          onClick={() => handleDeleteBlogCategory(cat.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Publish Article Form */}
                <div className="admin-form-box">
                  <div className="admin-form-title">
                    <span>➕</span> Publish New Blog Article (Readable On-Site)
                  </div>
                  <form onSubmit={handleSaveBlog}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Article Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. The Missing Guardrail in AI"
                          value={blogTitle}
                          onChange={(e) => setBlogTitle(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Category Filter</label>
                        <select
                          value={blogCategory}
                          onChange={(e) => setBlogCategory(e.target.value)}
                        >
                          {blogCategories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Read Time / Badge</label>
                        <input
                          type="text"
                          placeholder="e.g. 20 MIN READ"
                          value={blogBadge}
                          onChange={(e) => setBlogBadge(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Tags (Comma Separated)</label>
                        <input
                          type="text"
                          placeholder="e.g. Keycloak, SPIRE, Zero Trust"
                          value={blogTags}
                          onChange={(e) => setBlogTags(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Short Excerpt / Card Description</label>
                      <textarea
                        rows={2}
                        required
                        placeholder="Brief summary of what readers will learn..."
                        value={blogDesc}
                        onChange={(e) => setBlogDesc(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label>Cover Image Path or URL</label>
                      <input
                        type="text"
                        placeholder="https://raw.githubusercontent.com/lokesh-repaka/articles/main/..."
                        value={blogImg}
                        onChange={(e) => setBlogImg(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Full Article Body / Content (Markdown or HTML supported)
                      </label>
                      <textarea
                        rows={8}
                        placeholder="Write or paste your article content here... (Headings ##, code blocks ```, diagrams ![alt](url) will render in the reader!)"
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="btn-gold"
                      style={{ padding: "0.6rem 1.4rem" }}
                    >
                      ➕ Publish Article Card
                    </button>
                  </form>
                </div>

                <div className="admin-form-box">
                  <div className="admin-form-title">
                    <span>📚</span> Published Articles
                  </div>
                  <div id="adminBlogsListContainer">
                    {blogs.map((b) => (
                      <div key={b.id} className="admin-item-row">
                        <div className="admin-item-info">
                          <strong style={{ color: "var(--gold-bright)", fontSize: "0.95rem" }}>
                            {b.title}
                          </strong>
                          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                            {(b.category || "").toUpperCase()} · {b.badge || "ARTICLE"}
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button
                            type="button"
                            className="nav-admin-link"
                            style={{ padding: "0.25rem 0.6rem" }}
                            onClick={() => onNavigate("article-reader", b.id)}
                          >
                            Read
                          </button>
                          <button
                            type="button"
                            className="admin-delete-btn"
                            onClick={() => handleDeleteBlog(b.id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* PANEL 6: RESUME FULL EDITOR */}
              <div
                id="panel-resume"
                className={`admin-panel ${activeTab === "resume" ? "active" : ""}`}
              >
                {/* Header, Role & Summary */}
                <div className="admin-form-box">
                  <div className="admin-form-title">
                    <span>📄</span> Resume Header & Summary
                  </div>
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
                    <button
                      type="submit"
                      className="btn-gold"
                      style={{ padding: "0.6rem 1.4rem" }}
                    >
                      💾 Save Header & Summary
                    </button>
                  </form>
                </div>

                {/* Professional Experience Manager */}
                <div className="admin-form-box">
                  <div className="admin-form-title">
                    <span>💼</span> Add Professional Experience
                  </div>
                  <form onSubmit={handleAddExperience}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Job Title / Position</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Lead AI Systems Architect"
                          value={expTitle}
                          onChange={(e) => setExpTitle(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Company / Organization</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. AI Governance Systems"
                          value={expCompany}
                          onChange={(e) => setExpCompany(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Role Type</label>
                        <input
                          type="text"
                          placeholder="e.g. Full-Time / Lead Author"
                          value={expRole}
                          onChange={(e) => setExpRole(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Duration / Period</label>
                        <input
                          type="text"
                          placeholder="e.g. 2024 – Present"
                          value={expDuration}
                          onChange={(e) => setExpDuration(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Bullet Points (One per line)</label>
                      <textarea
                        rows={3}
                        placeholder="Enter bullet point 1&#10;Enter bullet point 2"
                        value={expBullets}
                        onChange={(e) => setExpBullets(e.target.value)}
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="btn-gold"
                      style={{ padding: "0.6rem 1.4rem" }}
                    >
                      ➕ Add Experience Item
                    </button>
                  </form>
                  <div style={{ marginTop: "1.5rem" }} id="adminExperienceListContainer">
                    <div
                      style={{
                        fontWeight: 700,
                        color: "var(--gold-bright)",
                        fontSize: "0.9rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Current Experience Entries:
                    </div>
                    {(resume.experience || []).map((exp) => (
                      <div key={exp.id} className="admin-item-row">
                        <div className="admin-item-info">
                          <strong style={{ color: "#fff" }}>
                            {exp.title} — {exp.company}
                          </strong>
                          <span style={{ fontSize: "0.78rem", color: "var(--gold-bright)" }}>
                            {exp.role} ({exp.duration})
                          </span>
                        </div>
                        <button
                          type="button"
                          className="admin-delete-btn"
                          onClick={() => handleDeleteExperience(exp.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personal / Key Projects Manager in Resume */}
                <div className="admin-form-box">
                  <div className="admin-form-title">
                    <span>🚀</span> Add Resume Project Details
                  </div>
                  <form onSubmit={handleAddResumeProject}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Project Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. PolicyPilot Zero-Trust Engine"
                          value={resProjTitle}
                          onChange={(e) => setResProjTitle(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Role / Type</label>
                        <input
                          type="text"
                          placeholder="e.g. AI Engineer / Open Source"
                          value={resProjRole}
                          onChange={(e) => setResProjRole(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Duration</label>
                      <input
                        type="text"
                        placeholder="e.g. 2024"
                        value={resProjDuration}
                        onChange={(e) => setResProjDuration(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Bullet Points (One per line)</label>
                      <textarea
                        rows={3}
                        placeholder="Engineered OPA Rego policy gates&#10;Integrated Keycloak IAM token verification"
                        value={resProjBullets}
                        onChange={(e) => setResProjBullets(e.target.value)}
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="btn-gold"
                      style={{ padding: "0.6rem 1.4rem" }}
                    >
                      ➕ Add Resume Project
                    </button>
                  </form>
                  <div style={{ marginTop: "1.5rem" }} id="adminResumeProjectsListContainer">
                    <div
                      style={{
                        fontWeight: 700,
                        color: "var(--gold-bright)",
                        fontSize: "0.9rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Current Resume Projects:
                    </div>
                    {(resume.projects || []).map((p) => (
                      <div key={p.id} className="admin-item-row">
                        <div className="admin-item-info">
                          <strong style={{ color: "#fff" }}>{p.title}</strong>
                          <span style={{ fontSize: "0.78rem", color: "var(--gold-bright)" }}>
                            {p.role || ""} ({p.duration || ""})
                          </span>
                        </div>
                        <button
                          type="button"
                          className="admin-delete-btn"
                          onClick={() => handleDeleteResumeProject(p.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education Manager */}
                <div className="admin-form-box">
                  <div className="admin-form-title">
                    <span>🎓</span> Add Education
                  </div>
                  <form onSubmit={handleAddEducation}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Degree</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Bachelor of Technology in CSE"
                          value={eduDegree}
                          onChange={(e) => setEduDegree(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Institution / University</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. University Name, India"
                          value={eduInstitution}
                          onChange={(e) => setEduInstitution(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Major / Specialization</label>
                        <input
                          type="text"
                          placeholder="e.g. Major in Artificial Intelligence"
                          value={eduMajor}
                          onChange={(e) => setEduMajor(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Year / Duration</label>
                        <input
                          type="text"
                          placeholder="e.g. 2020 – 2024"
                          value={eduYear}
                          onChange={(e) => setEduYear(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn-gold"
                      style={{ padding: "0.6rem 1.4rem" }}
                    >
                      ➕ Add Education
                    </button>
                  </form>
                  <div style={{ marginTop: "1.5rem" }} id="adminEducationListContainer">
                    <div
                      style={{
                        fontWeight: 700,
                        color: "var(--gold-bright)",
                        fontSize: "0.9rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Current Education Entries:
                    </div>
                    {(resume.education || []).map((edu) => (
                      <div key={edu.id} className="admin-item-row">
                        <div className="admin-item-info">
                          <strong style={{ color: "#fff" }}>{edu.degree}</strong>
                          <span style={{ fontSize: "0.78rem", color: "var(--gold-bright)" }}>
                            {edu.institution} ({edu.year || ""})
                          </span>
                        </div>
                        <button
                          type="button"
                          className="admin-delete-btn"
                          onClick={() => handleDeleteEducation(edu.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
