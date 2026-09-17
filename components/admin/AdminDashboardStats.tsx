"use client";

import React, { useState, useEffect } from "react";
import { StatCard } from "./StatCard";
import { 
  FolderKanban, 
  CheckCircle2, 
  Code2, 
  Briefcase, 
  Clock,
  Mail,
  Download 
} from "lucide-react";

interface AdminDashboardStatsProps {
  initialContactCount: number;
  initialDownloadCount: number;
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  totalSkills: number;
  totalExperience: number;
  lastUpdated: string;
}

export const AdminDashboardStats: React.FC<AdminDashboardStatsProps> = ({
  initialContactCount,
  initialDownloadCount,
  totalProjects,
  publishedProjects,
  draftProjects,
  totalSkills,
  totalExperience,
  lastUpdated,
}) => {
  const [contactCount, setContactCount] = useState<number>(initialContactCount);
  const [downloadCount, setDownloadCount] = useState<number>(initialDownloadCount);

  const fetchLiveCounts = async () => {
    try {
      // 1. Check client local storage for persisted submissions & downloads
      let localSubCount = 0;
      let localDlCount = 0;

      try {
        const savedSubs = localStorage.getItem("portfolio_admin_submissions");
        const savedDls = localStorage.getItem("portfolio_admin_downloads");
        if (savedSubs) {
          const parsedSubs = JSON.parse(savedSubs);
          if (Array.isArray(parsedSubs)) localSubCount = parsedSubs.length;
        }
        if (savedDls) {
          const parsedDls = JSON.parse(savedDls);
          if (Array.isArray(parsedDls)) localDlCount = parsedDls.length;
        }
      } catch {
        // Ignore storage errors
      }

      // 2. Fetch live counts from API endpoints with no-store cache
      const [subsRes, dlsRes] = await Promise.all([
        fetch("/api/contact", { cache: "no-store" }),
        fetch("/api/resume-download", { cache: "no-store" }),
      ]);

      let apiSubCount = 0;
      let apiDlCount = 0;

      if (subsRes.ok && dlsRes.ok) {
        const subsJson = await subsRes.json();
        const dlsJson = await dlsRes.json();
        if (subsJson.success && Array.isArray(subsJson.data)) {
          apiSubCount = subsJson.data.length;
          // Sync to localStorage
          try {
            const savedSubs = localStorage.getItem("portfolio_admin_submissions");
            const existing = savedSubs ? JSON.parse(savedSubs) : [];
            const map = new Map();
            for (const item of existing) map.set(item.id, item);
            for (const item of subsJson.data) map.set(item.id, item);
            const merged = Array.from(map.values());
            localStorage.setItem("portfolio_admin_submissions", JSON.stringify(merged));
            localSubCount = merged.length;
          } catch {
            // Ignore
          }
        }
        if (dlsJson.success && Array.isArray(dlsJson.data)) {
          apiDlCount = dlsJson.data.length;
          // Sync to localStorage
          try {
            const savedDls = localStorage.getItem("portfolio_admin_downloads");
            const existing = savedDls ? JSON.parse(savedDls) : [];
            const map = new Map();
            for (const item of existing) map.set(item.id, item);
            for (const item of dlsJson.data) map.set(item.id, item);
            const merged = Array.from(map.values());
            localStorage.setItem("portfolio_admin_downloads", JSON.stringify(merged));
            localDlCount = merged.length;
          } catch {
            // Ignore
          }
        }
      }

      // Compute maximum quantity count so counter only INCREASES when new data arrives
      const finalContactCount = Math.max(initialContactCount, localSubCount, apiSubCount);
      const finalDownloadCount = Math.max(initialDownloadCount, localDlCount, apiDlCount);

      setContactCount(finalContactCount);
      setDownloadCount(finalDownloadCount);
    } catch {
      // Ignore network errors
    }
  };

  useEffect(() => {
    fetchLiveCounts();
    // Real-time live polling every 3 seconds for instant counter increase
    const interval = setInterval(fetchLiveCounts, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
      <StatCard
        title="Form Submissions"
        value={contactCount}
        subtitle={contactCount > 0 ? `${contactCount} Form Lead(s) Recorded` : "No submissions yet"}
        icon={Mail}
        color="cyan"
      />
      <StatCard
        title="Resume Downloads"
        value={downloadCount}
        subtitle={downloadCount > 0 ? `${downloadCount} Resume Event(s)` : "No downloads yet"}
        icon={Download}
        color="purple"
      />
      <StatCard
        title="Total Projects"
        value={totalProjects}
        subtitle={`${publishedProjects} Published • ${draftProjects} Drafts`}
        icon={FolderKanban}
        color="emerald"
      />
      <StatCard
        title="Published Projects"
        value={publishedProjects}
        subtitle="Visible on public site"
        icon={CheckCircle2}
        color="cyan"
      />
      <StatCard
        title="Total Skills"
        value={totalSkills}
        subtitle="Categorized tech stack"
        icon={Code2}
        color="purple"
      />
      <StatCard
        title="Experience Entries"
        value={totalExperience}
        subtitle="Work timeline cards"
        icon={Briefcase}
        color="indigo"
      />
      <StatCard
        title="Last Updated"
        value={lastUpdated}
        subtitle="Live counter sync"
        icon={Clock}
        color="emerald"
      />
    </div>
  );
};
