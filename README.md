# Chandra Shekhar — Modern Frontend Developer Portfolio

A production-ready, dark-first, highly interactive **Frontend Developer Portfolio Website** engineered with **Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, and Lucide React**.

Designed for modern software company applications, showcasing real-world frontend applications, dynamic project case studies, responsive mobile design, and 95+ Core Web Vitals performance.

---

## 🌟 Key Features

* **Dark-First SaaS Aesthetic**: Premium dark theme with glassmorphism, subtle glowing borders, and clean typography.
* **Sticky Glass Navbar**: Responsive header with active route tracking, social links, resume download CTA, and Framer Motion mobile drawer menu.
* **Interactive Hero Terminal**: Code sandbox displaying live syntax tabs for Next.js 15, React 19, TypeScript, and Tailwind CSS.
* **Structured About Section**: Deep-dive into frontend engineering principles and a 6-step workflow (`01 Understand` → `06 Deploy`).
* **Categorized Tech Stack**: Filterable skill cards across Frontend, Styling, Tools, and Integration without fake percentages.
* **Dynamic Project Showcase**: 4 realistic industry projects featuring hover elevation, tech badges, live demo, GitHub, and full **12-section Case Studies** (`/projects/[slug]`).
* **Interactive Work Timeline**: Timeline displaying developer responsibilities, key achievements, and technology tags.
* **Services Grid**: 6 specialized service cards with clear deliverables.
* **Validated Contact Form**: Complete client-side validation, sending state spinner, success toast, and backend API integration readiness.
* **SEO & Accessibility**: Complete metadata tags, Open Graph cards, dynamic XML sitemap, `robots.txt`, ARIA accessibility, and `prefers-reduced-motion` support.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 15 (App Router)
* **Language**: TypeScript (Strict Mode)
* **Styling**: Tailwind CSS v4 & Custom Glassmorphism
* **Animations**: Framer Motion
* **Icons**: Lucide React
* **Theme**: Next-Themes (Dark/Light mode persistence)
* **Deployment**: Vercel Ready

---

## 🚀 Getting Started & Installation

### Prerequisites

Ensure you have **Node.js 18.x or 20.x** and **npm** installed on your system.

```bash
node -v
npm -v
```

### 1. Clone the Repository

```bash
git clone https://github.com/chandrashekhar/portfolio.git
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

---

## ⚙️ Environment Variables

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

### `.env.local`

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional Contact Form Email API Keys (e.g., Resend, Web3Forms, EmailJS)
# NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
# NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
# NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 💻 Development Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server at `http://localhost:3000` |
| `npm run build` | Compiles the production build and validates TypeScript & ESLint |
| `npm run start` | Runs the compiled production server locally |
| `npm run lint` | Audits code for ESLint formatting and syntax warnings |
| `npx tsc --noEmit` | Runs strict TypeScript type checking without emitting files |

---

## 📦 Production Build & Quality Audit

Before deploying, run a full production build to ensure zero errors:

```bash
npm run build
```

---

## 🚀 Vercel Deployment Guide

This portfolio is optimized for instant deployment on Vercel:

1. Push your repository to GitHub.
2. Import the project into your **Vercel Dashboard**.
3. Select **Next.js** as the Framework Preset.
4. Set Environment Variables from `.env.example` if applicable.
5. Click **Deploy**.

---

## ✏️ How to Customize Data & Content

All portfolio content is decoupled into clean data modules located under `data/`:

### 1. Updating Projects & Case Studies (`data/projects.ts`)

To edit or add a project, edit `PROJECTS_DATA` in `data/projects.ts`:

```typescript
export const PROJECTS_DATA: Project[] = [
  {
    slug: 'your-project-slug',
    title: 'Your Project Title',
    subtitle: 'Short Subtitle',
    shortDescription: 'Project summary...',
    category: 'SaaS',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    featured: true,
    image: '/images/project-saas.svg',
    demoUrl: 'https://your-demo-url.com',
    githubUrl: 'https://github.com/your-repo',
    keyFeatures: ['Feature 1', 'Feature 2'],
    caseStudy: {
      overview: 'Full overview...',
      problem: 'The problem...',
      solution: 'The solution...',
      // ... 12 case study fields
    }
  }
];
```

### 2. Updating Skills (`data/skills.ts`)

Add or update skills in `SKILLS_DATA`:

```typescript
{
  name: 'React.js',
  category: 'Frontend',
  level: 'Expert',
  experience: '3+ Years',
  usage: 'Building complex single-page apps...',
  iconName: 'Atom',
  featured: true,
}
```

### 3. Updating Work Experience (`data/experience.ts`)

Update timeline entries in `EXPERIENCE_DATA`.

### 4. Updating Social Links & Contact Details

Search and replace the placeholder URLs across:
* `components/navbar/Navbar.tsx`
* `components/hero/HeroSection.tsx`
* `components/contact/ContactSection.tsx`
* `components/footer/Footer.tsx`

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
