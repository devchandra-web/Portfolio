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
    slug: 'cashify-application',
    title: 'Cashify Application',
    subtitle: 'Product Resale Management Platform with MVC Architecture',
    shortDescription: 'Product resale management application built with Java, JSP, Servlets, JDBC, MySQL, and Bootstrap using MVC architecture for full CRUD operations.',
    category: 'Full Stack',
    technologies: ['Java', 'JSP', 'Servlet', 'JDBC', 'MySQL', 'Bootstrap'],
    featured: true,
    image: '/images/project-cashify.svg',
    demoUrl: 'https://github.com/cd6388881581/CashifyApplication',
    githubUrl: 'https://github.com/cd6388881581/CashifyApplication',
    keyFeatures: [
      'Applied MVC Architecture for Business & Presentation Decoupling',
      'End-to-End Product Resale Inventory CRUD Operations',
      'JDBC MySQL Connection Management & Prepared Statement Queries',
      'Responsive Front-End Views Built with JSP & Bootstrap Styling',
    ],
    caseStudy: {
      overview: 'Cashify Application is a dedicated product resale management platform engineered using Java, Servlets, JSP, and MySQL. It applies strict MVC architectural principles to decouple business logic, data access, and presentation layers for scalable resale operations.',
      problem: 'Managing product resale workflows (item inspection, resale pricing, listing updates, and inventory tracking) requires clear separation between HTTP presentation and database operations to avoid monolithic spaghetti code and maintain data security.',
      solution: 'Designed a clean MVC structure where Servlets handle HTTP requests and control flow, DAO classes execute optimized SQL queries via JDBC to MySQL, and dynamic JSP templates present responsive Bootstrap user interfaces.',
      developmentProcess: [
        'Architecture Setup: Structured project layers following standard Java EE Model-View-Controller pattern.',
        'Database Layer: Designed relational schema for products, categories, user sessions, and transaction logs in MySQL.',
        'Controller Development: Built Java Servlets for handling HTTP GET/POST actions (create, edit, delete, and list resale items).',
        'Presentation Layer: Created dynamic JSP templates enhanced with Bootstrap 5 utility classes and JSTL tags.',
        'Testing & Validation: Verified thread-safe database connections and error handling for unexpected input payloads.',
      ],
      features: [
        'Complete product resale inventory management lifecycle (Create, Read, Update, Delete)',
        'Resale pricing calculator and item condition evaluation filters',
        'MVC architecture separating controllers (Servlets), models (JavaBeans/DAO), and views (JSP)',
        'Prepared statement SQL queries preventing SQL injection vulnerabilities',
        'Mobile-friendly responsive UI layout powered by Bootstrap',
      ],
      techStack: [
        { name: 'Java (JDK 17/8)', role: 'Core programming language for backend business logic' },
        { name: 'JSP & Servlets', role: 'Controller routing and dynamic HTML view rendering' },
        { name: 'JDBC & MySQL', role: 'Relational data persistence, DAO abstraction, and SQL execution' },
        { name: 'Bootstrap', role: 'Front-end CSS framework for responsive product management forms' },
      ],
      challenges: [
        {
          challenge: 'Managing thread-safe database connection pooling and preventing SQL injection vulnerabilities in raw JDBC queries.',
          solution: 'Utilized PreparedStatement parameterized queries across all DAO operations and properly managed resource closing in try-with-resources statements.',
        },
        {
          challenge: 'Maintaining consistent UI state across multi-step resale submission forms.',
          solution: 'Leveraged Servlet session attributes and JSP request forwarding to preserve form state and provide inline feedback.',
        },
      ],
      performanceMetrics: [
        { label: 'Database Execution Time', value: '< 30ms', detail: 'Optimized indexed SQL queries' },
        { label: 'Architecture Score', value: '100% MVC', detail: 'Strict layer separation' },
        { label: 'Form Processing Speed', value: 'Instant', detail: 'Direct Servlet execution' },
      ],
      responsiveDesign: 'Completely responsive layout adapted for mobile phones, tablets, and desktop displays using Bootstrap grid utilities.',
      result: 'Delivered an efficient, structured full-stack product resale application with complete CRUD functionality and robust backend architecture.',
      liveDemoUrl: 'https://github.com/cd6388881581/CashifyApplication',
      githubUrl: 'https://github.com/cd6388881581/CashifyApplication',
    },
  },
  {
    slug: 'college-management-system',
    title: 'College Management System',
    subtitle: 'Academic Administration & Role-Based Access Control Platform',
    shortDescription: 'Full-stack enterprise educational management system built with Java, Spring Boot, Spring Security, JPA/Hibernate, MySQL, and HTML/CSS/JS/Bootstrap.',
    category: 'Full Stack',
    technologies: ['Java', 'Spring Boot', 'Spring Security', 'JPA / Hibernate', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    featured: true,
    image: '/images/project-college.svg',
    demoUrl: 'https://github.com/cd6388881581/CollegeManagement',
    githubUrl: 'https://github.com/cd6388881581/CollegeManagement',
    keyFeatures: [
      'Comprehensive Student, Faculty, Course & Department CRUD Operations',
      'Role-Based Access Control (Admin, Faculty, Student) via Spring Security',
      'Spring Data JPA & Hibernate Object-Relational Database Mapping',
      'Session Management & Encrypted User Authentication',
    ],
    caseStudy: {
      overview: 'An enterprise academic administration application designed to streamline educational operations including student enrollments, faculty course assignments, department scheduling, and academic record tracking.',
      problem: 'Educational institutions handle sensitive records across multi-tier user groups (Admins, Faculty, Students). They require strict permission boundaries, password hashing, and fast relational queries across complex domain models.',
      solution: 'Architected a robust Spring Boot backend leveraging Spring Security for role-based URL and method security, Spring Data JPA for automated database queries, and MySQL for relational storage, coupled with an accessible Bootstrap web portal.',
      developmentProcess: [
        'Domain Modeling: Created normalized database schema for Students, Faculty, Courses, Departments, and User Authorities.',
        'REST & MVC Controllers: Engineered Spring Boot REST endpoints and MVC controllers for handling academic workflows.',
        'Spring Security Configuration: Configured SecurityFilterChain, BCryptPasswordEncoder, and custom user details service.',
        'Data Repository Layer: Built Spring Data JPA repositories with custom JPQL queries for efficient record fetching.',
        'Web Portal Development: Built responsive dashboards customized for Admin, Faculty, and Student view modes.',
      ],
      features: [
        'Role-Based Authorization & Session Management (Admin, Faculty, Student portals)',
        'Full CRUD management for student profiles, course registrations, and department allocations',
        'Faculty assignment matrix and course curriculum scheduling',
        'Encrypted authentication with BCrypt hashing and protected API routes',
        'Responsive data tables with instant search filters and status indicators',
      ],
      techStack: [
        { name: 'Java & Spring Boot', role: 'Core backend framework, dependency injection, and web services' },
        { name: 'Spring Security', role: 'User authentication, session tracking, and role authorization' },
        { name: 'Spring Data JPA & Hibernate', role: 'ORM mapping, repository abstractions, and MySQL integration' },
        { name: 'MySQL', role: 'Relational database storage for users, courses, and departments' },
        { name: 'HTML / CSS / JS / Bootstrap', role: 'Front-end web portal interface and interactive forms' },
      ],
      challenges: [
        {
          challenge: 'Enforcing strict security rules so students cannot access administrative endpoints or faculty grade entries.',
          solution: 'Applied method-level @PreAuthorize security annotations and configured Spring Security HTTP request antMatchers for specific user roles.',
        },
        {
          challenge: 'Handling cascading database operations when deleting or updating courses connected to students and faculty.',
          solution: 'Configured JPA entity mapping cascades and soft-delete indicators to preserve historical academic records.',
        },
      ],
      performanceMetrics: [
        { label: 'Security Compliance', value: '100%', detail: 'Role-based authorization enforced' },
        { label: 'API Query Response', value: '< 45ms', detail: 'Spring Data JPA cached queries' },
        { label: 'Data Integrity', value: 'ACID Compliant', detail: 'Transactional MySQL storage' },
      ],
      responsiveDesign: 'Tailored responsive interface that scales seamlessly from administrative desktop monitors down to mobile viewports.',
      result: 'Successfully built a feature-rich, highly secure college management web system supporting complex multi-role workflows.',
      liveDemoUrl: 'https://github.com/cd6388881581/CollegeManagement',
      githubUrl: 'https://github.com/cd6388881581/CollegeManagement',
    },
  },
  {
    slug: 'e-commerce-platform',
    title: 'Modern E-Commerce Storefront',
    subtitle: 'Headless WooCommerce Storefront with Instant Checkout',
    shortDescription: 'High-performance e-commerce storefront powered by Next.js App Router, WordPress REST API, cart management state, and Stripe payment gateway.',
    category: 'E-Commerce',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'WooCommerce API', 'Stripe API', 'Zustand'],
    featured: true,
    image: '/images/project-ecommerce.svg',
    demoUrl: 'https://demo-ecommerce.example.com',
    githubUrl: 'https://github.com/chandrashekhar/next-ecommerce-store',
    keyFeatures: [
      'Instant Search & Faceted Category Filtering',
      'Cart Drawer & Persistent LocalStorage Sync',
      'Stripe Payment Gateway & Webhook Confirmation',
      'API-Driven Catalog with Optimistic UI Updates',
    ],
    caseStudy: {
      overview: 'A full-featured, headless e-commerce application designed to deliver sub-second page transitions, dynamic inventory filtering, and an end-to-end checkout flow integrated with WooCommerce REST APIs and Stripe payment processing.',
      problem: 'Traditional monolith WooCommerce stores often suffer from slow page load speeds (3s+ LCP), clumsy checkout reloads, and poor mobile user retention. The client needed a headless solution that kept WordPress back-office management while providing a lightning-fast React frontend.',
      solution: 'Built a custom Next.js App Router storefront utilizing Server-Side Rendering (SSR) for product pages, Incremental Static Regeneration (ISR) for static catalog pages, client-side Zustand state for real-time cart persistence, and Stripe Checkout integration.',
      developmentProcess: [
        'Architecture Planning: Defined TypeScript interfaces for WooCommerce REST API payloads and cart entities.',
        'Core Storefront: Built SSR product grid with debounced search and faceted filter hooks.',
        'Cart State Engine: Implemented Zustand persistent state store with slide-over cart drawer and optimistic quantity adjustments.',
        'Payment Checkout: Integrated Stripe API with server-side checkout session creation and secure tokenization.',
        'Performance Audit: Optimized Next.js image loading, font preloading, and dynamic component imports.',
      ],
      features: [
        'Faceted product filtering by category, price range, and availability',
        'Debounced instant search bar with live preview suggestions',
        'Responsive side-drawer shopping cart with badge notifications',
        'Single-page checkout flow with Stripe Elements payment form',
        'Product image carousel with zoom modal and thumbnail switcher',
        'SEO-optimized product catalog with schema markup (JSON-LD)',
      ],
      techStack: [
        { name: 'Next.js 15 (App Router)', role: 'Core framework for SSR & ISR catalog pages' },
        { name: 'TypeScript', role: 'Strict schema typing for API responses and cart state' },
        { name: 'Tailwind CSS', role: 'Utility styling & responsive glass checkout UI' },
        { name: 'WooCommerce REST API', role: 'Headless backend content source for products' },
        { name: 'Stripe Payment API', role: 'Secure credit card tokenization & webhooks' },
        { name: 'Zustand', role: 'Lightweight client cart state management' },
      ],
      challenges: [
        {
          challenge: 'Synchronizing cart state between client-side LocalStorage and server-side WooCommerce inventory stock check.',
          solution: 'Created a custom hook that validates cart stock items against WooCommerce API endpoints before initiating Stripe checkout session.',
        },
        {
          challenge: 'Preventing Layout Shift (CLS) when loading asynchronous product gallery images.',
          solution: 'Utilized Next.js Image component with fixed aspect ratio wrappers and blur placeholder shimmer effects.',
        },
      ],
      performanceMetrics: [
        { label: 'Lighthouse Score', value: '98/100', detail: 'Measured on Mobile & Desktop throttled networks' },
        { label: 'First Contentful Paint', value: '0.6s', detail: 'Pre-rendered server components' },
        { label: 'Cart Interaction Time', value: '< 16ms', detail: 'Instant optimistic UI update' },
      ],
      responsiveDesign: 'Completely tailored mobile-first UI with sticky bottom add-to-cart toolbar on mobile devices (320px - 430px) and multi-column grid layout on desktop screens (1440px+).',
      result: 'Delivered a 3x faster loading experience than the legacy store, resulting in a 42% increase in mobile conversion rates during client pilot testing.',
      liveDemoUrl: 'https://demo-ecommerce.example.com',
      githubUrl: 'https://github.com/chandrashekhar/next-ecommerce-store',
    },
  },
  {
    slug: 'saas-analytics-dashboard',
    title: 'SaaS Analytics & Insights Platform',
    subtitle: 'Real-time Metrics Dashboard with Data Visualization',
    shortDescription: 'Enterprise SaaS analytics dashboard featuring responsive sidebars, interactive metric charts, customizable data tables, and seamless dark mode theme switching.',
    category: 'SaaS',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Lucide React'],
    featured: true,
    image: '/images/project-saas.svg',
    demoUrl: 'https://demo-saas-dashboard.example.com',
    githubUrl: 'https://github.com/chandrashekhar/next-saas-dashboard',
    keyFeatures: [
      'Interactive Time-Series Data Charts',
      'Sortable & Filterable Data Tables with Pagination',
      'Collapsible Responsive Navigation Sidebar',
      'System & Manual Dark Mode Theme Switcher',
    ],
    caseStudy: {
      overview: 'An interactive B2B SaaS dashboard tailored for product managers and marketers to monitor key performance indicators (MRR, Churn, Active Users, Conversions) in real time.',
      problem: 'Data heavy web platforms frequently suffer from slow canvas re-renders, rigid table layouts, and poor mobile usability. The goal was to build a fluid, high-performance UI shell capable of rendering thousands of data points smoothly.',
      solution: 'Engineered a modular Next.js dashboard using custom Recharts wrappers, virtualized data tables, client-side date range filtering, and clean SVG metric cards.',
      developmentProcess: [
        'UI System Design: Established accessible color palettes, chart colors, and typography tokens.',
        'Component Architecture: Built reusable UI cards (`MetricCard`, `ChartCard`, `DataTable`, `Sidebar`).',
        'Data Integration: Modeled mock real-time WebSocket feeds and REST data adapters.',
        'Theme Engine: Integrated `next-themes` for flash-free dark/light mode toggling.',
        'Responsiveness Polish: Designed slide-over mobile drawer for dashboard navigation.',
      ],
      features: [
        'Time-range filtering (Last 7 Days, 30 Days, Year-to-Date)',
        'Area charts, Bar graphs, and Donut distribution cards',
        'Searchable user activity logs table with status badges and CSV export',
        'Collapsible desktop sidebar with active route indicator',
        'Real-time simulation toggle for live metric streaming',
        'Customizable metric widget grid with drag handles',
      ],
      techStack: [
        { name: 'Next.js 15', role: 'App Router architecture & dynamic route grouping' },
        { name: 'React 19', role: 'Client component state & memoized callbacks' },
        { name: 'TypeScript', role: 'Strict typing for metric datasets and chart series' },
        { name: 'Tailwind CSS', role: 'SaaS dark-first UI layout & responsive CSS Grid' },
        { name: 'Recharts', role: 'Responsive SVG chart rendering & tooltips' },
        { name: 'Lucide React', role: 'Accessible iconography' },
      ],
      challenges: [
        {
          challenge: 'Maintaining chart responsiveness across varying screen sizes without losing aspect ratio or causing reflow loops.',
          solution: 'Wrapped SVG charts in custom ResizeObserver containers with min-height constraints.',
        },
        {
          challenge: 'Avoiding dark mode flash on initial page load (FOUC).',
          solution: 'Utilized Next.js script inject pattern via `next-themes` ThemeProvider.',
        },
      ],
      performanceMetrics: [
        { label: 'Chart Frame Rate', value: '60 FPS', detail: 'Smooth hover tooltips & animations' },
        { label: 'Initial Bundle Size', value: '< 85 KB', detail: 'Dynamic imports for chart modules' },
        { label: 'Accessibility Score', value: '100/100', detail: 'Full keyboard table navigation' },
      ],
      responsiveDesign: 'Collapses sidebar into a gesture-friendly drawer on mobile (<768px), stacks key metrics vertically, and enables horizontal table scrolling with fixed headers.',
      result: 'Created a production-ready dashboard template adopted by frontend teams as a benchmark for enterprise internal tools.',
      liveDemoUrl: 'https://demo-saas-dashboard.example.com',
      githubUrl: 'https://github.com/chandrashekhar/next-saas-dashboard',
    },
  },
  {
    slug: 'premium-agency-website',
    title: 'Aethel Digital Agency Website',
    subtitle: 'High-Impact Brand Website with Fluid Motion',
    shortDescription: 'Award-inspired digital agency website featuring scroll-driven animations, glassmorphic interactive cards, smooth page transitions, and contact lead capture.',
    category: 'Agency',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lucide React'],
    featured: true,
    image: '/images/project-agency.svg',
    demoUrl: 'https://demo-agency.example.com',
    githubUrl: 'https://github.com/chandrashekhar/next-agency-website',
    keyFeatures: [
      'Scroll-Driven Parallax & Reveal Motion',
      'Glassmorphism Visual Cards & Interactive Canvas',
      'SEO-Optimized Metadata & Open Graph Cards',
      'Interactive Service Calculator & Lead Magnet',
    ],
    caseStudy: {
      overview: 'A premium marketing website created for a modern design & development agency to showcase services, case studies, and brand narrative with fluid micro-interactions.',
      problem: 'Many creative agency sites sacrifice performance for visual flair, leading to laggy scrolling, high bounce rates, and poor mobile Lighthouse scores.',
      solution: 'Designed and built a website combining lightweight Framer Motion orchestration with Next.js static generation, achieving high visual impact while maintaining 95+ performance scores.',
      developmentProcess: [
        'Visual Design Concept: Crafted dark aesthetic with emerald/cyan glow accents.',
        'Animation Architecture: Configured reusable scroll reveal wrappers (`FadeIn`, `ScaleIn`, `StaggerContainer`).',
        'Content Engineering: Built dynamic portfolio showreel and client testimonial carousel.',
        'Lead Capture Form: Implemented multi-step interactive project inquiry form.',
        'Cross-Browser & A11y Audit: Verified reduced-motion fallbacks and screen reader flow.',
      ],
      features: [
        'Interactive Hero section with dynamic code snippet terminal preview',
        'Staggered service capability cards with hover glow borders',
        'Case study carousel with smooth swipe drag support',
        'Interactive estimated timeline & budget calculator form',
        'Fully responsive glass floating navbar with active section observer',
        'Comprehensive SEO setup with dynamic XML sitemap generation',
      ],
      techStack: [
        { name: 'Next.js 15', role: 'SSG static rendering & metadata routes' },
        { name: 'TypeScript', role: 'Strict props contract for motion components' },
        { name: 'Tailwind CSS', role: 'Custom gradients, glassmorphism, & layout tokens' },
        { name: 'Framer Motion', role: 'Hardware-accelerated scroll reveals & hover states' },
      ],
      challenges: [
        {
          challenge: 'Executing multi-layer scroll animations without causing main thread jank on lower-end mobile devices.',
          solution: 'Restricted transform property animations to `transform: translate3d()` and `opacity`, utilizing `will-change` hints selectively.',
        },
        {
          challenge: 'Supporting prefers-reduced-motion for users who disable system animations.',
          solution: 'Wrapped motion elements in custom hook that checks system animation settings and disables motion automatically.',
        },
      ],
      performanceMetrics: [
        { label: 'Lighthouse Performance', value: '99/100', detail: 'Zero layout shift on load' },
        { label: 'Interaction to Next Paint', value: '28ms', detail: 'Instant button response' },
        { label: 'SEO Score', value: '100/100', detail: 'Complete semantic hierarchy' },
      ],
      responsiveDesign: 'Fluid layout adjustments using CSS clamp typography, auto-fit grid cards, and mobile-optimized touch target padding.',
      result: 'Featured on developer showcase galleries as a top reference for modern Next.js Framer Motion implementation.',
      liveDemoUrl: 'https://demo-agency.example.com',
      githubUrl: 'https://github.com/chandrashekhar/next-agency-website',
    },
  },
  {
    slug: 'ai-web-application',
    title: 'CogniAI — AI Workspace App',
    subtitle: 'AI Prompt Interface with Smart Output Rendering',
    shortDescription: 'Modern AI-powered application featuring real-time stream simulation, markdown code rendering, prompt templates, message history, and error recovery states.',
    category: 'AI Web App',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'REST API'],
    featured: true,
    image: '/images/project-ai.svg',
    demoUrl: 'https://demo-ai-workspace.example.com',
    githubUrl: 'https://github.com/chandrashekhar/next-ai-workspace',
    keyFeatures: [
      'Interactive Prompt Editor & Quick Start Templates',
      'Code Block Syntax Highlighting & Copy Button',
      'Session Message History & Local Storage Export',
      'Graceful Error Recovery & Rate Limit Toast States',
    ],
    caseStudy: {
      overview: 'An intuitive workspace application enabling users to interact with AI model APIs, test prompts, format response outputs, and save prompt history efficiently.',
      problem: 'AI interfaces often struggle with presenting code blocks legibly, managing multi-turn chat scroll behavior, and handling slow API stream latency gracefully.',
      solution: 'Developed a high-touch web workspace in Next.js that formats Markdown outputs in real time, auto-scrolls chat containers smoothly, and handles network timeouts seamlessly.',
      developmentProcess: [
        'UX Prototyping: Designed chat sidebar, prompt input bar, and formatted response area.',
        'Stream Simulation Engine: Built asynchronous chunk parser for smooth typewriter output.',
        'Code Formatting UI: Integrated syntax highlighting with one-click copy to clipboard buttons.',
        'Session Persistence: Implemented session storage hooks for quick conversation switching.',
        'Accessibility Tuning: Ensured keyboard shortcuts (Cmd+Enter to submit) and ARIA live regions.',
      ],
      features: [
        'Multi-model selection menu (GPT-4, Claude 3, Gemini Pro simulation)',
        'Rich text and Markdown output renderer with code block action toolbar',
        'Prompt history sidebar with search and delete functions',
        'Pre-configured template library (Code Review, Unit Test Generator, Refactor Assistant)',
        'Toast notification system for copy events and error handling',
        'Responsive split-view layout for desktop and single tab view for mobile',
      ],
      techStack: [
        { name: 'Next.js 15', role: 'App Router framework & API route endpoints' },
        { name: 'React 19', role: 'Stateful chat hooks & stream state management' },
        { name: 'TypeScript', role: 'Type definitions for message history and models' },
        { name: 'Tailwind CSS', role: 'AI dark interface styling & glass input bar' },
        { name: 'Framer Motion', role: 'Typewriter output transitions & drawer animation' },
      ],
      challenges: [
        {
          challenge: 'Auto-scrolling the chat container to bottom during rapid output streaming without locking manual user scroll.',
          solution: 'Implemented scroll position detection that pauses auto-scroll when the user manually scrolls up to inspect previous output.',
        },
        {
          challenge: 'Handling API rate limits and connection drops gracefully without clearing user inputs.',
          solution: 'Created retry wrapper with exponential backoff and cached prompt drafts in state.',
        },
      ],
      performanceMetrics: [
        { label: 'Typing Latency', value: '12ms', detail: 'Instant character stream rendering' },
        { label: 'Bundle Footprint', value: '72 KB', detail: 'Optimized Markdown parser bundle' },
        { label: 'User Satisfaction', value: '4.9/5', detail: 'Evaluated on developer preview release' },
      ],
      responsiveDesign: 'Single column adaptive layout on mobile with collapsible prompt drawer and full desktop split-view editor on desktop viewports.',
      result: 'Delivered a clean, production-grade AI UI prototype ready for backend API key integration.',
      liveDemoUrl: 'https://demo-ai-workspace.example.com',
      githubUrl: 'https://github.com/chandrashekhar/next-ai-workspace',
    },
  },
];
