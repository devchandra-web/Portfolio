"use client";

import React, { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { ContactForm } from "./ContactForm";
import { GlassCard } from "../ui/GlassCard";
import { Mail, Copy, Check, MapPin, Clock } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/Icons";

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = "cd6388881581@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          badge="Get in Touch"
          title="Let's Work Together"
          subtitle="Let's build something modern, fast and meaningful."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Contact Information & Direct Links */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-slate-100 mb-2">
                Let&apos;s Connect
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 font-normal">
                Whether you have a product to launch, a feature to build, or want to discuss full-stack opportunities, my inbox is always open.
              </p>

              {/* Direct Email Card */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[11px] text-slate-500 font-mono block">Direct Email</span>
                    <span className="text-xs sm:text-sm font-medium text-slate-200 truncate block">
                      {email}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  title="Copy email address"
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors shrink-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Quick Info Items */}
              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>Ghaziabad, Uttar Pradesh, India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>Response Time: Within 24 Hours</span>
                </div>
              </div>
            </GlassCard>

            {/* Social Links Box */}
            <GlassCard className="p-6 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-100 mb-1">
                  Social Profiles
                </h4>
                <p className="text-xs text-slate-400">
                  Connect on GitHub &amp; LinkedIn
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <a
                  href="https://github.com/devchandra-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 hover:border-emerald-500/40 transition-all hover:scale-105"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/chandra-shekhar-62950927a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 hover:border-emerald-500/40 transition-all hover:scale-105"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              </div>
            </GlassCard>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>

      </div>
    </section>
  );
};
