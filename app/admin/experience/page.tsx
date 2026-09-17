"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EXPERIENCE_DATA, ExperienceItem } from "@/data/experience";
import { 
  createExperienceAction, 
  updateExperienceAction, 
  deleteExperienceAction 
} from "@/actions/experience";
import { Plus, Trash2, Edit3, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(EXPERIENCE_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ExperienceItem | null>(null);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "Remote / Bengaluru, India",
    startDate: "2023",
    endDate: "Present",
    description: "",
    responsibilities: "Developed responsive interfaces\nBuilt reusable React components",
    technologies: "Next.js, React, TypeScript, Tailwind CSS",
    currentPosition: true,
    displayOrder: 1,
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      company: "",
      role: "",
      location: "Remote / Bengaluru, India",
      startDate: "2023",
      endDate: "Present",
      description: "",
      responsibilities: "Developed responsive interfaces\nBuilt reusable React components",
      technologies: "Next.js, React, TypeScript, Tailwind CSS",
      currentPosition: true,
      displayOrder: experiences.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: ExperienceItem) => {
    setEditingItem(item);
    setFormData({
      company: item.company,
      role: item.role,
      location: item.location,
      startDate: item.period.split("—")[0]?.trim() || "2023",
      endDate: item.period.split("—")[1]?.trim() || "Present",
      description: item.summary,
      responsibilities: item.responsibilities.join("\n"),
      technologies: item.technologies.join(", "),
      currentPosition: Boolean(item.isCurrent),
      displayOrder: 1,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, role: string) => {
    if (!confirm(`Are you sure you want to delete experience "${role}"?`)) return;

    setExperiences((prev) => prev.filter((e) => e.id !== id));
    await deleteExperienceAction(id);
    setMessage({ type: "success", text: `Experience "${role}" deleted.` });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const respList = formData.responsibilities.split("\n").filter(Boolean);
    const techList = formData.technologies.split(",").map((t) => t.trim()).filter(Boolean);

    const payload = {
      ...formData,
      responsibilities: JSON.stringify(respList),
      technologies: JSON.stringify(techList),
    };

    let res;
    if (editingItem) {
      res = await updateExperienceAction(editingItem.id, payload);
      setExperiences((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                role: formData.role,
                company: formData.company,
                period: `${formData.startDate} — ${formData.endDate}`,
                summary: formData.description,
                responsibilities: respList,
                technologies: techList,
              }
            : item
        )
      );
    } else {
      res = await createExperienceAction(payload);
      setExperiences((prev) => [
        {
          id: `exp-${Date.now()}`,
          role: formData.role,
          company: formData.company,
          location: formData.location,
          period: `${formData.startDate} — ${formData.endDate}`,
          isCurrent: formData.currentPosition,
          summary: formData.description,
          responsibilities: respList,
          technologies: techList,
        },
        ...prev,
      ]);
    }

    if (res.success) {
      setMessage({ type: "success", text: res.message || "Experience entry saved!" });
      setIsModalOpen(false);
    } else {
      setMessage({ type: "error", text: res.error || "Failed to save experience" });
    }

    setSaving(false);
  };

  return (
    <div>
      <AdminHeader
        title="Experience CMS &amp; Timeline"
        subtitle="Manage professional experience entries, responsibilities, and timeline dates."
        action={
          <Button
            variant="primary"
            size="sm"
            onClick={openCreateModal}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Experience
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

      {/* Experience List Grid */}
      <div className="space-y-4">
        {experiences.map((item) => (
          <GlassCard key={item.id} className="p-6 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h3 className="text-base font-bold text-slate-100">{item.role}</h3>
                <Badge variant="emerald" size="sm">{item.company}</Badge>
              </div>
              <span className="text-xs text-slate-400 font-mono block mb-2">{item.period} • {item.location}</span>
              <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">{item.summary}</p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => openEditModal(item)}
                className="p-2 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id, item.role)}
                className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-100">
              {editingItem ? "Edit Experience Entry" : "Add Experience Entry"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Role Title</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Frontend Developer"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Tech Products Co."
                    className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Start Date</label>
                  <input
                    type="text"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    placeholder="2023"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">End Date</label>
                  <input
                    type="text"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    placeholder="Present"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Role Summary</label>
                <textarea
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-xs resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Responsibilities (One per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-xs resize-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Technologies (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-xs"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Entry"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
