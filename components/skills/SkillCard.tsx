"use client";

import React from "react";
import { Skill } from "@/data/skills";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import { 
  Atom, 
  Zap, 
  Code2, 
  FileCode, 
  Layout, 
  Palette, 
  Wind, 
  Sparkles, 
  Smartphone, 
  Film, 
  GitBranch, 
  Terminal, 
  Globe, 
  ArrowLeftRight, 
  ShoppingBag, 
  CreditCard 
} from "lucide-react";
import { GithubIcon } from "../ui/Icons";

interface SkillCardProps {
  skill: Skill;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Atom,
  Zap,
  Code2,
  FileCode,
  Layout,
  Palette,
  Wind,
  Sparkles,
  Smartphone,
  Film,
  GitBranch,
  Github: GithubIcon,
  Terminal,
  Globe,
  ArrowLeftRight,
  ShoppingBag,
  CreditCard,
};

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const IconComponent = ICON_MAP[skill.iconName] || Code2;

  const levelVariantMap: Record<Skill['level'], 'emerald' | 'cyan' | 'indigo'> = {
    Expert: 'emerald',
    Advanced: 'cyan',
    Proficient: 'indigo',
  };

  return (
    <GlassCard
      hoverEffect={true}
      glowOnHover={skill.featured}
      className="p-5 flex flex-col justify-between h-full group"
    >
      <div>
        {/* Card Top */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 group-hover:scale-110 group-hover:border-emerald-500/40 transition-all">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                {skill.name}
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {skill.category}
              </span>
            </div>
          </div>

          <Badge variant={levelVariantMap[skill.level]} size="sm">
            {skill.level}
          </Badge>
        </div>

        {/* Usage description */}
        <p className="text-xs text-slate-400 leading-relaxed font-normal mb-4">
          {skill.usage}
        </p>
      </div>

      {/* Card Footer: Practical experience tag */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="font-mono text-slate-500">Practical Usage</span>
        <span className="font-semibold text-slate-300 font-mono">{skill.experience}</span>
      </div>
    </GlassCard>
  );
};
