import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowOnHover?: boolean;
  onClick?: () => void;
  id?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hoverEffect = true,
  glowOnHover = false,
  onClick,
  id,
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={cn(
        "glass-card rounded-2xl p-6 relative overflow-hidden transition-all duration-300",
        hoverEffect && "hover:-translate-y-1 hover:border-slate-600/60 hover:shadow-xl hover:shadow-emerald-950/20",
        glowOnHover && "gradient-border-glow",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};
