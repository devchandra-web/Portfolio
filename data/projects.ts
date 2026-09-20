export interface CaseStudy {
  overview: string;
  problem: string;
  solution: string;
  developmentProcess: string[];
  features: string[];
  techStack: { name: string; role: string }[];
  challenges: { challenge: string; solution: string }[];
  performanceMetrics: { label: string; value: string; detail: string }[];
  responsiveDesign: string;
  result: string;
  liveDemoUrl: string;
  githubUrl: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  category: 'Full Stack' | 'Web App' | 'E-Commerce' | 'SaaS' | 'Agency' | 'AI Web App';
  technologies: string[];
  featured: boolean;
  image: string; // SVG data or visual path
  demoUrl: string;
  githubUrl: string;
  keyFeatures: string[];
  caseStudy: CaseStudy;
}

export const PROJECTS_DATA: Project[] = [
  {
    slug: 'jobtrack',
    title: 'JobTrack — Enterprise Recruitment Platform',
    subtitle: 'Job Application & Recruitment Management System',
    shortDescription: 'Enterprise job application and recruitment management platform built with Spring Boot 3, React 18, TypeScript, Tailwind CSS, PostgreSQL, and REST API.',
    category: 'Full Stack',
    technologies: ['Spring Boot 3', 'React 18', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'REST API'],
    featured: true,
    image: '/images/project-jobtrack.svg',
    demoUrl: 'https://jobtrack-frontend-inky.vercel.app/',
    githubUrl: 'https://github.com/devchandra-web/jobtrack',
    keyFeatures: [
      'Interactive Kanban Board for Application Lifecycle Tracking',
      'Spring Boot 3 RESTful API & PostgreSQL Relational Schema',
      'Role-Based Dashboard for Candidates & Hiring Managers',
      'React 18 & Tailwind CSS High-Performance User Interface',
    ],
    caseStudy: {
      overview: 'JobTrack is a full-stack enterprise recruitment management application engineered using Spring Boot 3, React 18, TypeScript, and PostgreSQL. It delivers an intuitive, drag-and-drop Kanban workflow for tracking job applications, interview stages, and candidate evaluation metrics.',
      problem: 'Job seekers and recruiters struggle with fragmented spreadsheet tracking, manual email status updates, and lack of real-time visibility into multi-stage interview funnels.',
      solution: 'Architected a modular full-stack application with a robust Spring Boot backend handling candidate session security, application status transitions, and relational analytics, combined with a responsive React 18 single-page frontend.',
      developmentProcess: [
        'Backend Architecture: Designed RESTful API endpoints and PostgreSQL schema for Jobs, Applications, Interview Rounds, and Users.',
        'Security & Data Access: Implemented Spring Data JPA repositories with optimized queries and data validation filters.',
        'Frontend Engineering: Built React 18 components with TypeScript strict typing and Tailwind CSS utility styling.',
        'State & Drag-and-Drop: Integrated fluid state management for moving applications between Applied, Interviewing, Offer, and Rejected stages.',
        'Testing & Optimization: Conducted end-to-end API response testing and verified sub-50ms database execution speeds.',
      ],
      features: [
        'Multi-stage Kanban application tracking board (Applied, Screening, Technical Round, Offer)',
        'Detailed application view with resume attachments, notes, and salary compensation logs',
        'Spring Boot 3 REST API backend with automated database migrations',
        'Searchable job catalog with multi-column filtering by location, role, and salary range',
        'Responsive mobile-first interface optimized across all screen sizes',
      ],
      techStack: [
        { name: 'Spring Boot 3', role: 'Core Java backend framework for REST APIs and business logic' },
        { name: 'React 18 & TypeScript', role: 'Interactive client dashboard and state management' },
        { name: 'Tailwind CSS', role: 'Utility-first CSS styling & dark mode responsive UI layout' },
        { name: 'PostgreSQL', role: 'Relational database for users, job listings, and application records' },
      ],
      challenges: [
        {
          challenge: 'Maintaining instant UI state synchronization when dragging application cards across Kanban columns without optimistic lag.',
          solution: 'Implemented client-side optimistic UI updates paired with resilient rollback logic if backend REST calls fail.',
        },
        {
          challenge: 'Handling complex SQL queries for multi-filter applicant searches.',
          solution: 'Utilized Spring Data JPA Criteria Specifications for dynamic query generation.',
        },
      ],
      performanceMetrics: [
        { label: 'API Response Speed', value: '< 35ms', detail: 'Optimized Spring Boot Controllers' },
        { label: 'UI Frame Rate', value: '60 FPS', detail: 'Hardware-accelerated React re-renders' },
        { label: 'Data Consistency', value: '100%', detail: 'ACID-compliant PostgreSQL transactions' },
      ],
      responsiveDesign: 'Completely responsive layout adapting smoothly from mobile Kanban list view to multi-column desktop workstation.',
      result: 'Delivered a production-ready recruitment tracking system adopted for active job application management.',
      liveDemoUrl: 'https://jobtrack-frontend-inky.vercel.app/',
      githubUrl: 'https://github.com/devchandra-web/jobtrack',
    },
  },
  {
    slug: 'learnhub',
    title: 'LearnHub — Digital Learning Marketplace',
    subtitle: 'Production-Style Digital Marketplace Platform',
    shortDescription: 'Production-style digital learning marketplace built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Stripe Checkout Integration.',
    category: 'E-Commerce',
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Stripe API', 'React 19'],
    featured: true,
    image: '/images/project-learnhub.svg',
    demoUrl: 'https://learnhub-chi-nine.vercel.app/',
    githubUrl: 'https://github.com/devchandra-web/Learnhub',
    keyFeatures: [
      'Next.js 15 App Router Architecture with Server Components',
      'End-to-End Stripe Checkout & Webhook Payment Flow',
      'Faceted Course Search, Categories & Rating Filters',
      'Responsive Mobile-First UI with Tailwind CSS',
    ],
    caseStudy: {
      overview: 'LearnHub is a production-grade digital marketplace and online course platform built with Next.js 15, TypeScript, Tailwind CSS, and Stripe. It enables instructors to publish digital courses and students to browse, purchase, and access video learning materials seamlessly.',
      problem: 'Traditional learning platforms suffer from high latency, rigid monolithic backend architectures, and complex checkout friction that drops checkout conversion rates.',
      solution: 'Engineered a modern Next.js 15 App Router application utilizing Server Components (RSC) for instantaneous page loads, combined with Stripe Checkout for secure, low-friction payment processing.',
      developmentProcess: [
        'Architecture Setup: Initialized Next.js 15 App Router with TypeScript interfaces for courses, instructors, and order sessions.',
        'Marketplace UI: Developed responsive course cards, dynamic category filters, and debounced search bars.',
        'Payment Engine: Integrated Stripe API server actions for session creation and secure tokenized checkout.',
        'State Management: Built persistent cart state and optimistic UI feedback for course enrollments.',
        'Performance Audit: Achieved sub-second Core Web Vitals LCP scores using pre-rendered server components.',
      ],
      features: [
        'Instant course catalog search with category, rating, and price filters',
        'Stripe Checkout integration supporting credit cards and webhook order fulfillment',
        'Course detail pages with video preview modals, curriculum breakdown, and instructor profiles',
        'User enrollment dashboard with course progress indicators',
        'SEO-optimized catalog pages with dynamic Open Graph social cards',
      ],
      techStack: [
        { name: 'Next.js 15 (App Router)', role: 'Core React framework for SSR and Server Actions' },
        { name: 'TypeScript', role: 'Strict type safety across API routes and marketplace state' },
        { name: 'Tailwind CSS', role: 'Responsive glassmorphism UI layout and custom color theme' },
        { name: 'Stripe API', role: 'Secure payment gateway processing and webhook token verification' },
      ],
      challenges: [
        {
          challenge: 'Securing digital course content access so only authenticated, paid users can stream course media.',
          solution: 'Leveraged server-side session checks in Next.js middleware and API routes before serving course resources.',
        },
        {
          challenge: 'Preventing Layout Shift (CLS) when loading asynchronous course preview images.',
          solution: 'Utilized Next.js Image component with fixed aspect ratio aspect-video wrappers and blur placeholders.',
        },
      ],
      performanceMetrics: [
        { label: 'Lighthouse Score', value: '98/100', detail: 'Measured on desktop & mobile networks' },
        { label: 'First Contentful Paint', value: '0.5s', detail: 'Next.js pre-rendered Server Components' },
        { label: 'Checkout Success Rate', value: '99.9%', detail: 'Seamless Stripe Checkout redirection' },
      ],
      responsiveDesign: 'Tailored mobile-first layout with sticky enrollment CTA toolbar on mobile viewports and multi-column grid on desktop screens.',
      result: 'Successfully deployed a high-performance digital marketplace platform ready for course monetization.',
      liveDemoUrl: 'https://learnhub-chi-nine.vercel.app/',
      githubUrl: 'https://github.com/devchandra-web/Learnhub',
    },
  },
  {
    slug: 'blog-news-portal',
    title: 'Blog & News Portal',
    subtitle: 'Modern Publishing Platform with Headless CMS Engine',
    shortDescription: 'Modern news and blog publishing portal built with React, Bootstrap, and WordPress REST API integration for dynamic headless content delivery.',
    category: 'Web App',
    technologies: ['React', 'Bootstrap', 'WordPress REST API', 'JavaScript', 'HTML/CSS'],
    featured: true,
    image: '/images/project-blog.svg',
    demoUrl: 'https://blognewsportal.vercel.app/',
    githubUrl: 'https://github.com/devchandra-web/Blog-News-Portal',
    keyFeatures: [
      'Headless Architecture via WordPress REST API Integration',
      'Dynamic Article Reader with Rich HTML Parsing',
      'Faceted Category Navigation & Instant Keyword Search',
      'Responsive Grid Layout Powered by Bootstrap 5',
    ],
    caseStudy: {
      overview: 'Blog & News Portal is a dynamic web application built with React, Bootstrap, and WordPress REST API. It decouples the editorial content management experience of WordPress from the front-end presentation, serving articles with sub-second page transitions.',
      problem: 'Legacy WordPress themes are often bloated with heavy PHP scripts, slow plugin loads, and poor mobile UI rendering.',
      solution: 'Architected a headless web portal in React that fetches live articles, categories, author metadata, and media assets via asynchronous REST API calls, rendered in a clean Bootstrap UI layout.',
      developmentProcess: [
        'API Integration: Connected React services to WordPress REST API endpoints (/wp-json/wp/v2/posts).',
        'Component Architecture: Built modular components for Hero Article, Category Feed, Recent Posts Sidebar, and Search Modal.',
        'Content Rendering: Formatted raw HTML article payloads safely with sanitized rich-text renderers.',
        'Responsive Design: Applied Bootstrap 5 container grids and responsive utility classes for seamless tablet and mobile reading.',
      ],
      features: [
        'Live article synchronization from headless WordPress CMS',
        'Category filter tabs (Tech, Business, Design, Culture)',
        'Debounced instant search bar filtering article titles and tags',
        'Article reading time calculator and social share widget',
        'Responsive sidebar highlighting trending posts and editor picks',
      ],
      techStack: [
        { name: 'React', role: 'Client-side SPA UI rendering and state management' },
        { name: 'Bootstrap 5', role: 'CSS framework for responsive column layouts and cards' },
        { name: 'WordPress REST API', role: 'Headless backend content management system' },
        { name: 'JavaScript (ES6+)', role: 'Asynchronous fetch pipelines and data transformation' },
      ],
      challenges: [
        {
          challenge: 'Rendering embedded HTML formatting from CMS API without exposing XSS security risks.',
          solution: 'Passed CMS HTML through DOMPurify sanitization before dynamic mounting in React.',
        },
        {
          challenge: 'Handling API request timeouts during high-traffic article fetching.',
          solution: 'Implemented client-side caching and fallback skeleton loaders during fetch states.',
        },
      ],
      performanceMetrics: [
        { label: 'Page Transition', value: 'Instant', detail: 'Client-side React routing' },
        { label: 'API Execution', value: '< 60ms', detail: 'Cached REST response payload' },
        { label: 'SEO Accessibility', value: '100/100', detail: 'Semantic HTML markup structure' },
      ],
      responsiveDesign: 'Fluid layout adjusting from single-column mobile view to multi-column magazine grid on desktop screens.',
      result: 'Delivered an elegant, high-speed publishing portal combining headless CMS flexibility with React speed.',
      liveDemoUrl: 'https://blognewsportal.vercel.app/',
      githubUrl: 'https://github.com/devchandra-web/Blog-News-Portal',
    },
  },
];
