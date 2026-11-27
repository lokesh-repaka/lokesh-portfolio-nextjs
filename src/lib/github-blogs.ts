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
  // Return the featured "Missing Guardrail in AI" blog
  return initialBlogs;
}

export async function fetchArticleMarkdown(slug: string): Promise<{ markdown: string; title?: string }> {
  try {
    const rawUrl = `${GITHUB_RAW_BASE}/articles/01-ai-and-identity-governance/README.md`;
    const res = await fetch(rawUrl, { next: { revalidate: 3600 } });
    if (res.ok) {
      const rawMarkdown = await res.text();
      // Rewrite relative image urls
      const baseImgUrl = `${GITHUB_RAW_BASE}/articles/01-ai-and-identity-governance/`;
      const fixedMarkdown = rawMarkdown.replace(
        /!\[([^\]]*)\]\((images\/[^)]+)\)/g,
        (_, alt, path) => `![${alt}](${baseImgUrl}${path})`
      );
      return { markdown: fixedMarkdown };
    }
  } catch (e) {
    console.error("Error fetching article from GitHub:", e);
  }

  // Fallback to local blog content
  const localBlog = initialBlogs[0];
  if (localBlog && localBlog.content) {
    return { markdown: localBlog.content, title: localBlog.title };
  }

  return { markdown: "# Article Not Found\n\nCould not locate this article content." };
}
