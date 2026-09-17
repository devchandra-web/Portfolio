"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { updateSettingsAction } from "@/actions/settings";
import { Save, CheckCircle2, AlertCircle, Loader2, Settings } from "lucide-react";

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState({
    siteName: "Chandra Shekhar Portfolio",
    developerName: "Chandra Shekhar",
    jobTitle: "Frontend Developer",
    email: "chandrashekhar.dev@example.com",
    location: "Bengaluru, India",
    resumeUrl: "/resume.pdf",
    availability: "Available for Hire & Frontend Projects",
    copyright: "© 2026 Chandra Shekhar. All rights reserved.",
    theme: "dark",
    analyticsId: "",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const res = await updateSettingsAction(formData);

    if (res.success) {
      setMessage({ type: "success", text: res.message || "Site settings updated!" });
    } else {
      setMessage({ type: "error", text: res.error || "Failed to update settings" });
    }

    setSaving(false);
  };

  return (
    <div>
      <AdminHeader
        title="Site Settings CMS"
        subtitle="Manage global developer metadata, email address, default theme, and copyright string."
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
            <Settings className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-100">Global Portfolio Settings</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Portfolio Site Name</label>
              <input
                type="text"
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Developer Full Name</label>
              <input
                type="text"
                name="developerName"
                value={formData.developerName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Public Contact Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Default Theme Mode</label>
              <select
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-sm"
              >
                <option value="dark">Dark Theme (Recommended)</option>
                <option value="light">Light Theme</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Copyright Text Notice</label>
            <input
              type="text"
              name="copyright"
              value={formData.copyright}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-sm"
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
            {saving ? "Saving..." : "Save Site Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}
