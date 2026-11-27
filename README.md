# Lokesh Repaka — Next.js AI Portfolio & Governance Architecture

A modular, high-performance portfolio engineered with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

## ✨ Architecture Highlights

- **Modular Data Architecture**: Separated code from content. Edit projects, skills, resume, or blogs in `src/data/` without touching 4000+ lines of monolithic HTML!
- **Dynamic Blog System (`/blogs/[slug]`)**:
  - Automatically fetches and renders live technical articles from the GitHub repository (`lokesh-repaka/articles`).
  - Supports Markdown rendering, syntax highlighting, image rewrites, and reading time estimation.
  - Fallback offline support for local markdown deep dives.
- **Production Showcase (`/projects`)**:
  - Filterable by system category (Agentic AI, Enterprise RAG, Automation & Risk).
  - Deep dive modals and architectural breakdowns.
- **Printable Resume (`/resume`)**:
  - Clean A4 printable stylesheet for 1-click "Save as PDF" directly from browser.
- **Dark Luxury Design System**:
  - Obsidian dark mode with glowing gold/amber accents, Cinzel serif typography, and JetBrains Mono code tags.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Build for Production
```bash
npm run build
npm run start
```

## 📁 Directory Structure
```
src/
├── app/
│   ├── layout.tsx         # Root layout with fonts, metadata & ToastProvider
│   ├── page.tsx           # Main interactive portfolio page
│   ├── projects/          # Dedicated projects showcase
│   ├── blogs/             # Dedicated blogs directory
│   │   └── [slug]/        # Dynamic markdown article reader
│   ├── resume/            # Printable curriculum vitae
│   └── globals.css        # Tailwind & custom scrollbar / typography styling
├── components/            # Reusable React components (Hero, About, Skills, Projects, etc.)
├── data/                  # Clean content files (portfolio.ts, skills.ts, projects.ts, etc.)
├── lib/                   # GitHub articles fetcher & markdown parser
└── types/                 # TypeScript interfaces
```

## 📝 Extending Content

- **Add a New Skill**: Edit `src/data/skills.ts`
- **Add a New Project**: Add an entry to `src/data/projects.ts`
- **Add a New Blog**:
  - Either push a new folder with `README.md` to GitHub `lokesh-repaka/articles`,
  - Or add an entry in `src/data/blogs.ts`!
- **Update Profile / Hero Info**: Edit `src/data/portfolio.ts`
