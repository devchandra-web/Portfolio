"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { updateSeoAction } from "@/actions/seo";
import { Save, CheckCircle2, AlertCircle, Loader2, Search } from "lucide-react";

export default function AdminSeoPage() {
  const [formData, setFormData] = useState({
    siteTitle: "Chandra Shekhar | Frontend Developer",
    metaDescription: "Frontend Developer specializing in building responsive, scalable, and visually engaging web applications with React, Next.js, TypeScript, and Tailwind CSS.",
    ogTitle: "Chandra Shekhar | Frontend Developer Portfolio",
    ogDescription: "Building modern web experiences that perform. Specializing in React, Next.js, TypeScript, and high-performance UI engineering.",
    ogImage: "/images/project-saas.svg",
    twitterTitle: "Chandra Shekhar | Frontend Developer",
    twitterDescription: "Frontend Developer building scalable web applications with React, Next.js, and TypeScript.",
    twitterImage: "/images/project-saas.svg",
    canonicalUrl: "https://chandrashekhar-portfolio.vercel.app",
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

    const res = await updateSeoAction(formData);

    if (res.success) {
      setMessage({ type: "success", text: res.message || "SEO metadata updated!" });
    } else {
      setMessage({ type: "error", text: res.error || "Failed to update SEO" });
    }

    setSaving(false);
  };

  return (
    <div>
      <AdminHeader
        title="SEO &amp; OpenGraph CMS"
        subtitle="Manage search engine title tags, meta descriptions, OpenGraph social sharing images, and canonical URLs."
      />

      {message && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold mb-6 flex items-center space-x-2 ${
            message.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
              : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
          }`}
        >
          {message.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <GlassCard className="p-6 sm:p-8 space-y-5">
          <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
            <Search className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold text-slate-100">Global SEO Metadata</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Default Site Title</label>
            <input
              type="text"
              name="siteTitle"
              value={formData.siteTitle}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Meta Description</label>
            <textarea
              name="metaDescription"
              rows={3}
              value={formData.metaDescription}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">OpenGraph Title</label>
              <input
                type="text"
                name="ogTitle"
                value={formData.ogTitle}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">OpenGraph Image URL</label>
              <input
                type="text"
                name="ogImage"
                value={formData.ogImage}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Canonical Site URL</label>
            <input
              type="text"
              name="canonicalUrl"
              value={formData.canonicalUrl}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm font-mono"
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
            {saving ? "Saving..." : "Save SEO Metadata"}
          </Button>
        </div>
      </form>
    </div>
  );
}
