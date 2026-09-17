"use client";

import React from "react";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { Badge } from "../ui/Badge";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle, action }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800/80">
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            {title}
          </h1>
          <Badge variant="emerald" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>
            Server Auth Active
          </Badge>
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-400 font-normal">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-3 shrink-0">
        {action}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-emerald-400 hover:border-slate-700 transition-colors shadow-sm"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
