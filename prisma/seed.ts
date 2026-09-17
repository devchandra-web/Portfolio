import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Initial Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      name: "Chandra Shekhar (Admin)",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log(`Admin user initialized: ${admin.email}`);

  // 2. Hero Section
  await prisma.hero.upsert({
    where: { id: "hero-main" },
    update: {},
    create: {
      id: "hero-main",
      name: "Chandra Shekhar",
      role: "Frontend Developer",
      headline: "Building Modern Web Experiences That Perform.",
      subtitle: "I'm Chandra Shekhar, a Frontend Developer focused on building responsive, scalable and visually engaging web applications with React and Next.js.",
      description: "Passionate about clean component architecture, responsive layout design, web performance optimization, and REST API integration.",
      primaryCtaText: "View My Work",
      primaryCtaUrl: "#projects",
      secondaryCtaText: "Let's Talk",
      secondaryCtaUrl: "#contact",
      resumeUrl: "/resume.pdf",
      profileImage: "/images/project-saas.svg",
      availabilityStatus: "Available for Hire & Frontend Projects",
    },
  });

  // 3. About Section
  await prisma.about.upsert({
    where: { id: "about-main" },
    update: {},
    create: {
      id: "about-main",
      title: "Engineering Sleek & Scalable Interfaces",
      introduction: "I specialize in turning complex product ideas into fast, accessible, and production-ready frontend web applications.",
      description: "My expertise centers around the modern React ecosystem—specifically Next.js App Router, TypeScript, and Tailwind CSS. I write clean, maintainable code that delivers real business value.",
      profileImage: "/images/project-saas.svg",
      location: "Bengaluru, India (Available Remote Worldwide)",
      availability: "Full-Time / Freelance",
      developmentPhilosophy: "Building reusable components, responsive-first layout design, clean TypeScript typing, and relentless performance optimization.",
      approach: "01 Understand -> 02 Design -> 03 Build -> 04 Test -> 05 Optimize -> 06 Deploy",
      personalSummary: "Dedicated frontend developer with 3+ years of experience engineering high-impact web apps.",
    },
  });

  // 4. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "settings-main" },
    update: {},
    create: {
      id: "settings-main",
      siteName: "Chandra Shekhar Portfolio",
      developerName: "Chandra Shekhar",
      jobTitle: "Frontend Developer",
      email: "chandrashekhar.dev@example.com",
      location: "Bengaluru, India",
      resumeUrl: "/resume.pdf",
      availability: "Available for Hire & Frontend Projects",
      copyright: "© 2026 Chandra Shekhar. All rights reserved.",
      theme: "dark",
    },
  });

  // 5. SEO Settings
  await prisma.sEO.upsert({
    where: { id: "seo-main" },
    update: {},
    create: {
      id: "seo-main",
      siteTitle: "Chandra Shekhar | Frontend Developer",
      metaDescription: "Frontend Developer specializing in building responsive, scalable, and visually engaging web applications with React, Next.js, TypeScript, and Tailwind CSS.",
      ogTitle: "Chandra Shekhar | Frontend Developer Portfolio",
      ogDescription: "Building modern web experiences that perform. Specializing in React, Next.js, TypeScript, and high-performance UI engineering.",
      ogImage: "/images/project-saas.svg",
      twitterTitle: "Chandra Shekhar | Frontend Developer",
      twitterDescription: "Frontend Developer building scalable web applications with React, Next.js, and TypeScript.",
      twitterImage: "/images/project-saas.svg",
      canonicalUrl: "https://chandrashekhar-portfolio.vercel.app",
    },
  });

  console.log("Database seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
