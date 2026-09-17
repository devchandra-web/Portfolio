"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { deleteMediaAction } from "@/actions/media";
import { Upload, Copy, Check, Trash2, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: number;
}

const INITIAL_MEDIA: MediaItem[] = [
  { id: "med-1", name: "project-ecommerce.svg", url: "/images/project-ecommerce.svg", size: 4200 },
  { id: "med-2", name: "project-saas.svg", url: "/images/project-saas.svg", size: 3800 },
  { id: "med-3", name: "project-agency.svg", url: "/images/project-agency.svg", size: 3900 },
  { id: "med-4", name: "project-ai.svg", url: "/images/project-ai.svg", size: 4100 },
];

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Upload failed");
      }

      const newMedia = {
        id: data.media.id || `med-${Date.now()}`,
        name: data.media.name || file.name,
        url: data.media.url,
        size: data.media.size || file.size,
      };

      setMediaList((prev) => [newMedia, ...prev]);
      setMessage({ type: "success", text: "Media file uploaded successfully!" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload error";
      setMessage({ type: "error", text: msg });
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete asset "${name}"?`)) return;

    setMediaList((prev) => prev.filter((m) => m.id !== id));
    await deleteMediaAction(id);
    setMessage({ type: "success", text: `Asset "${name}" deleted.` });
  };

  return (
    <div>
      <AdminHeader
        title="Media &amp; Asset CMS"
        subtitle="Upload project screenshots, profile assets, hero illustrations, and copy public URLs."
        action={
          <label className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-semibold text-xs cursor-pointer shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-cyan-400 transition-all">
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            <span>{uploading ? "Uploading..." : "Upload New Asset"}</span>
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
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

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mediaList.map((media) => (
          <GlassCard key={media.id} className="p-0 overflow-hidden flex flex-col justify-between border border-slate-800">
            <div>
              <div className="relative w-full h-44 bg-slate-900 overflow-hidden">
                <Image
                  src={media.url}
                  alt={media.name}
                  fill
                  sizes="300px"
                  className="object-cover object-center"
                />
              </div>

              <div className="p-4">
                <span className="text-xs font-bold text-slate-100 block truncate mb-1">
                  {media.name}
                </span>
                <span className="text-[11px] text-slate-500 font-mono block truncate">
                  {media.url}
                </span>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-slate-800/60 mt-auto flex items-center justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyUrl(media.url, media.id)}
                icon={copiedId === media.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                className="w-full text-xs"
              >
                {copiedId === media.id ? "Copied!" : "Copy URL"}
              </Button>

              <button
                onClick={() => handleDelete(media.id, media.name)}
                aria-label={`Delete ${media.name}`}
                className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
