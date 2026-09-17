"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { updateAboutAction } from "@/actions/about";
import { Save, CheckCircle2, AlertCircle, Loader2, User } from "lucide-react";

export default function AdminAboutPage() {
  const [formData, setFormData] = useState({
    title: "Engineering Sleek & Scalable Interfaces",
    introduction: "I specialize in turning complex product ideas into fast, accessible, and production-ready frontend web applications.",
    description: "My expertise centers around the modern React ecosystem—specifically Next.js App Router, TypeScript, and Tailwind CSS. I write clean, maintainable code that delivers real business value.",
    profileImage: "/images/project-saas.svg",
    location: "Bengaluru, India (Available Remote Worldwide)",
    availability: "Full-Time / Freelance",
    developmentPhilosophy: "Building reusable components, responsive-first layout design, clean TypeScript typing, and relentless performance optimization.",
    approach: "01 Understand -> 02 Design -> 03 Build -> 04 Test -> 05 Optimize -> 06 Deploy",
    personalSummary: "Dedicated frontend developer with 3+ years of experience engineering high-impact web apps.",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const res = await updateAboutAction(formData);

    if (res.success) {
      setMessage({ type: "success", text: res.message || "About section updated!" });
    } else {
      setMessage({ type: "error", text: res.error || "Failed to update About section" });
    }

    setSaving(false);
  };

  return (
    <div>
      <AdminHeader
        title="About Section CMS"
        subtitle="Manage your developer story, location, availability, and engineering philosophy."
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
            <User className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-slate-100">About Content</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Section Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Introduction Statement
            </label>
            <textarea
              name="introduction"
              rows={2}
              value={formData.introduction}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Full Narrative Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Availability Type
              </label>
              <input
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Development Philosophy
            </label>
            <textarea
              name="developmentPhilosophy"
              rows={2}
              value={formData.developmentPhilosophy}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Personal Summary Statement
            </label>
            <input
              type="text"
              name="personalSummary"
              value={formData.personalSummary}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Profile Image URL
            </label>
            <input
              type="text"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </GlassCard>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="glow"
            size="lg"
            disabled={saving}
            icon={saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          >
            {saving ? "Saving Changes..." : "Save About Section"}
          </Button>
        </div>
      </form>
    </div>
  );
}
