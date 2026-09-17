import React from "react";
import { GlassCard } from "../ui/GlassCard";
import { 
  Lightbulb, 
  LayoutGrid, 
  Code2, 
  CheckCircle2, 
  Gauge, 
  Rocket 
} from "lucide-react";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Understand",
    description: "Analyze project goals, user requirements, design wireframes, and technical specifications before writing code.",
    icon: Lightbulb,
    color: "text-amber-400",
  },
  {
    number: "02",
    title: "Design",
    description: "Structure component hierarchies, responsive layout grids, color tokens, and state flows.",
    icon: LayoutGrid,
    color: "text-cyan-400",
  },
  {
    number: "03",
    title: "Build",
    description: "Implement clean, modular React & Next.js components using TypeScript and utility-first Tailwind CSS.",
    icon: Code2,
    color: "text-emerald-400",
  },
  {
    number: "04",
    title: "Test",
    description: "Verify cross-browser rendering, mobile responsiveness (320px to 4K), form inputs, and error boundaries.",
    icon: CheckCircle2,
    color: "text-indigo-400",
  },
  {
    number: "05",
    title: "Optimize",
    description: "Refactor code bundles, optimize image delivery, eliminate layout shifts, and target 90+ Lighthouse scores.",
    icon: Gauge,
    color: "text-purple-400",
  },
  {
    number: "06",
    title: "Deploy",
    description: "Automate production releases via Vercel CI/CD pipelines, configure custom domains, and monitor live health.",
    icon: Rocket,
    color: "text-rose-400",
  },
];

export const ProcessSteps: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {PROCESS_STEPS.map((step) => {
        const IconComponent = step.icon;
        return (
          <GlassCard
            key={step.number}
            hoverEffect={true}
            glowOnHover={true}
            className="p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-black font-mono text-slate-700 tracking-wider">
                  {step.number}
                </span>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <IconComponent className={`w-5 h-5 ${step.color}`} />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
};
