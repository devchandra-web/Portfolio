import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { PROJECTS_DATA, Project } from "@/data/projects";
import { CaseStudyView } from "@/components/projects/CaseStudyView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const dbProjects = await prisma.project.findMany({
      where: { published: true },
      select: { slug: true },
    });
    if (dbProjects.length > 0) {
      return dbProjects.map((p) => ({ slug: p.slug }));
    }
  } catch {
    // Fallback
  }

  return PROJECTS_DATA.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let project: Project | undefined = undefined;

  try {
    const dbProject = await prisma.project.findUnique({
      where: { slug },
    });
    if (dbProject && dbProject.published) {
      project = {
        slug: dbProject.slug,
        title: dbProject.title,
        subtitle: dbProject.subtitle,
        shortDescription: dbProject.shortDescription,
        category: dbProject.category as Project["category"],
        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
        featured: dbProject.featured,
        image: dbProject.mainImage,
        demoUrl: dbProject.liveDemoUrl,
        githubUrl: dbProject.githubUrl,
        keyFeatures: [dbProject.problem, dbProject.solution],
        caseStudy: {
          overview: dbProject.fullDescription,
          problem: dbProject.problem,
          solution: dbProject.solution,
          developmentProcess: ["Architecture Planning", "Core Development", "Optimization"],
          features: [dbProject.problem, dbProject.solution],
          techStack: [{ name: "Next.js", role: "Framework" }],
          challenges: [{ challenge: dbProject.problem, solution: dbProject.solution }],
          performanceMetrics: [{ label: "Performance", value: "98/100", detail: "Optimized" }],
          responsiveDesign: "Mobile-first responsive design",
          result: dbProject.result,
          liveDemoUrl: dbProject.liveDemoUrl,
          githubUrl: dbProject.githubUrl,
        },
      };
    }
  } catch {
    // Fallback
  }

  if (!project) {
    project = PROJECTS_DATA.find((p) => p.slug === slug);
  }

  if (!project) {
    return {
      title: "Project Not Found | Chandra Shekhar",
    };
  }

  return {
    title: `${project.title} — Case Study | Chandra Shekhar`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.shortDescription,
      images: [project.image],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  let project: Project | undefined = undefined;

  try {
    const dbProject = await prisma.project.findUnique({
      where: { slug },
    });
    if (dbProject && dbProject.published) {
      project = {
        slug: dbProject.slug,
        title: dbProject.title,
        subtitle: dbProject.subtitle,
        shortDescription: dbProject.shortDescription,
        category: dbProject.category as Project["category"],
        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
        featured: dbProject.featured,
        image: dbProject.mainImage,
        demoUrl: dbProject.liveDemoUrl,
        githubUrl: dbProject.githubUrl,
        keyFeatures: [dbProject.problem, dbProject.solution],
        caseStudy: {
          overview: dbProject.fullDescription,
          problem: dbProject.problem,
          solution: dbProject.solution,
          developmentProcess: ["Architecture Planning", "Core Development", "Optimization"],
          features: [dbProject.problem, dbProject.solution],
          techStack: [{ name: "Next.js", role: "Framework" }],
          challenges: [{ challenge: dbProject.problem, solution: dbProject.solution }],
          performanceMetrics: [{ label: "Performance", value: "98/100", detail: "Optimized" }],
          responsiveDesign: "Mobile-first responsive design",
          result: dbProject.result,
          liveDemoUrl: dbProject.liveDemoUrl,
          githubUrl: dbProject.githubUrl,
        },
      };
    }
  } catch {
    // Fallback
  }

  if (!project) {
    project = PROJECTS_DATA.find((p) => p.slug === slug);
  }

  if (!project) {
    notFound();
  }

  return <CaseStudyView project={project} />;
}
