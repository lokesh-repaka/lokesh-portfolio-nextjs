"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/Header";
import { HomeView } from "@/components/HomeView";
import { AboutView } from "@/components/AboutView";
import { SkillsView } from "@/components/SkillsView";
import { ResumeView } from "@/components/ResumeView";
import { ProjectsView } from "@/components/ProjectsView";
import { BlogsView } from "@/components/BlogsView";
import { ContactView } from "@/components/ContactView";
import { ArticleReaderView } from "@/components/ArticleReaderView";
import { AdminView } from "@/components/AdminView";
import { ProjectModal } from "@/components/ProjectModal";
import { Toast } from "@/components/Toast";

import { portfolioTexts } from "@/data/portfolio";
import { skillCategories as defaultSkillCats, skills as defaultSkills } from "@/data/skills";
import { projectCategories as defaultProjCats, projects as defaultProjects } from "@/data/projects";
import { blogCategories as defaultBlogCats, initialBlogs } from "@/data/blogs";
import { resumeData as defaultResume } from "@/data/resume";
import {
  PortfolioTexts,
  Skill,
  SkillCategory,
  Project,
  ProjectCategory,
  Blog,
  BlogCategory,
  ResumeData,
  ResumeProject,
} from "@/types";
import { fetchGitHubBlogs } from "@/lib/github-blogs";

const STORAGE_KEY = "lokesh_portfolio_data_v7";

export default function Page() {
  const [activeView, setActiveView] = useState<string>("home");

  // Persistent States
  const [texts, setTexts] = useState<PortfolioTexts>(portfolioTexts);
  const [skillCategoriesList, setSkillCategoriesList] = useState<SkillCategory[]>(defaultSkillCats);
  const [skillsList, setSkillsList] = useState<Skill[]>(defaultSkills);
  const [projectCategoriesList, setProjectCategoriesList] = useState<ProjectCategory[]>(defaultProjCats);
  const [projectsList, setProjectsList] = useState<Project[]>(defaultProjects);
  const [blogCategoriesList, setBlogCategoriesList] = useState<BlogCategory[]>(defaultBlogCats);
  const [blogsList, setBlogsList] = useState<Blog[]>(initialBlogs);
  const [resumeDataState, setResumeDataState] = useState<ResumeData>(defaultResume);

  const [currentArticleId, setCurrentArticleId] = useState<string>("b1");
  const [modalProject, setModalProject] = useState<Project | null>(null);

  // Toast state
  const [toast, setToast] = useState<{ show: boolean; message: string; icon: string }>({
    show: false,
    message: "",
    icon: "✅",
  });

  const showToast = useCallback((message: string, icon = "✅") => {
    setToast({ show: true, message, icon });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3200);
  }, []);

  // Save helper to persist current state snapshot to localStorage
  const persistState = useCallback(
    (overrides?: {
      texts?: PortfolioTexts;
      skillCategories?: SkillCategory[];
      skills?: Skill[];
      projectCategories?: ProjectCategory[];
      projects?: Project[];
      blogCategories?: BlogCategory[];
      blogs?: Blog[];
      resume?: ResumeData;
    }) => {
      if (typeof window === "undefined") return;
      try {
        const fullData = {
          texts: overrides?.texts ?? texts,
          skillCategories: overrides?.skillCategories ?? skillCategoriesList,
          skills: overrides?.skills ?? skillsList,
          projectCategories: overrides?.projectCategories ?? projectCategoriesList,
          projects: overrides?.projects ?? projectsList,
          blogCategories: overrides?.blogCategories ?? blogCategoriesList,
          blogs: overrides?.blogs ?? blogsList,
          resume: overrides?.resume ?? resumeDataState,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fullData));
      } catch (e) {
        console.warn("Could not save to localStorage:", e);
      }
    },
    [
      texts,
      skillCategoriesList,
      skillsList,
      projectCategoriesList,
      projectsList,
      blogCategoriesList,
      blogsList,
      resumeDataState,
    ]
  );

  // Update Handlers
  const handleUpdateTexts = useCallback(
    (newTexts: PortfolioTexts) => {
      setTexts(newTexts);
      persistState({ texts: newTexts });
    },
    [persistState]
  );

  const handleUpdateSkills = useCallback(
    (newCats: SkillCategory[], newSkills: Skill[]) => {
      setSkillCategoriesList(newCats);
      setSkillsList(newSkills);
      persistState({ skillCategories: newCats, skills: newSkills });
    },
    [persistState]
  );

  const handleUpdateProjects = useCallback(
    (newCats: ProjectCategory[], newProjects: Project[]) => {
      setProjectCategoriesList(newCats);
      setProjectsList(newProjects);
      persistState({ projectCategories: newCats, projects: newProjects });
    },
    [persistState]
  );

  const handleUpdateBlogs = useCallback(
    (newCats: BlogCategory[], newBlogs: Blog[]) => {
      setBlogCategoriesList(newCats);
      setBlogsList(newBlogs);
      persistState({ blogCategories: newCats, blogs: newBlogs });
    },
    [persistState]
  );

  const handleUpdateResume = useCallback(
    (newResume: ResumeData) => {
      setResumeDataState(newResume);
      persistState({ resume: newResume });
    },
    [persistState]
  );

  // Navigate function matching SPA router
  const navigateTo = useCallback((viewName: string, param?: string) => {
    setActiveView(viewName);
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      if (viewName === "home") {
        window.history.pushState(null, "", "#");
      } else if (param) {
        window.history.pushState(null, "", `#${viewName}&id=${param}`);
      } else {
        window.history.pushState(null, "", `#${viewName}`);
      }
    }
  }, []);

  const handleOpenProjectModal = (proj: Project) => {
    setModalProject(proj);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `#project&id=${proj.id}`);
    }
  };

  const handleCloseProjectModal = () => {
    setModalProject(null);
    if (typeof window !== "undefined" && activeView === "projects") {
      window.history.pushState(null, "", "#projects");
    }
  };

  const handleSelectBlog = (blogId: string) => {
    setCurrentArticleId(blogId);
    navigateTo("article-reader", blogId);
  };

  // Initial load: parse URL hash, load localStorage & fetch live blogs
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Invalidate stale cache keys from previous versions
      ["lokesh_portfolio_data_v1", "lokesh_portfolio_data_v2", "lokesh_portfolio_data_v3", "lokesh_portfolio_data_v4", "lokesh_portfolio_data_v5", "lokesh_portfolio_data_v6"].forEach((k) => {
        try { localStorage.removeItem(k); } catch (_) {}
      });

      // 2. Load saved state from localStorage if present
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.texts) setTexts((prev) => ({ ...prev, ...parsed.texts }));
          if (parsed.skillCategories && Array.isArray(parsed.skillCategories)) {
            setSkillCategoriesList(parsed.skillCategories);
          }
          if (parsed.skills && Array.isArray(parsed.skills)) {
            setSkillsList(parsed.skills);
          }
          if (parsed.projectCategories && Array.isArray(parsed.projectCategories)) {
            const parsedCatIds = new Set(parsed.projectCategories.map((c: ProjectCategory) => c.id));
            const missingCats = defaultProjCats.filter((dc) => !parsedCatIds.has(dc.id));
            setProjectCategoriesList([...parsed.projectCategories, ...missingCats]);
          }
          if (parsed.projects && Array.isArray(parsed.projects)) {
            const parsedIds = new Set(parsed.projects.map((p: Project) => p.id));
            const missingProjects = defaultProjects.filter((dp) => !parsedIds.has(dp.id));
            setProjectsList([...missingProjects, ...parsed.projects]);
          } else {
            setProjectsList(defaultProjects);
          }
          if (parsed.blogCategories && Array.isArray(parsed.blogCategories)) {
            const validCats = parsed.blogCategories.filter((c: BlogCategory) => c.id === "governance");
            setBlogCategoriesList(validCats.length > 0 ? validCats : defaultBlogCats);
          }
          if (parsed.blogs && Array.isArray(parsed.blogs)) {
            const valid = parsed.blogs.filter((b: Blog) =>
              b.id === "b1" ||
              b.githubSlug === "01-ai-and-identity-governance" ||
              b.title.toLowerCase().includes("missing guardrail")
            );
            setBlogsList(valid.length > 0 ? valid : initialBlogs);
          }
          if (parsed.resume) {
            const parsedProjIds = new Set(
              (parsed.resume.projects || []).map((p: ResumeProject) => p.id)
            );
            const missingResumeProjs = (defaultResume.projects || []).filter(
              (dp) => !parsedProjIds.has(dp.id)
            );
            setResumeDataState((prev) => ({
              ...defaultResume,
              ...parsed.resume,
              projects: [...missingResumeProjs, ...(parsed.resume.projects || [])],
            }));
          } else {
            setResumeDataState(defaultResume);
          }
        } else {
          setProjectsList(defaultProjects);
          setResumeDataState(defaultResume);
        }
      } catch (e) {
        console.warn("Could not read local portfolio state:", e);
      }

      // 2. Parse URL hash
      const hash = window.location.hash.replace(/^#/, "");
      if (hash) {
        if (hash.startsWith("article-reader") || hash.startsWith("article")) {
          const idMatch = hash.match(/id=([^&]+)/);
          const artId = idMatch ? idMatch[1] : "b1";
          setCurrentArticleId(artId);
          setActiveView("article-reader");
        } else if (hash.startsWith("project")) {
          setActiveView("projects");
          const idMatch = hash.match(/id=([^&]+)/);
          if (idMatch) {
            const found = projectsList.find((p) => p.id === idMatch[1]) || defaultProjects.find((p) => p.id === idMatch[1]);
            if (found) setModalProject(found);
          }
        } else if (
          ["home", "about", "skills", "resume", "projects", "blogs", "contact", "admin"].includes(
            hash
          )
        ) {
          setActiveView(hash);
        }
      }

      // 3. Secret shortcuts to admin portal: Ctrl+Shift+L or typing "lokesh"
      let secretBuffer = "";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === "L") {
          e.preventDefault();
          navigateTo("admin");
        }
        secretBuffer += e.key.toLowerCase();
        if (secretBuffer.length > 10) secretBuffer = secretBuffer.slice(-10);
        if (secretBuffer.endsWith("lokesh")) {
          secretBuffer = "";
          navigateTo("admin");
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      // 4. Ensure blog list starts cleanly with the requested Missing Guardrail article
      fetchGitHubBlogs().then((fetched) => {
        if (fetched && fetched.length > 0) {
          setBlogsList(fetched);
        }
      });

      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  const activeArticle =
    blogsList.find((b) => b.id === currentArticleId || b.githubSlug === currentArticleId) ||
    blogsList[0] ||
    initialBlogs[0];

  return (
    <>
      <Toast show={toast.show} message={toast.message} icon={toast.icon} />

      <ProjectModal
        project={modalProject}
        isOpen={!!modalProject}
        onClose={handleCloseProjectModal}
        onShowToast={showToast}
      />

      <Header activeView={activeView} onNavigate={navigateTo} />

      <main className="main-container">
        <HomeView texts={texts} isActive={activeView === "home"} onNavigate={navigateTo} />
        <AboutView texts={texts} isActive={activeView === "about"} onNavigate={navigateTo} />
        <SkillsView
          categories={skillCategoriesList}
          skills={skillsList}
          isActive={activeView === "skills"}
        />
        <ResumeView texts={texts} resume={resumeDataState} isActive={activeView === "resume"} />
        <ProjectsView
          categories={projectCategoriesList}
          projects={projectsList}
          isActive={activeView === "projects"}
          onOpenModal={handleOpenProjectModal}
        />
        <BlogsView
          categories={blogCategoriesList}
          blogs={blogsList}
          isActive={activeView === "blogs"}
          onSelectBlog={handleSelectBlog}
        />
        <ContactView texts={texts} isActive={activeView === "contact"} />
        <ArticleReaderView
          article={activeArticle}
          isActive={activeView === "article-reader"}
          onBack={() => navigateTo("blogs")}
          onShowToast={showToast}
        />
        <AdminView
          texts={texts}
          skills={skillsList}
          skillCategories={skillCategoriesList}
          projects={projectsList}
          projectCategories={projectCategoriesList}
          blogs={blogsList}
          blogCategories={blogCategoriesList}
          resume={resumeDataState}
          isActive={activeView === "admin"}
          onNavigate={navigateTo}
          onUpdateTexts={handleUpdateTexts}
          onUpdateSkills={handleUpdateSkills}
          onUpdateProjects={handleUpdateProjects}
          onUpdateBlogs={handleUpdateBlogs}
          onUpdateResume={handleUpdateResume}
          onShowToast={showToast}
        />
      </main>
    </>
  );
}
