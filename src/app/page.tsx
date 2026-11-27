"use client";

import React, { useState, useEffect } from "react";
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
import { skillCategories, skills } from "@/data/skills";
import { projectCategories, projects } from "@/data/projects";
import { blogCategories, initialBlogs } from "@/data/blogs";
import { resumeData } from "@/data/resume";
import { Project, Blog } from "@/types";
import { fetchGitHubBlogs } from "@/lib/github-blogs";

export default function Page() {
  const [activeView, setActiveView] = useState<string>("home");
  const [texts, setTexts] = useState(portfolioTexts);
  const [blogsList, setBlogsList] = useState<Blog[]>(initialBlogs);
  const [currentArticleId, setCurrentArticleId] = useState<string>("b1");
  const [modalProject, setModalProject] = useState<Project | null>(null);

  // Toast state
  const [toast, setToast] = useState<{ show: boolean; message: string; icon: string }>({
    show: false,
    message: "",
    icon: "✅",
  });

  const showToast = (message: string, icon = "✅") => {
    setToast({ show: true, message, icon });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3200);
  };

  // Navigate function matching index.html
  const navigateTo = (viewName: string, param?: string) => {
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
  };

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

  // Initial load: parse URL hash & fetch live blogs
  useEffect(() => {
    // 1. Fetch live GitHub blogs
    fetchGitHubBlogs().then((fetched) => {
      if (fetched && fetched.length > 0) {
        setBlogsList(fetched);
      }
    });

    // 2. Parse URL hash
    if (typeof window !== "undefined") {
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
            const found = projects.find((p) => p.id === idMatch[1]);
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

      // 3. Load saved texts if present in localStorage
      try {
        const saved = localStorage.getItem("lokesh_portfolio_data_v4");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.texts) setTexts((prev) => ({ ...prev, ...parsed.texts }));
        }
      } catch (e) {
        console.warn("Could not read local portfolio state:", e);
      }
      // 4. Secret shortcuts to admin portal: Ctrl+Shift+L or typing "lokesh"
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
        <SkillsView categories={skillCategories} skills={skills} isActive={activeView === "skills"} />
        <ResumeView texts={texts} resume={resumeData} isActive={activeView === "resume"} />
        <ProjectsView
          categories={projectCategories}
          projects={projects}
          isActive={activeView === "projects"}
          onOpenModal={handleOpenProjectModal}
        />
        <BlogsView
          categories={blogCategories}
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
          skills={skills}
          skillCategories={skillCategories}
          projects={projects}
          projectCategories={projectCategories}
          blogs={blogsList}
          blogCategories={blogCategories}
          resume={resumeData}
          isActive={activeView === "admin"}
          onNavigate={navigateTo}
          onUpdateTexts={(newTexts) => {
            setTexts(newTexts);
            if (typeof window !== "undefined") {
              localStorage.setItem("lokesh_portfolio_data_v4", JSON.stringify({ texts: newTexts }));
            }
          }}
          onShowToast={showToast}
        />
      </main>
    </>
  );
}
