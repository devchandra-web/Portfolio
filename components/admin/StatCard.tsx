import React from "react";
import { GlassCard } from "../ui/GlassCard";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  color?: "emerald" | "cyan" | "indigo" | "amber" | "purple" | "rose";
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: IconComponent,
  color = "emerald",
}) => {
  const colors = {
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    rose: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  };

  return (
    <GlassCard hoverEffect={true} className="p-5 flex items-center justify-between">
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block font-mono mb-1">
          {title}
        </span>
        <span className="text-2xl sm:text-3xl font-black text-slate-100 font-mono tracking-tight block">
          {value}
        </span>
        {subtitle && (
          <span className="text-[11px] text-slate-500 mt-1 block font-medium">
            {subtitle}
          </span>
        )}
      </div>

      <div className={cn("p-3 rounded-xl border shrink-0", colors[color])}>
        <IconComponent className="w-6 h-6" />
      </div>
    </GlassCard>
  );
};
