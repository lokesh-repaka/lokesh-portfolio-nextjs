import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Blogs } from "@/components/Blogs";
import { ResumeSection } from "@/components/ResumeSection";
import { Contact } from "@/components/Contact";
import { fetchGitHubBlogs } from "@/lib/github-blogs";

export const revalidate = 3600; // revalidate at most once per hour

export default async function HomePage() {
  const blogs = await fetchGitHubBlogs();

  return (
    <div className="space-y-4">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blogs initialBlogsList={blogs} />
      <ResumeSection />
      <Contact />
    </div>
  );
}
