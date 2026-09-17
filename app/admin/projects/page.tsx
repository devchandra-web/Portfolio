"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PROJECTS_DATA, Project } from "@/data/projects";
import { 
  toggleProjectPublishAction, 
  toggleProjectFeaturedAction, 
  deleteProjectAction 
} from "@/actions/projects";
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star, 
  ExternalLink, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = filterCategory === "All" || p.category === filterCategory;
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Published" && p.featured) ||
      (statusFilter === "Draft" && !p.featured);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleTogglePublish = async (id: string, currentPublished: boolean) => {
    const nextState = !currentPublished;
    setProjects((prev) =>
      prev.map((p) => (p.slug === id ? { ...p, featured: nextState } : p))
    );

    await toggleProjectPublishAction(id, nextState);
    setMessage({
      type: "success",
      text: `Project status toggled to ${nextState ? "Published" : "Draft"}.`,
    });
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    const nextState = !currentFeatured;
    setProjects((prev) =>
      prev.map((p) => (p.slug === id ? { ...p, featured: nextState } : p))
    );

    await toggleProjectFeaturedAction(id, nextState);
    setMessage({ type: "success", text: "Featured status updated!" });
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Are you sure you want to delete project "${title}"?`)) return;

    setProjects((prev) => prev.filter((p) => p.slug !== slug));
    await deleteProjectAction(slug);
    setMessage({ type: "success", text: `Project "${title}" deleted.` });
  };

  return (
    <div>
      <AdminHeader
        title="Project CMS &amp; Draft System"
        subtitle="Create, edit, delete, publish, or draft project case studies. Only published projects appear publicly."
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

      {message && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold mb-6 flex items-center space-x-2 ${
            message.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
              : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Search & Filters Toolbar */}
      <GlassCard className="p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Categories</option>
            <option value="E-Commerce">E-Commerce</option>
            <option value="SaaS">SaaS</option>
            <option value="Agency">Agency</option>
            <option value="AI Web App">AI Web App</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </GlassCard>

      {/* Projects Data Table */}
      <GlassCard className="p-0 overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <th className="py-3.5 px-4 font-semibold">Project Title</th>
                <th className="py-3.5 px-4 font-semibold">Slug</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Featured</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
              {filteredProjects.map((project) => (
                <tr key={project.slug} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-100">
                    <Link
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5"
                    >
                      <span>{project.title}</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </Link>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                    /projects/{project.slug}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant="slate" size="sm">
                      {project.category}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleTogglePublish(project.slug, project.featured)}
                      className="flex items-center space-x-1 focus:outline-none"
                    >
                      {project.featured ? (
                        <Badge variant="emerald" size="sm" icon={<Eye className="w-3 h-3" />}>
                          Published
                        </Badge>
                      ) : (
                        <Badge variant="indigo" size="sm" icon={<EyeOff className="w-3 h-3" />}>
                          Draft
                        </Badge>
                      )}
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleFeatured(project.slug, project.featured)}
                      aria-label="Toggle Featured status"
                      className="p-1 rounded text-slate-400 hover:text-amber-400 transition-colors"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          project.featured ? "text-amber-400 fill-amber-400" : "text-slate-600"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      aria-label="View public case study"
                      className="inline-flex p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/admin/projects/${project.slug}`}
                      aria-label="Edit project"
                      className="inline-flex p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(project.slug, project.title)}
                      aria-label="Delete project"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
