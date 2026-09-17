import React from "react";
import { ServiceItem } from "@/data/services";
import { GlassCard } from "../ui/GlassCard";
import { 
  Code, 
  Atom, 
  Zap, 
  Smartphone, 
  Sparkles, 
  ArrowLeftRight, 
  CheckCircle2 
} from "lucide-react";

interface ServiceCardProps {
  service: ServiceItem;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Code,
  Atom,
  Zap,
  Smartphone,
  Sparkles,
  ArrowLeftRight,
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const IconComponent = ICON_MAP[service.iconName] || Code;

  return (
    <GlassCard hoverEffect={true} glowOnHover={true} className="p-6 flex flex-col justify-between h-full group">
      <div>
        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400 w-fit mb-5 group-hover:scale-110 group-hover:border-emerald-500/40 transition-all shadow-md">
          <IconComponent className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors mb-3">
          {service.title}
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed font-normal mb-6">
          {service.description}
        </p>

        {/* Deliverables checklist */}
        <div className="space-y-2 mb-4">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block font-mono">
            Deliverables:
          </span>
          {service.deliverables.map((del, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{del}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};
