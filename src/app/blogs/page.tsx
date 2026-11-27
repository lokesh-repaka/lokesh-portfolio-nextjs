import { Blogs } from "@/components/Blogs";
import { fetchGitHubBlogs } from "@/lib/github-blogs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Governance & Architecture Deep Dives — Lokesh Repaka",
  description:
    "Technical research and engineering guides on AI Governance, SPIFFE/SPIRE Machine Workload Identity, Keycloak IAM, and LangGraph multi-agent supervisors.",
};

export const revalidate = 3600;

export default async function BlogsPage() {
  const blogs = await fetchGitHubBlogs();

  return (
    <div className="pt-8">
      <Blogs initialBlogsList={blogs} />
    </div>
  );
}
