"use client";

import React from "react";
import { EXPERIENCE_DATA } from "@/data/experience";
import { SectionHeading } from "../ui/SectionHeading";
import { ExperienceCard } from "./ExperienceCard";

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 sm:py-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          badge="Work & Projects Timeline"
          title="Professional Experience"
          subtitle="A proven track record in Frontend Development and Full Stack Engineering across modern Next.js web applications, Spring Boot APIs, and responsive UI components."
        />

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-12">
          {EXPERIENCE_DATA.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Dot Indicator */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-emerald-400 group-hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20" />
              
              <ExperienceCard experience={item} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
