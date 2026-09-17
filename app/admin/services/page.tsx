"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SERVICES_DATA, ServiceItem } from "@/data/services";
import { createServiceAction, updateServiceAction, deleteServiceAction } from "@/actions/services";
import { Plus, Trash2, Edit3, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(SERVICES_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Code",
    deliverables: "Semantic HTML5, Clean CSS/Tailwind, Cross-Browser Compatibility",
    visible: true,
    displayOrder: 1,
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      icon: "Code",
      deliverables: "Semantic HTML5, Clean CSS/Tailwind, Cross-Browser Compatibility",
      visible: true,
      displayOrder: services.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: ServiceItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      icon: item.iconName,
      deliverables: item.deliverables.join(", "),
      visible: true,
      displayOrder: 1,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete service "${title}"?`)) return;

    setServices((prev) => prev.filter((s) => s.id !== id));
    await deleteServiceAction(id);
    setMessage({ type: "success", text: `Service "${title}" deleted.` });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const delList = formData.deliverables.split(",").map((d) => d.trim()).filter(Boolean);
    const payload = {
      ...formData,
      deliverables: JSON.stringify(delList),
    };

    let res;
    if (editingItem) {
      res = await updateServiceAction(editingItem.id, payload);
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingItem.id
            ? { ...s, title: formData.title, description: formData.description, deliverables: delList }
            : s
        )
      );
    } else {
      res = await createServiceAction(payload);
      setServices((prev) => [
        ...prev,
        {
          id: `srv-${Date.now()}`,
          title: formData.title,
          description: formData.description,
          iconName: formData.icon,
          deliverables: delList,
        },
      ]);
    }

    if (res.success) {
      setMessage({ type: "success", text: res.message || "Service saved successfully!" });
      setIsModalOpen(false);
    } else {
      setMessage({ type: "error", text: res.error || "Failed to save service" });
    }

    setSaving(false);
  };

  return (
    <div>
      <AdminHeader
        title="Services CMS"
        subtitle="Manage frontend offerings, descriptions, Lucide icons, and deliverables."
        action={
          <Button variant="primary" size="sm" onClick={openCreateModal} icon={<Plus className="w-4 h-4" />}>
            Add Service
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((item) => (
          <GlassCard key={item.id} className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-slate-100">{item.title}</h3>
                <div className="flex items-center space-x-1">
                  <button onClick={() => openEditModal(item)} className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id, item.title)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{item.description}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-slate-100">{editingItem ? "Edit Service" : "Add Service"}</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-xs resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Deliverables (Comma separated)</label>
                <input
                  type="text"
                  value={formData.deliverables}
                  onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-xs"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Service"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
