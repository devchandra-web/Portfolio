"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { PROJECTS_DATA } from "@/data/projects";
import { updateProjectAction } from "@/actions/projects";
import { Save, CheckCircle2, AlertCircle, Loader2, ArrowLeft, FolderEdit } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditProjectPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  const existingProject = PROJECTS_DATA.find((p) => p.slug === id);

  const [formData, setFormData] = useState({
    title: existingProject?.title || "",
    slug: existingProject?.slug || id,
    subtitle: existingProject?.subtitle || "",
    shortDescription: existingProject?.shortDescription || "",
    fullDescription: existingProject?.caseStudy.overview || "",
    category: existingProject?.category || "SaaS",
    problem: existingProject?.caseStudy.problem || "",
    solution: existingProject?.caseStudy.solution || "",
    features: existingProject?.caseStudy.features.join(", ") || "",
    challenges: existingProject?.caseStudy.challenges.map((c) => c.challenge).join("; ") || "",
    result: existingProject?.caseStudy.result || "",
    mainImage: existingProject?.image || "/images/project-saas.svg",
    galleryImages: "[]",
    liveDemoUrl: existingProject?.demoUrl || "#",
    githubUrl: existingProject?.githubUrl || "#",
    caseStudy: existingProject?.caseStudy.overview || "",
    featured: existingProject?.featured || false,
    published: true,
    displayOrder: 1,
  });

  const [techInput, setTechInput] = useState(
    existingProject?.technologies.join(", ") || "Next.js, TypeScript"
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const techArray = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      technologies: techArray,
    };

    const res = await updateProjectAction(id, payload);

    if (res.success) {
      setMessage({ type: "success", text: "Project updated successfully!" });
      setTimeout(() => {
        router.push("/admin/projects");
      }, 1000);
    } else {
      setMessage({ type: "error", text: res.error || "Failed to update project" });
    }

    setSaving(false);
  };

  return (
    <div>
      <AdminHeader
        title={`Edit Project: ${formData.title || id}`}
        subtitle="Modify project case study content, URLs, status, or featured visibility."
        action={
          <Button
            variant="outline"
            size="sm"
            href="/admin/projects"
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Projects
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <GlassCard className="p-6 sm:p-8 space-y-5">
          <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
            <FolderEdit className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-100">Project Data</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Project Title <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                URL Slug <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                required
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="E-Commerce">E-Commerce</option>
                <option value="SaaS">SaaS</option>
                <option value="Agency">Agency</option>
                <option value="AI Web App">AI Web App</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Short Description
            </label>
            <textarea
              name="shortDescription"
              rows={2}
              value={formData.shortDescription}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Problem
              </label>
              <textarea
                name="problem"
                rows={3}
                value={formData.problem}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Solution
              </label>
              <textarea
                name="solution"
                rows={3}
                value={formData.solution}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Technologies (Comma separated)
            </label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Main Image Asset URL
              </label>
              <input
                type="text"
                name="mainImage"
                value={formData.mainImage}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Result &amp; Impact
              </label>
              <input
                type="text"
                name="result"
                value={formData.result}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Live Demo URL
              </label>
              <input
                type="text"
                name="liveDemoUrl"
                value={formData.liveDemoUrl}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                GitHub URL
              </label>
              <input
                type="text"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Status Toggles */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-800">
            <label className="flex items-center space-x-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-950 border-slate-800"
              />
              <span className="text-xs font-bold text-slate-200">
                Published (Visible Publicly)
              </span>
            </label>

            <label className="flex items-center space-x-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-950 border-slate-800"
              />
              <span className="text-xs font-bold text-slate-200">
                Featured on Homepage
              </span>
            </label>
          </div>
        </GlassCard>

        <div className="flex justify-end space-x-3">
          <Button variant="ghost" size="lg" href="/admin/projects">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="glow"
            size="lg"
            disabled={saving}
            icon={saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          >
            {saving ? "Updating..." : "Update Project"}
          </Button>
        </div>
      </form>
    </div>
  );
}
