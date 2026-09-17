"use client";

import React, { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatCard } from "@/components/admin/StatCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { 
  fetchContactSubmissionsAction, 
  markContactAsReadAction, 
  deleteContactSubmissionAction,
  fetchResumeDownloadsAction,
  deleteResumeDownloadAction 
} from "@/actions/submissions";
import { ContactItem, ResumeDownloadItem } from "@/lib/store/submissions";
import { 
  Mail, 
  MailOpen, 
  Download, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Clock, 
  ShieldCheck, 
  User, 
  RefreshCw 
} from "lucide-react";

export default function AdminMessagesPage() {
  const [submissions, setSubmissions] = useState<ContactItem[]>([]);
  const [downloads, setDownloads] = useState<ResumeDownloadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<"messages" | "downloads">("messages");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const loadData = async (silent = false) => {
    if (!silent) setLoading(true);
    setIsSyncing(true);
    try {
      const [subsRes, dlsRes] = await Promise.all([
        fetch("/api/contact", { cache: "no-store" }),
        fetch("/api/resume-download", { cache: "no-store" }),
      ]);
      if (subsRes.ok && dlsRes.ok) {
        const subsJson = await subsRes.json();
        const dlsJson = await dlsRes.json();
        if (subsJson.success && Array.isArray(subsJson.data)) {
          setSubmissions(subsJson.data);
        }
        if (dlsJson.success && Array.isArray(dlsJson.data)) {
          setDownloads(dlsJson.data);
        }
      } else {
        const [subs, dls] = await Promise.all([
          fetchContactSubmissionsAction(),
          fetchResumeDownloadsAction(),
        ]);
        setSubmissions(subs);
        setDownloads(dls);
      }
    } catch {
      // Fallback to Server Actions if fetch fails
      const [subs, dls] = await Promise.all([
        fetchContactSubmissionsAction(),
        fetchResumeDownloadsAction(),
      ]);
      setSubmissions(subs);
      setDownloads(dls);
    } finally {
      setLoading(false);
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    loadData(false);
    // Real-time live polling every 3 seconds for instant updates
    const interval = setInterval(() => {
      loadData(true);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, read: true } : s))
    );
    await markContactAsReadAction(id);
    setStatusMessage("Message marked as read.");
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact submission?")) return;
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    await deleteContactSubmissionAction(id);
    setStatusMessage("Message deleted.");
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleDeleteDownload = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume download log?")) return;
    setDownloads((prev) => prev.filter((d) => d.id !== id));
    await deleteResumeDownloadAction(id);
    setStatusMessage("Resume download log deleted.");
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const filteredSubmissions = submissions.filter((s) => {
    if (filter === "unread") return !s.read;
    if (filter === "read") return s.read;
    return true;
  });

  const unreadCount = submissions.filter((s) => !s.read).length;

  return (
    <div>
      <AdminHeader
        title="Form Submissions &amp; Resume Activity"
        subtitle="Track incoming client messages and monitor live resume downloads from visitors in real time."
        action={
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Real-Time Sync Active</span>
            </div>
            <button
              onClick={() => loadData(false)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 text-xs font-semibold flex items-center space-x-2 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-emerald-400" : ""}`} />
              <span>Refresh Logs</span>
            </button>
          </div>
        }
      />

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Total Form Messages"
          value={submissions.length}
          subtitle="Form submissions recorded"
          icon={Mail}
          color="cyan"
        />
        <StatCard
          title="Unread Messages"
          value={unreadCount}
          subtitle={unreadCount > 0 ? "Requires attention" : "All caught up"}
          icon={MailOpen}
          color="amber"
        />
        <StatCard
          title="Resume Downloads"
          value={downloads.length}
          subtitle="Tracked download requests"
          icon={Download}
          color="purple"
        />
        <StatCard
          title="Admin Email Target"
          value="Active"
          subtitle="cd6388881581@gmail.com"
          icon={ShieldCheck}
          color="emerald"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 mb-6 pb-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === "messages"
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Messages ({submissions.length})</span>
            {unreadCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping ml-1" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("downloads")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === "downloads"
                ? "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Resume Activity Log ({downloads.length})</span>
          </button>
        </div>

        {activeTab === "messages" && (
          <div className="flex items-center space-x-1 text-xs">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filter === "all" ? "bg-slate-800 text-slate-100 font-bold" : "text-slate-400"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filter === "unread" ? "bg-amber-500/20 text-amber-400 font-bold" : "text-slate-400"
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter("read")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filter === "read" ? "bg-emerald-500/20 text-emerald-400 font-bold" : "text-slate-400"
              }`}
            >
              Read
            </button>
          </div>
        )}
      </div>

      {/* Messages Tab View */}
      {activeTab === "messages" && (
        <div className="space-y-4">
          {filteredSubmissions.length === 0 ? (
            <GlassCard className="p-8 text-center text-slate-400">
              <MailOpen className="w-10 h-10 mx-auto text-slate-600 mb-3" />
              <p className="text-sm font-semibold text-slate-300">No contact submissions found.</p>
              <p className="text-xs text-slate-500 mt-1">
                Form submissions filled out by visitors on your website will appear here in real time.
              </p>
            </GlassCard>
          ) : (
            filteredSubmissions.map((sub) => (
              <GlassCard
                key={sub.id}
                className={`p-5 transition-all border ${
                  !sub.read
                    ? "border-amber-500/30 bg-amber-500/[0.02]"
                    : "border-slate-800/80"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-800/60 gap-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 flex items-center justify-center font-bold text-sm shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-bold text-slate-100">{sub.name}</h3>
                        {!sub.read && (
                          <Badge variant="indigo" size="sm">New Message</Badge>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-mono">{sub.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{new Date(sub.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {/* Subject & Message Content */}
                <div className="mb-4">
                  <span className="block text-xs font-bold text-cyan-400 mb-1">
                    Subject: {sub.subject}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60 whitespace-pre-wrap">
                    {sub.message}
                  </p>
                </div>

                {/* Actions Footer */}
                <div className="flex items-center justify-between pt-2 text-xs">
                  <a
                    href={`mailto:${sub.email}?subject=Re: ${encodeURIComponent(sub.subject)}`}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold hover:bg-emerald-500/20 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                  </a>

                  <div className="flex items-center space-x-2">
                    {!sub.read && (
                      <button
                        onClick={() => handleMarkAsRead(sub.id)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors font-medium"
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(sub.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))
          )}
        </div>
      )}

      {/* Downloads Tab View */}
      {activeTab === "downloads" && (
        <GlassCard className="p-0 overflow-hidden border border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/80 text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <th className="py-3.5 px-4 font-semibold">User Lead Email</th>
                  <th className="py-3.5 px-4 font-semibold">Timestamp</th>
                  <th className="py-3.5 px-4 font-semibold">IP Address</th>
                  <th className="py-3.5 px-4 font-semibold">Device / User Agent</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                {downloads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500 font-medium">
                      No resume download leads recorded yet.
                    </td>
                  </tr>
                ) : (
                  downloads.map((dl) => (
                    <tr key={dl.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-400 text-xs">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate max-w-[200px]" title={dl.email}>
                            {dl.email}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        {new Date(dl.downloadedAt).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">
                        {dl.ip}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px] max-w-xs truncate" title={dl.userAgent}>
                        {dl.userAgent}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {dl.email && dl.email !== "Not Provided" ? (
                            <a
                              href={`mailto:${dl.email}?subject=Resume Follow Up — Chandra Shekhar (Full Stack Developer)`}
                              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold hover:bg-emerald-500/20 transition-colors text-[11px]"
                            >
                              <Send className="w-3 h-3" />
                              <span>Contact Lead</span>
                            </a>
                          ) : (
                            <Badge variant="cyan" size="sm">
                              Downloaded
                            </Badge>
                          )}
                          <button
                            onClick={() => handleDeleteDownload(dl.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete resume download entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
