"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SKILLS_DATA, Skill as SkillItem } from "@/data/skills";
import { createSkillAction, updateSkillAction, deleteSkillAction } from "@/actions/skills";
import { Plus, Trash2, Edit3, CheckCircle2, AlertCircle, Code2 } from "lucide-react";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<SkillItem[]>(SKILLS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend" as "Frontend" | "Styling" | "Tools" | "Integration" | "API" | "Other",
    icon: "Code2",
    level: "Expert" as "Expert" | "Advanced" | "Proficient",
    visible: true,
    displayOrder: 0,
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const openCreateModal = () => {
    setEditingSkill(null);
    setFormData({
      name: "",
      category: "Frontend",
      icon: "Code2",
      level: "Expert",
      visible: true,
      displayOrder: skills.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (skill: SkillItem) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: (skill.category as "Frontend" | "Styling" | "Tools" | "API" | "Other") || "Frontend",
      icon: skill.iconName || "Code2",
      level: skill.level || "Expert",
      visible: true,
      displayOrder: 1,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (skillName: string) => {
    if (!confirm(`Are you sure you want to delete "${skillName}"?`)) return;

    setSkills((prev) => prev.filter((s) => s.name !== skillName));
    await deleteSkillAction(skillName);
    setMessage({ type: "success", text: `Skill "${skillName}" deleted.` });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    let res;
    if (editingSkill) {
      res = await updateSkillAction(editingSkill.name, formData);
      setSkills((prev) =>
        prev.map((s) =>
          s.name === editingSkill.name
            ? { ...s, name: formData.name, category: formData.category as SkillItem['category'], level: formData.level }
            : s
        )
      );
    } else {
      res = await createSkillAction(formData);
      setSkills((prev) => [
        ...prev,
        {
          name: formData.name,
          category: formData.category as SkillItem['category'],
          level: formData.level,
          experience: "1+ Years",
          usage: "Practical engineering usage",
          iconName: formData.icon,
        },
      ]);
    }

    if (res.success) {
      setMessage({ type: "success", text: res.message || "Skill saved successfully!" });
      setIsModalOpen(false);
    } else {
      setMessage({ type: "error", text: res.error || "Failed to save skill" });
    }

    setSaving(false);
  };

  return (
    <div>
      <AdminHeader
        title="Skills CMS &amp; Matrix"
        subtitle="Manage technical skills, categories, proficiency levels, and order."
        action={
          <Button
            variant="primary"
            size="sm"
            onClick={openCreateModal}
            icon={<Plus className="w-4 h-4" />}
          >
            Add New Skill
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

      {/* Skills Data Table */}
      <GlassCard className="p-0 overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <th className="py-3.5 px-4 font-semibold">Skill Name</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Proficiency Level</th>
                <th className="py-3.5 px-4 font-semibold">Practical Usage</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
              {skills.map((skill) => (
                <tr key={skill.name} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-100 flex items-center space-x-2">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    <span>{skill.name}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">{skill.category}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={skill.level === "Expert" ? "emerald" : "cyan"} size="sm">
                      {skill.level}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate">{skill.usage}</td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(skill)}
                      aria-label={`Edit ${skill.name}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(skill.name)}
                      aria-label={`Delete ${skill.name}`}
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

      {/* Modal for Create/Edit Skill */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-slate-100">
              {editingSkill ? "Edit Skill" : "Add New Skill"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Next.js, TypeScript"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as "Frontend" | "Styling" | "Tools" | "Integration" | "API" | "Other" })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Styling">Styling</option>
                  <option value="Tools">Tools</option>
                  <option value="Integration">Integration / API</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Proficiency Level
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value as SkillItem["level"] })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Expert">Expert</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Proficient">Proficient</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Skill"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
