"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Sparkles, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon, InstagramIcon } from "../ui/Icons";
import { Badge } from "../ui/Badge";
import { ResumeModal } from "../ui/ResumeModal";

const ROLES = [
  "Frontend Developer @ Ascella InfoSec",
  "Full Stack Developer",
  "Java & Spring Boot Engineer",
  "React & Next.js Specialist",
];

export const HeroSection: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, 40);
    } else {
      timeout = setTimeout(() => {
        setCurrentText((prev) => currentRole.slice(0, prev.length + 1));
      }, 90);
    }

    if (!isDeleting && currentText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-[95vh] pt-28 sm:pt-36 pb-16 lg:pt-40 lg:pb-24 flex items-center overflow-hidden bg-[#0a0f1d]"
    >
      {/* Background Ambient Spotlights */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Decorative Grid Mesh Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Portfolio Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#111a2e]/90 border border-[#1e2a4a] text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide shadow-md shadow-cyan-950/20 mb-8"
            >
              <span className="text-cyan-400 font-mono font-bold text-sm">&lt;/&gt;</span>
              <span>Welcome to My Portfolio</span>
            </motion.div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-100 tracking-tight leading-[1.1] mb-3">
              Hi, I&apos;m{" "}
              <span className="text-cyan-400 font-extrabold drop-shadow-[0_0_25px_rgba(6,182,212,0.55)]">
                Chandra Shekhar
              </span>
            </h1>

            {/* Typewriter Subtitle */}
            <div className="text-2xl sm:text-4xl font-bold text-slate-200 mb-6 flex items-center justify-center lg:justify-start h-12">
              <span className="mr-2 text-slate-300 font-medium">I&apos;m a</span>
              <span className="text-cyan-400 border-r-2 border-cyan-400 pr-1 animate-pulse font-bold tracking-tight">
                {currentText}
              </span>
            </div>

            {/* Resume Paragraph Content */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
              Frontend Developer at Ascella InfoSec (March 2025 – Present) building responsive web interfaces using Next.js, TypeScript, JavaScript, and Tailwind CSS. Experienced in full stack development with Java, Spring Boot, REST APIs, React, MySQL, and Spring Security.
            </p>

            {/* Primary Yellow & Secondary Dark CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] text-[#0a0f1d] font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 transition-all hover:scale-105 flex items-center justify-center space-x-2.5"
              >
                <span className="font-black text-base">&gt;</span>
                <span>View Projects</span>
              </a>

              <button
                onClick={() => setResumeModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#121a2c] hover:bg-[#1a253e] text-slate-100 border border-[#212f4d] font-semibold text-sm tracking-wide transition-all hover:border-slate-600 flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4 text-slate-300" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Social Media Icons Bar */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://www.linkedin.com/in/chandra-shekhar-62950927a/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-3 rounded-full bg-[#121a2c] border border-[#212f4d] text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/60 hover:bg-[#1a253e] transition-all hover:scale-110 shadow-md"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>

              <a
                href="https://github.com/devchandra-web"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-3 rounded-full bg-[#121a2c] border border-[#212f4d] text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/60 hover:bg-[#1a253e] transition-all hover:scale-110 shadow-md"
              >
                <GithubIcon className="w-5 h-5" />
              </a>

              <a
                href="https://leetcode.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode Profile"
                className="p-3 rounded-full bg-[#121a2c] border border-[#212f4d] text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/60 hover:bg-[#1a253e] transition-all hover:scale-110 shadow-md"
              >
                <XIcon className="w-5 h-5" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="p-3 rounded-full bg-[#121a2c] border border-[#212f4d] text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/60 hover:bg-[#1a253e] transition-all hover:scale-110 shadow-md"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Profile Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 w-full flex justify-center relative mt-6 lg:mt-0"
          >
            {/* Glowing Backdrop Frame */}
            <div className="w-full max-w-md rounded-3xl bg-gradient-to-tr from-cyan-500/30 via-blue-600/20 to-teal-400/30 p-1 shadow-2xl shadow-cyan-500/10 relative group">
              <div className="w-full h-full rounded-[1.4rem] bg-[#0d1424] relative overflow-hidden p-6 flex flex-col items-center justify-end min-h-[440px] border border-cyan-500/20">
                
                {/* Background Curved Glow */}
                <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-cyan-500/15 rounded-bl-[120px] pointer-events-none blur-md" />
                
                {/* Floating Badges */}
                <div className="absolute top-5 right-5 z-20">
                  <Badge variant="emerald" size="sm" className="shadow-lg backdrop-blur-md bg-cyan-950/90 border-cyan-500/40 text-cyan-300">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 mr-1" />
                    <span>Ascella InfoSec</span>
                  </Badge>
                </div>

                <div className="absolute top-5 left-5 z-20">
                  <Badge variant="slate" size="sm" className="shadow-lg bg-slate-900/90 border-slate-700 text-slate-200">
                    <Code2 className="w-3.5 h-3.5 text-amber-400 mr-1" />
                    <span>Next.js &amp; React</span>
                  </Badge>
                </div>

                {/* Developer Portrait Image */}
                <div className="relative z-10 w-full max-w-[300px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30 group-hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src="/images/chandra-shekhar.jpg"
                    alt="Chandra Shekhar - Frontend Developer & Full Stack Engineer"
                    fill
                    priority
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1424] via-transparent to-transparent opacity-50" />
                </div>

                {/* Developer Name & Role Tag Footer */}
                <div className="relative z-20 mt-4 px-5 py-2.5 rounded-xl bg-[#121a2c]/90 border border-[#212f4d] backdrop-blur-md text-center shadow-lg w-full max-w-[280px]">
                  <span className="block text-sm font-bold text-slate-100">Chandra Shekhar</span>
                  <span className="block text-xs text-cyan-400 font-medium">Frontend Developer @ Ascella InfoSec</span>
                </div>

              </div>
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
