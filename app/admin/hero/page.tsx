"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { updateHeroAction } from "@/actions/hero";
import { Save, CheckCircle2, AlertCircle, Loader2, Sparkles } from "lucide-react";

export default function AdminHeroPage() {
  const [formData, setFormData] = useState({
    name: "Chandra Shekhar",
    role: "Frontend Developer",
    headline: "Building Modern Web Experiences That Perform.",
    subtitle: "I'm Chandra Shekhar, a Frontend Developer focused on building responsive, scalable and visually engaging web applications with React and Next.js.",
    description: "Passionate about clean component architecture, responsive layout design, web performance optimization, and REST API integration.",
    primaryCtaText: "View My Work",
    primaryCtaUrl: "#projects",
    secondaryCtaText: "Let's Talk",
    secondaryCtaUrl: "#contact",
    resumeUrl: "/resume.pdf",
    profileImage: "/images/project-saas.svg",
    availabilityStatus: "Available for Hire & Frontend Projects",
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

    const res = await updateHeroAction(formData);

    if (res.success) {
      setMessage({ type: "success", text: res.message || "Hero section updated!" });
    } else {
      setMessage({ type: "error", text: res.error || "Failed to update Hero section" });
    }

    setSaving(false);
  };

  return (
    <div>
      <AdminHeader
        title="Hero Section CMS"
        subtitle="Edit your headline, subheadline, CTAs, availability badge, and profile asset."
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
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-100">Hero Main Content</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Developer Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Professional Role
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Main Headline
            </label>
            <input
              type="text"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Subheading
            </label>
            <textarea
              name="subtitle"
              rows={3}
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Detailed Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Availability Status Badge Text
            </label>
            <input
              type="text"
              name="availabilityStatus"
              value={formData.availabilityStatus}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* CTA Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Primary CTA Text &amp; URL
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="primaryCtaText"
                  value={formData.primaryCtaText}
                  onChange={handleChange}
                  placeholder="View My Work"
                  className="w-1/2 px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-xs"
                />
                <input
                  type="text"
                  name="primaryCtaUrl"
                  value={formData.primaryCtaUrl}
                  onChange={handleChange}
                  placeholder="#projects"
                  className="w-1/2 px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Secondary CTA Text &amp; URL
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="secondaryCtaText"
                  value={formData.secondaryCtaText}
                  onChange={handleChange}
                  placeholder="Let's Talk"
                  className="w-1/2 px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-xs"
                />
                <input
                  type="text"
                  name="secondaryCtaUrl"
                  value={formData.secondaryCtaUrl}
                  onChange={handleChange}
                  placeholder="#contact"
                  className="w-1/2 px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Resume Download Link / URL
              </label>
              <input
                type="text"
                name="resumeUrl"
                value={formData.resumeUrl}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Profile Image Asset URL
              </label>
              <input
                type="text"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
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
            {saving ? "Saving Changes..." : "Save Hero Section"}
          </Button>
        </div>
      </form>
    </div>
  );
}
