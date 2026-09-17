import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "emerald" | "cyan" | "indigo" | "slate" | "outline";
  size?: "sm" | "md";
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "slate",
  size = "sm",
  className,
  icon,
}) => {
  const baseStyles =
    "inline-flex items-center font-medium rounded-full transition-colors";

  const variants = {
    emerald: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    cyan: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
    indigo: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
    slate: "bg-slate-800/80 text-slate-300 border border-slate-700/60",
    outline: "bg-transparent text-slate-300 border border-slate-700",
  };

  const sizes = {
    sm: "text-xs px-2.5 py-0.5 gap-1.5",
    md: "text-sm px-3 py-1 gap-2",
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)}>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
