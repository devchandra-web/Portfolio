import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatCard } from "@/components/admin/StatCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { PROJECTS_DATA } from "@/data/projects";
import { SKILLS_DATA } from "@/data/skills";
import { EXPERIENCE_DATA } from "@/data/experience";
import { getContactSubmissions, getResumeDownloads } from "@/lib/store/submissions";
import { 
  FolderKanban, 
  CheckCircle2, 
  Code2, 
  Briefcase, 
  Sparkles, 
  Plus, 
  ArrowRight, 
  Clock,
  Mail,
  Download 
} from "lucide-react";

export const revalidate = 0; // Dynamic route

export default async function AdminDashboardPage() {
  let totalProjects = PROJECTS_DATA.length;
  let publishedProjects = PROJECTS_DATA.length;
  let draftProjects = 0;
  let totalSkills = SKILLS_DATA.length;
  let totalExperience = EXPERIENCE_DATA.length;
  let contactCount = 0;
  let downloadCount = 0;

  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  try {
    const [pTotal, pPub, pDraft, sTotal, eTotal, subs, dls] = await Promise.all([
      prisma.project?.count ? prisma.project.count().catch(() => 0) : Promise.resolve(0),
      prisma.project?.count ? prisma.project.count({ where: { published: true } }).catch(() => 0) : Promise.resolve(0),
      prisma.project?.count ? prisma.project.count({ where: { published: false } }).catch(() => 0) : Promise.resolve(0),
      prisma.skill?.count ? prisma.skill.count().catch(() => 0) : Promise.resolve(0),
      prisma.experience?.count ? prisma.experience.count().catch(() => 0) : Promise.resolve(0),
      getContactSubmissions(),
      getResumeDownloads(),
    ]);

    if (pTotal > 0) {
      totalProjects = pTotal;
      publishedProjects = pPub;
      draftProjects = pDraft;
    }
    if (sTotal > 0) totalSkills = sTotal;
    if (eTotal > 0) totalExperience = eTotal;
    contactCount = subs.length;
    downloadCount = dls.length;
  } catch {
    const subs = await getContactSubmissions();
    const dls = await getResumeDownloads();
    contactCount = subs.length;
    downloadCount = dls.length;
  }

  return (
    <div>
      <AdminHeader
        title="CMS Overview &amp; Analytics"
        subtitle="Manage your portfolio content, incoming contact form leads, and resume downloads."
        action={
          <Button
            variant="primary"
            size="sm"
            href="/admin/projects/new"
            icon={<Plus className="w-4 h-4" />}
          >
            Add New Project
          </Button>
        }
      />

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard
          title="Form Submissions"
          value={contactCount}
          subtitle="View in Admin Panel"
          icon={Mail}
          color="cyan"
        />
        <StatCard
          title="Resume Downloads"
          value={downloadCount}
          subtitle="Tracked download events"
          icon={Download}
          color="purple"
        />
        <StatCard
          title="Total Projects"
          value={totalProjects}
          subtitle={`${publishedProjects} Published • ${draftProjects} Drafts`}
          icon={FolderKanban}
          color="emerald"
        />
        <StatCard
          title="Published Projects"
          value={publishedProjects}
          subtitle="Visible on public site"
          icon={CheckCircle2}
          color="cyan"
        />
        <StatCard
          title="Total Skills"
          value={totalSkills}
          subtitle="Categorized tech stack"
          icon={Code2}
          color="purple"
        />
        <StatCard
          title="Experience Entries"
          value={totalExperience}
          subtitle="Work timeline cards"
          icon={Briefcase}
          color="indigo"
        />
        <StatCard
          title="Last Updated"
          value={lastUpdated}
          subtitle="Instant revalidation"
          icon={Clock}
          color="emerald"
        />
      </div>

      {/* Quick Actions & Recent Shortcut Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* Quick Actions Container */}
        <GlassCard className="lg:col-span-6 p-6">
          <h2 className="text-lg font-bold text-slate-100 mb-2 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>Quick Management Shortcuts</span>
          </h2>
          <p className="text-xs text-slate-400 mb-6 font-normal">
            Direct shortcuts to frequently modified CMS sections.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/admin/messages"
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/60 transition-all flex items-center justify-between group"
            >
              <div>
                <span className="block text-xs font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                  View Messages &amp; Resume
                </span>
                <span className="block text-[11px] text-slate-500">Contact form &amp; download logs</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              href="/admin/projects/new"
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-800/60 transition-all flex items-center justify-between group"
            >
              <div>
                <span className="block text-xs font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                  + Add New Project
                </span>
                <span className="block text-[11px] text-slate-500">Create project case study</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/admin/hero"
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/60 transition-all flex items-center justify-between group"
            >
              <div>
                <span className="block text-xs font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                  Edit Hero Section
                </span>
                <span className="block text-[11px] text-slate-500">Update headline &amp; CTAs</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/admin/skills"
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-800/60 transition-all flex items-center justify-between group"
            >
              <div>
                <span className="block text-xs font-bold text-slate-100 group-hover:text-purple-400 transition-colors">
                  Manage Skills
                </span>
                <span className="block text-[11px] text-slate-500">Add or edit technical stack</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/admin/experience"
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-800/60 transition-all flex items-center justify-between group"
            >
              <div>
                <span className="block text-xs font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                  Work Timeline
                </span>
                <span className="block text-[11px] text-slate-500">Edit experience entries</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </GlassCard>

        {/* Content Status & Revalidation Info */}
        <GlassCard className="lg:col-span-6 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-100 mb-2 flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              <span>Real-Time Revalidation Engine</span>
            </h2>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed font-normal">
              Any edits performed in this admin panel directly mutate PostgreSQL and trigger <strong className="text-emerald-400 font-mono">revalidatePath()</strong>. Public pages update instantly for site visitors without requiring Vercel redeployments.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Database Driver:</span>
                <span className="font-mono text-emerald-400 font-semibold">PostgreSQL / Prisma ORM</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Server Authentication:</span>
                <span className="font-mono text-cyan-400 font-semibold">HTTP-Only JWT Cookie</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400">Media Upload Storage:</span>
                <span className="font-mono text-indigo-400 font-semibold">Vercel Blob / Fallback</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
