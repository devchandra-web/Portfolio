"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Rocket, Briefcase, Mail, Phone, MapPin, Send, Download } from "lucide-react";
import { ResumeModal } from "../ui/ResumeModal";
import { PROJECTS_DATA } from "@/data/projects";

export const AboutSection: React.FC = () => {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <section id="about" className="py-20 sm:py-28 relative bg-[#070b14] overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-indigo-500/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="px-4 py-1.5 rounded-full bg-[#161a2e] border border-[#272d4a] text-[#818cf8] text-xs font-bold uppercase tracking-widest mb-3 shadow-md">
            GET TO KNOW ME
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Image with Neon Glowing Outline & Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            <div className="relative max-w-[340px] w-full py-6 px-4">
              
              {/* Neon Cyan Angled Border Frame */}
              <div className="absolute inset-0 rounded-3xl border-2 border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.3)] transform -rotate-1 pointer-events-none" />
              
              {/* Profile Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-[#0d1424] aspect-[3/4] z-10">
                <Image
                  src="/images/chandra-shekhar.jpg"
                  alt="Chandra Shekhar - Full Stack Java & React Developer"
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>

              {/* Floating Top-Right Badge: Projects Done */}
              <div className="absolute -top-1 -right-4 sm:-right-6 z-20 bg-[#0d1527]/95 border border-[#1e2c4a] p-3.5 rounded-2xl flex items-center space-x-3 shadow-2xl backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <Rocket className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="block text-lg font-black text-white leading-none">{PROJECTS_DATA.length}</span>
                  <span className="block text-[11px] font-semibold text-slate-400 mt-1">Projects Done</span>
                </div>
              </div>

              {/* Floating Bottom-Left Badge: Total Experience */}
              <div className="absolute -bottom-3 -left-4 sm:-left-6 z-20 bg-[#0d1527]/95 border border-[#1e2c4a] p-3.5 rounded-2xl flex items-center space-x-3.5 shadow-2xl backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <span className="block text-lg font-black text-white leading-none">Ascella InfoSec</span>
                  <span className="block text-xs font-bold text-slate-200 mt-1">Frontend Developer</span>
                  <span className="block text-[10px] text-slate-400 font-medium">March 2025 – Present</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Bio Narrative & Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Main Name Heading */}
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-1">
              I&apos;m Chandra Shekhar
            </h3>

            {/* Subtitle Role */}
            <p className="text-base sm:text-lg font-bold text-slate-400 mb-6">
              Frontend Developer @ Ascella InfoSec &amp; Full Stack Engineer
            </p>

            {/* Paragraph Text */}
            <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-2xl font-normal">
              Frontend Developer at Ascella InfoSec (March 2025 – Present) building responsive web interfaces using Next.js, TypeScript, JavaScript, and Tailwind CSS. Converted Figma designs into reusable UI components. Previously Full Stack Developer Intern at QSpider Noida developing Java, Spring Boot, REST APIs, React, and MySQL applications.
            </p>

            {/* Contact Info Cards (3 Columns Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full mb-8">
              {/* EMAIL */}
              <div className="bg-[#0b1222]/90 border border-[#1c2945] p-3.5 rounded-2xl flex items-center space-x-3 shadow-md hover:border-cyan-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#0e273c] text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">EMAIL</span>
                  <span className="block text-xs font-bold text-slate-200 truncate" title="cd6388881581@gmail.com">
                    cd6388881581@gmail.com
                  </span>
                </div>
              </div>

              {/* PHONE */}
              <div className="bg-[#0b1222]/90 border border-[#1c2945] p-3.5 rounded-2xl flex items-center space-x-3 shadow-md hover:border-cyan-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#0e273c] text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                  <Phone className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">PHONE</span>
                  <span className="block text-xs font-bold text-slate-200">
                    6388881581
                  </span>
                </div>
              </div>

              {/* LOCATION */}
              <div className="bg-[#0b1222]/90 border border-[#1c2945] p-3.5 rounded-2xl flex items-center space-x-3 shadow-md hover:border-cyan-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#0e273c] text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">LOCATION</span>
                  <span className="block text-xs font-bold text-slate-200">
                    Ghaziabad, UP, India
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#00e5ff] hover:bg-[#00c8e0] text-[#040a14] font-extrabold text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4 fill-current" />
                <span>Contact Me</span>
              </a>

              <button
                onClick={() => setResumeModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0b1222] hover:bg-[#141f38] text-slate-100 border border-[#1c2945] font-bold text-sm tracking-wide transition-all hover:border-slate-600 flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4 text-slate-300" />
                <span>Download Resume</span>
              </button>
            </div>

          </motion.div>

        </div>

      </div>

      {/* Gated Lead Capture Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </section>
  );
};
