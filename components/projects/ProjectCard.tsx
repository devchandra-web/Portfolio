"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import { ExternalLink, ArrowUpRight, CheckCircle2, BookOpen } from "lucide-react";
import { GithubIcon } from "../ui/Icons";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <GlassCard
      hoverEffect={true}
      glowOnHover={project.featured}
      className="p-0 overflow-hidden flex flex-col justify-between group h-full border border-slate-800"
    >
      <div>
        {/* Project Image Preview Header */}
        <div className="relative w-full h-52 sm:h-60 bg-slate-900 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          {/* Top Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge variant="emerald" size="sm" className="shadow-lg backdrop-blur-md">
              {project.category}
            </Badge>
          </div>

          {/* Quick Case Study Overlay Badge */}
          <div className="absolute top-4 right-4">
            <Link
              href={`/projects/${project.slug}`}
              className="p-2 rounded-full bg-slate-900/80 hover:bg-emerald-500 text-slate-300 hover:text-slate-950 transition-colors shadow-lg border border-slate-700/60 flex items-center justify-center"
              aria-label={`Read case study for ${project.title}`}
              title="View Case Study"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors mb-1">
            {project.title}
          </h3>
          <p className="text-xs font-medium text-slate-400 mb-3 font-mono">
            {project.subtitle}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed mb-5 font-normal">
            {project.shortDescription}
          </p>

          {/* Key Features Bullet List */}
          <div className="mb-6 space-y-1.5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
              Key Features:
            </span>
            {project.keyFeatures.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-start space-x-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="slate" size="sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Project Card Footer Actions */}
      <div className="p-6 pt-0 border-t border-slate-800/60 mt-auto flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Case Study</span>
        </Link>

        <div className="flex items-center space-x-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub repo for ${project.title}`}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Live Demo for ${project.title}`}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-slate-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </GlassCard>
  );
};
