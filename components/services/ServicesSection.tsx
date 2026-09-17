"use client";

import React from "react";
import { SERVICES_DATA } from "@/data/services";
import { SectionHeading } from "../ui/SectionHeading";
import { ServiceCard } from "./ServiceCard";

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 sm:py-28 relative bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          badge="Specialized Offerings"
          title="Services & Frontend Solutions"
          subtitle="From single-page web applications to complex Next.js platforms, I deliver high-quality, production-ready frontend solutions."
        />

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
};
