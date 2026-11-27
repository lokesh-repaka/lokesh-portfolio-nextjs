import { Projects } from "@/components/Projects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Production Projects & Architectures — Lokesh Repaka",
  description:
    "Explore enterprise AI platforms engineered by Lokesh Repaka: ApexAP Invoice Automation, CloudDesk Autonomous Support, ApexMotion Risk Intelligence, RAG Studio, and AnomalyEngine.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-8">
      <Projects />
    </div>
  );
}
