"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { GlassCard } from "../ui/GlassCard";
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Gauge, 
  Smartphone, 
  Award, 
  Layers, 
  Code2, 
  Workflow 
} from "lucide-react";
import { GithubIcon } from "../ui/Icons";

interface CaseStudyViewProps {
  project: Project;
}

export const CaseStudyView: React.FC<CaseStudyViewProps> = ({ project }) => {
  const { caseStudy } = project;

  return (
    <article className="py-24 sm:py-32 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/#projects"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>

        {/* Header Block */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <Badge variant="emerald" size="md">{project.category}</Badge>
            <span className="text-xs text-slate-500 font-mono">Case Study</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-100 tracking-tight mb-4">
            {project.title}
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Hero Visual Preview */}
        <div className="relative w-full h-[320px] sm:h-[450px] rounded-2xl overflow-hidden glass-card mb-16 border border-slate-800">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        {/* 1. Project Overview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center space-x-2">
            <Layers className="w-6 h-6 text-emerald-400" />
            <span>1. Project Overview</span>
          </h2>
          <GlassCard className="p-6">
            <p className="text-base text-slate-300 leading-relaxed">
              {caseStudy.overview}
            </p>
          </GlassCard>
        </section>

        {/* 2 & 3. Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* 2. Problem */}
          <GlassCard className="p-6 border-l-4 border-l-rose-500">
            <h2 className="text-xl font-bold text-slate-100 mb-3 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-rose-400" />
              <span>2. The Problem</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {caseStudy.problem}
            </p>
          </GlassCard>

          {/* 3. Solution */}
          <GlassCard className="p-6 border-l-4 border-l-emerald-500">
            <h2 className="text-xl font-bold text-slate-100 mb-3 flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>3. The Solution</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {caseStudy.solution}
            </p>
          </GlassCard>
        </div>

        {/* 4. Development Process */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center space-x-2">
            <Workflow className="w-6 h-6 text-cyan-400" />
            <span>4. Development Process</span>
          </h2>
          <div className="space-y-3">
            {caseStudy.developmentProcess.map((step, idx) => (
              <div key={idx} className="glass-card p-4 rounded-xl flex items-start space-x-4">
                <span className="w-7 h-7 rounded-full bg-slate-800 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  0{idx + 1}
                </span>
                <p className="text-sm text-slate-300 leading-relaxed pt-0.5">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Key Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center space-x-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <span>5. Key Features</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {caseStudy.features.map((feature, idx) => (
              <div key={idx} className="glass-card p-4 rounded-xl flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-200 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Technology Stack */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center space-x-2">
            <Code2 className="w-6 h-6 text-blue-400" />
            <span>6. Technology Stack &amp; Architecture</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {caseStudy.techStack.map((item, idx) => (
              <GlassCard key={idx} className="p-4">
                <span className="text-sm font-bold text-emerald-400 block mb-1">
                  {item.name}
                </span>
                <p className="text-xs text-slate-400">{item.role}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* 7. Challenges & Technical Solutions */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center space-x-2">
            <AlertCircle className="w-6 h-6 text-amber-400" />
            <span>7. Engineering Challenges &amp; Solutions</span>
          </h2>
          <div className="space-y-4">
            {caseStudy.challenges.map((c, idx) => (
              <GlassCard key={idx} className="p-6">
                <h3 className="text-base font-bold text-rose-300 mb-2">
                  Challenge: {c.challenge}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  <strong className="text-emerald-400 font-semibold">Solution: </strong>
                  {c.solution}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* 8. Performance Metrics */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center space-x-2">
            <Gauge className="w-6 h-6 text-purple-400" />
            <span>8. Performance Metrics</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {caseStudy.performanceMetrics.map((m, idx) => (
              <GlassCard key={idx} className="p-6 text-center">
                <span className="text-3xl font-black text-emerald-400 font-mono block mb-1">
                  {m.value}
                </span>
                <h3 className="text-sm font-bold text-slate-100 mb-1">{m.label}</h3>
                <p className="text-xs text-slate-400">{m.detail}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* 9 & 10. Responsive Design & Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* 9. Responsive Design */}
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-slate-100 mb-3 flex items-center space-x-2">
              <Smartphone className="w-5 h-5 text-indigo-400" />
              <span>9. Responsive Design</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {caseStudy.responsiveDesign}
            </p>
          </GlassCard>

          {/* 10. Result */}
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-slate-100 mb-3 flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>10. Final Result &amp; Impact</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {caseStudy.result}
            </p>
          </GlassCard>
        </div>

        {/* 11 & 12. Actions: Live Demo & GitHub */}
        <div className="p-8 glass-card rounded-2xl text-center flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-700/80">
          <div className="text-left">
            <h3 className="text-xl font-bold text-slate-100 mb-1">
              Interested in seeing this application live?
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Placeholder URLs ready for live deployment URL replacement.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* 11. Live Demo */}
            <Button
              variant="primary"
              size="md"
              href={caseStudy.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={<ExternalLink className="w-4 h-4" />}
            >
              11. Live Demo
            </Button>

            {/* 12. GitHub */}
            <Button
              variant="outline"
              size="md"
              href={caseStudy.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={<GithubIcon className="w-4 h-4" />}
            >
              12. GitHub Repo
            </Button>
          </div>
        </div>

      </div>
    </article>
  );
};
