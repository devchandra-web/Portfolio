import { z } from "zod";

export const heroSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role is required"),
  headline: z.string().min(5, "Headline is required"),
  subtitle: z.string().min(10, "Subtitle must be at least 10 characters"),
  description: z.string().min(10, "Description is required"),
  primaryCtaText: z.string().min(1, "Primary CTA Text is required"),
  primaryCtaUrl: z.string().min(1, "Primary CTA URL is required"),
  secondaryCtaText: z.string().min(1, "Secondary CTA Text is required"),
  secondaryCtaUrl: z.string().min(1, "Secondary CTA URL is required"),
  resumeUrl: z.string().min(1, "Resume URL is required"),
  profileImage: z.string().min(1, "Profile Image URL is required"),
  availabilityStatus: z.string().min(1, "Availability status is required"),
});

export const aboutSchema = z.object({
  title: z.string().min(2, "Title is required"),
  introduction: z.string().min(10, "Introduction is required"),
  description: z.string().min(10, "Description is required"),
  profileImage: z.string().min(1, "Profile Image is required"),
  location: z.string().min(2, "Location is required"),
  availability: z.string().min(2, "Availability is required"),
  developmentPhilosophy: z.string().min(10, "Development philosophy is required"),
  approach: z.string().min(5, "Approach is required"),
  personalSummary: z.string().min(10, "Personal summary is required"),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.enum(["Frontend", "Styling", "Tools", "Integration", "API", "Other"]),
  icon: z.string().default("Code2"),
  level: z.enum(["Expert", "Advanced", "Proficient"]),
  visible: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});

export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  subtitle: z.string().optional().default(""),
  shortDescription: z.string().min(10, "Short description is required"),
  fullDescription: z.string().min(20, "Full description is required"),
  category: z.string().min(2, "Category is required"),
  problem: z.string().min(10, "Problem description is required"),
  solution: z.string().min(10, "Solution description is required"),
  features: z.string().min(2, "Features are required"),
  challenges: z.string().min(2, "Challenges are required"),
  result: z.string().min(5, "Result statement is required"),
  mainImage: z.string().min(1, "Main Image URL is required"),
  galleryImages: z.string().optional().default("[]"),
  liveDemoUrl: z.string().min(1, "Live Demo URL is required"),
  githubUrl: z.string().min(1, "GitHub URL is required"),
  caseStudy: z.string().min(10, "Case Study content is required"),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
  technologies: z.array(z.string()).default([]),
});

export const experienceSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  role: z.string().min(2, "Role title is required"),
  location: z.string().min(2, "Location is required"),
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().min(1, "End Date is required"),
  description: z.string().min(10, "Description is required"),
  responsibilities: z.string().min(5, "Responsibilities list is required"),
  technologies: z.string().min(2, "Technologies list is required"),
  currentPosition: z.boolean().default(false),
  displayOrder: z.number().int().default(0),
});

export const serviceSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),
  icon: z.string().default("Code"),
  deliverables: z.string().min(2, "Deliverables list is required"),
  visible: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});

export const socialSchema = z.object({
  platform: z.string().min(2, "Platform name is required"),
  url: z.string().min(1, "URL is required"),
  icon: z.string().default("Globe"),
  visible: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});

export const seoSchema = z.object({
  siteTitle: z.string().min(2, "Site title is required"),
  metaDescription: z.string().min(10, "Meta description is required"),
  ogTitle: z.string().min(2, "OG Title is required"),
  ogDescription: z.string().min(10, "OG Description is required"),
  ogImage: z.string().min(1, "OG Image is required"),
  twitterTitle: z.string().min(2, "Twitter Title is required"),
  twitterDescription: z.string().min(10, "Twitter Description is required"),
  twitterImage: z.string().min(1, "Twitter Image is required"),
  canonicalUrl: z.string().min(1, "Canonical URL is required"),
});

export const settingsSchema = z.object({
  siteName: z.string().min(2, "Site Name is required"),
  developerName: z.string().min(2, "Developer Name is required"),
  jobTitle: z.string().min(2, "Job Title is required"),
  email: z.string().email("Invalid email address"),
  location: z.string().min(2, "Location is required"),
  resumeUrl: z.string().min(1, "Resume URL is required"),
  availability: z.string().min(2, "Availability status is required"),
  copyright: z.string().min(2, "Copyright string is required"),
  theme: z.string().default("dark"),
  analyticsId: z.string().optional(),
});
