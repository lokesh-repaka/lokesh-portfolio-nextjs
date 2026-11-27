import { Blog } from "@/types";
import { initialBlogs } from "@/data/blogs";

export const GITHUB_USER = "lokesh-repaka";
export const GITHUB_REPO = "articles";
export const GITHUB_BRANCH = "main";
export const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}`;
export const GITHUB_API_BASE = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}`;

export function parseBlogMeta(markdown: string, slug: string) {
  const lines = markdown.split("\n");
  const titleLine = lines.find((l) => l.startsWith("# "));
  const title = titleLine ? titleLine.replace(/^# /, "").trim() : slug;
  
  const descLine = lines.find((l) => /^\*[^*].+\*$/.test(l.trim()));
  const desc = descLine ? descLine.replace(/^\*|\*$/g, "").trim() : "";
  
  const wordCount = markdown.split(/\s+/).length;
  const mins = Math.max(1, Math.round(wordCount / 200));
  
  const imgMatch = markdown.match(/!\[.*?\]\((images\/[^)]+)\)/);
  const img = imgMatch ? `${GITHUB_RAW_BASE}/articles/${slug}/${imgMatch[1]}` : "";

  return { title, desc, img, badge: `${mins} MIN READ` };
}

export async function fetchGitHubBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${GITHUB_API_BASE}/contents/articles`, {
      next: { revalidate: 3600 }, // Cache for 1 hour on server, auto-revalidating
    });

    if (!res.ok) {
      console.warn("GitHub API request returned status:", res.status);
      return initialBlogs;
    }

    const folders = await res.json();
    if (!Array.isArray(folders)) return initialBlogs;

    const articleFolders = folders
      .filter((f: any) => f.type === "dir")
      .sort((a: any, b: any) => a.name.localeCompare(b.name));

    if (articleFolders.length === 0) return initialBlogs;

    const fetchedBlogs = await Promise.all(
      articleFolders.map(async (folder: any, idx: number) => {
        try {
          const mdRes = await fetch(`${GITHUB_RAW_BASE}/articles/${folder.name}/README.md`, {
            next: { revalidate: 3600 },
          });
          if (!mdRes.ok) return null;
          const markdown = await mdRes.text();
          const meta = parseBlogMeta(markdown, folder.name);

          let category = "governance";
          if (folder.name.includes("agent") || folder.name.includes("langgraph")) category = "agents";
          if (folder.name.includes("identity") || folder.name.includes("iam") || folder.name.includes("keycloak")) category = "identity";

          const blogItem: Blog = {
            id: folder.name,
            title: meta.title,
            category,
            badge: idx === 0 ? `⭐ FEATURED · ${meta.badge}` : meta.badge,
            date: "Nov 2025",
            desc: meta.desc || "A deep technical article on AI Governance & Identity Engineering.",
            tags: ["AI Governance", "Identity", "Zero Trust"],
            img: meta.img,
            githubSlug: folder.name,
            githubRaw: `${GITHUB_RAW_BASE}/articles/${folder.name}/README.md`,
          };
          return blogItem;
        } catch {
          return null;
        }
      })
    );

    const validBlogs = fetchedBlogs.filter((b): b is Blog => b !== null);
    
    // Merge GitHub fetched blogs with local initial blogs (excluding duplicates)
    const existingSlugs = new Set(validBlogs.map((b) => b.id));
    const uniqueInitial = initialBlogs.filter((b) => !existingSlugs.has(b.id) && !existingSlugs.has(b.githubSlug || ""));

    return [...validBlogs, ...uniqueInitial];
  } catch (err) {
    console.warn("Failed to fetch live blogs from GitHub, falling back to local list:", err);
    return initialBlogs;
  }
}

export async function fetchArticleMarkdown(slug: string): Promise<{ markdown: string; title?: string }> {
  try {
    const rawUrl = `${GITHUB_RAW_BASE}/articles/${slug}/README.md`;
    const res = await fetch(rawUrl, { next: { revalidate: 3600 } });
    if (res.ok) {
      const rawMarkdown = await res.text();
      // Rewrite relative image urls
      const baseImgUrl = `${GITHUB_RAW_BASE}/articles/${slug}/`;
      const fixedMarkdown = rawMarkdown.replace(
        /!\[([^\]]*)\]\((images\/[^)]+)\)/g,
        (_, alt, path) => `![${alt}](${baseImgUrl}${path})`
      );
      return { markdown: fixedMarkdown };
    }
  } catch (e) {
    console.error("Error fetching article from GitHub:", e);
  }

  // Fallback to local blog content if slug matches
  const localBlog = initialBlogs.find((b) => b.id === slug || b.githubSlug === slug);
  if (localBlog && localBlog.content) {
    return { markdown: localBlog.content, title: localBlog.title };
  }

  return { markdown: "# Article Not Found\n\nCould not locate this article content." };
}
