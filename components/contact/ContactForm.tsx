"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message content is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit form");

      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch {
      setErrors({ message: "Failed to send message. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800">
      {isSuccess ? (
        <div className="text-center py-10 space-y-4" role="status" aria-live="polite">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-100">
            Message Sent Successfully!
          </h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Thank you for reaching out, Chandra Shekhar will get back to you within 24 hours.
          </p>
          <Button
            variant="outline"
            size="md"
            onClick={() => setIsSuccess(false)}
            className="mt-4"
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-2">
                Your Name <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                placeholder="e.g. Alex Morgan"
                className={`w-full px-4 py-3 rounded-lg bg-slate-950/80 border text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                  errors.name ? "border-rose-500" : "border-slate-800"
                }`}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-xs text-rose-400 flex items-center space-x-1" role="alert">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-2">
                Email Address <span className="text-emerald-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                placeholder="alex@company.com"
                className={`w-full px-4 py-3 rounded-lg bg-slate-950/80 border text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                  errors.email ? "border-rose-500" : "border-slate-800"
                }`}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-rose-400 flex items-center space-x-1" role="alert">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>
          </div>

          {/* Subject Input */}
          <div>
            <label htmlFor="subject" className="block text-xs font-semibold text-slate-300 mb-2">
              Subject <span className="text-emerald-400">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              placeholder="e.g. Next.js Web Project Inquiry"
              className={`w-full px-4 py-3 rounded-lg bg-slate-950/80 border text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                errors.subject ? "border-rose-500" : "border-slate-800"
              }`}
            />
            {errors.subject && (
              <p id="subject-error" className="mt-1 text-xs text-rose-400 flex items-center space-x-1" role="alert">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.subject}</span>
              </p>
            )}
          </div>

          {/* Message Textarea */}
          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-slate-300 mb-2">
              Message <span className="text-emerald-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              placeholder="Tell me about your project goals, timeline, and tech requirements..."
              className={`w-full px-4 py-3 rounded-lg bg-slate-950/80 border text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors resize-none ${
                errors.message ? "border-rose-500" : "border-slate-800"
              }`}
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-xs text-rose-400 flex items-center space-x-1" role="alert">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.message}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="glow"
            size="lg"
            disabled={isSubmitting}
            className="w-full mt-2"
            icon={
              isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )
            }
          >
            {isSubmitting ? "Sending Message..." : "Send Message"}
          </Button>

          <p className="text-[11px] text-slate-500 text-center pt-2">
            Form is structured for direct backend API connectivity (EmailJS, Web3Forms, Resend). Zero secrets exposed.
          </p>
        </form>
      )}
    </div>
  );
};
