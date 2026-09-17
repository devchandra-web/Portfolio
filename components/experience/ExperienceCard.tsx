import React from "react";
import { ExperienceItem } from "@/data/experience";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import { Briefcase, MapPin, Calendar, CheckCircle2 } from "lucide-react";

interface ExperienceCardProps {
  experience: ExperienceItem;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <GlassCard hoverEffect={true} className="p-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-800/80 gap-2">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-xl font-bold text-slate-100">
              {experience.role}
            </h3>
            {experience.isCurrent && (
              <Badge variant="emerald" size="sm">Present</Badge>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-medium">
            <span className="flex items-center space-x-1 text-slate-300">
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              <span>{experience.company}</span>
            </span>
            <span className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{experience.location}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 py-1.5 px-3 rounded-full border border-emerald-500/20 w-fit">
          <Calendar className="w-3.5 h-3.5" />
          <span>{experience.period}</span>
        </div>
      </div>

      <p className="text-sm text-slate-300 mb-4 leading-relaxed font-normal">
        {experience.summary}
      </p>

      {/* Responsibilities list */}
      <div className="space-y-2 mb-6">
        {experience.responsibilities.map((resp, idx) => (
          <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{resp}</span>
          </div>
        ))}
      </div>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/60">
        {experience.technologies.map((tech) => (
          <Badge key={tech} variant="slate" size="sm">
            {tech}
          </Badge>
        ))}
      </div>
    </GlassCard>
  );
};
