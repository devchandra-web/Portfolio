import { Metadata } from "next";
import { ProjectsSection } from "@/components/projects/ProjectsSection";

export const metadata: Metadata = {
  title: "Projects & Case Studies | Chandra Shekhar",
  description:
    "Explore realistic frontend engineering projects built with Next.js App Router, TypeScript, Tailwind CSS, and REST API integration.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-16">
      <ProjectsSection />
    </div>
  );
}
