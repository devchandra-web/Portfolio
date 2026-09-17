"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { updateSocialLinkAction, createSocialLinkAction, deleteSocialLinkAction } from "@/actions/social";
import { Share2, CheckCircle2, AlertCircle, Plus, Trash2, Edit3 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

interface SocialItem {
  id: string;
  platform: string;
  url: string;
  icon: string;
  visible: boolean;
}

const INITIAL_SOCIALS: SocialItem[] = [
  { id: "soc-1", platform: "GitHub", url: "https://github.com/chandrashekhar", icon: "Github", visible: true },
  { id: "soc-2", platform: "LinkedIn", url: "https://linkedin.com/in/chandrashekhar", icon: "Linkedin", visible: true },
  { id: "soc-3", platform: "Email", url: "mailto:chandrashekhar.dev@example.com", icon: "Mail", visible: true },
  { id: "soc-4", platform: "Resume", url: "/resume.pdf", icon: "FileText", visible: true },
];

export default function AdminSocialPage() {
  const [socials, setSocials] = useState<SocialItem[]>(INITIAL_SOCIALS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SocialItem | null>(null);

  const [formData, setFormData] = useState({
    platform: "",
    url: "",
    icon: "Globe",
    visible: true,
    displayOrder: 1,
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({ platform: "", url: "", icon: "Globe", visible: true, displayOrder: socials.length + 1 });
    setIsModalOpen(true);
  };

  const openEditModal = (item: SocialItem) => {
    setEditingItem(item);
    setFormData({ platform: item.platform, url: item.url, icon: item.icon, visible: item.visible, displayOrder: 1 });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, platform: string) => {
    if (!confirm(`Are you sure you want to delete ${platform}?`)) return;

    setSocials((prev) => prev.filter((s) => s.id !== id));
    await deleteSocialLinkAction(id);
    setMessage({ type: "success", text: `Social link "${platform}" deleted.` });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    let res;
    if (editingItem) {
      res = await updateSocialLinkAction(editingItem.id, formData);
      setSocials((prev) =>
        prev.map((s) => (s.id === editingItem.id ? { ...s, platform: formData.platform, url: formData.url } : s))
      );
    } else {
      res = await createSocialLinkAction(formData);
      setSocials((prev) => [
        ...prev,
        { id: `soc-${Date.now()}`, platform: formData.platform, url: formData.url, icon: formData.icon, visible: true },
      ]);
    }

    if (res.success) {
      setMessage({ type: "success", text: res.message || "Social link saved!" });
      setIsModalOpen(false);
    } else {
      setMessage({ type: "error", text: res.error || "Failed to save link" });
    }

    setSaving(false);
  };

  return (
    <div>
      <AdminHeader
        title="Social Links &amp; Profiles"
        subtitle="Manage GitHub, LinkedIn, Email, Resume, and social profile links rendered in navbar and footer."
        action={
          <Button variant="primary" size="sm" onClick={openCreateModal} icon={<Plus className="w-4 h-4" />}>
            Add Social Link
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
          {message.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {socials.map((item) => (
          <GlassCard key={item.id} className="p-5 flex items-center justify-between">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 shrink-0">
                {item.platform === "GitHub" ? (
                  <GithubIcon className="w-5 h-5" />
                ) : item.platform === "LinkedIn" ? (
                  <LinkedinIcon className="w-5 h-5" />
                ) : (
                  <Share2 className="w-5 h-5" />
                )}
              </div>
              <div className="overflow-hidden">
                <span className="text-sm font-bold text-slate-100 block">{item.platform}</span>
                <span className="text-xs text-slate-400 font-mono truncate block">{item.url}</span>
              </div>
            </div>

            <div className="flex items-center space-x-1 shrink-0">
              <button onClick={() => openEditModal(item)} className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(item.id, item.platform)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-slate-100">{editingItem ? "Edit Link" : "Add Social Link"}</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Platform Name</label>
                <input
                  type="text"
                  required
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  placeholder="e.g. GitHub, X, YouTube"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target URL</label>
                <input
                  type="text"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-xs font-mono"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Link"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
