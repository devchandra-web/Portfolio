"use client";

import React, { useState } from "react";
import { Check, Copy, Play, Code2 } from "lucide-react";

interface CodeTab {
  id: string;
  label: string;
  file: string;
  iconColor: string;
  code: string;
}

const TABS: CodeTab[] = [
  {
    id: "nextjs",
    label: "Next.js 15",
    file: "app/page.tsx",
    iconColor: "text-emerald-400",
    code: `import { Hero, Projects, Skills } from "@/components";

export default async function Page() {
  const developer = {
    name: "Chandra Shekhar",
    role: "Frontend Developer",
    location: "Bengaluru, India",
    availableForHire: true,
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Hero profile={developer} />
      <Skills category="Frontend" />
      <Projects featuredOnly={true} />
    </main>
  );
}`,
  },
  {
    id: "react",
    label: "React 19",
    file: "components/Hero.tsx",
    iconColor: "text-cyan-400",
    code: `"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export const Hero = ({ profile }: { profile: Developer }) => {
  const [activeTab, setActiveTab] = useState("nextjs");

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-extrabold tracking-tight"
      >
        Building Modern Web Experiences That Perform.
      </motion.h1>
    </section>
  );
};`,
  },
  {
    id: "typescript",
    label: "TypeScript",
    file: "types/developer.ts",
    iconColor: "text-blue-400",
    code: `export interface TechnicalSkills {
  frontend: ["Next.js", "React.js", "TypeScript", "JavaScript"];
  styling: ["Tailwind CSS", "Framer Motion", "CSS3"];
  tools: ["Git", "GitHub", "VS Code", "Vercel"];
  integration: ["REST API", "WooCommerce API", "Stripe"];
}

export interface DeveloperProfile {
  name: "Chandra Shekhar";
  title: "Frontend Developer";
  skills: TechnicalSkills;
  cleanArchitecture: true;
  productionReady: true;
}`,
  },
  {
    id: "tailwind",
    label: "Tailwind CSS",
    file: "app/globals.css",
    iconColor: "text-sky-400",
    code: `@import "tailwindcss";

@layer utilities {
  .glass-card {
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .gradient-text {
    background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}`,
  },
];

export const DeveloperTerminal: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>("nextjs");
  const [copied, setCopied] = useState<boolean>(false);

  const activeTab = TABS.find((t) => t.id === activeTabId) || TABS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl glass-card border border-slate-800 shadow-2xl shadow-emerald-950/20 overflow-hidden font-mono text-xs sm:text-sm">
      {/* Top Terminal Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="text-slate-400 font-sans text-xs ml-2 hidden sm:inline-block">
            {activeTab.file}
          </span>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center space-x-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-2.5 py-1 rounded-md transition-all font-sans text-xs flex items-center space-x-1.5 ${
                activeTabId === tab.id
                  ? "bg-slate-800 text-slate-100 font-medium shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Code2 className={`w-3.5 h-3.5 ${tab.iconColor}`} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Action button */}
        <button
          onClick={handleCopy}
          aria-label="Copy code block"
          title="Copy code snippet"
          className="p-1.5 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Terminal Code Body */}
      <div className="p-4 sm:p-6 bg-slate-950/90 text-slate-200 overflow-x-auto min-h-[260px] flex">
        {/* Line Numbers */}
        <div className="select-none text-slate-600 text-right pr-4 border-r border-slate-800/60 space-y-1 font-mono text-xs">
          {activeTab.code.split("\n").map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code View */}
        <pre className="pl-4 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto">
          <code>{activeTab.code}</code>
        </pre>
      </div>

      {/* Terminal Status Footer */}
      <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-sans text-slate-400">
        <div className="flex items-center space-x-2">
          <Play className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>Next.js App Router — Production Ready</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-emerald-400 font-mono">Status: 200 OK</span>
          <span className="text-slate-500">UTF-8</span>
        </div>
      </div>
    </div>
  );
};
