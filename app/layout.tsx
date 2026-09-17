import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ConditionalLayout } from "@/components/ConditionalLayout";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://chandrashekhar-portfolio.vercel.app"),
  title: "Chandra Shekhar | Frontend Developer",
  description:
    "Frontend Developer specializing in building responsive, scalable, and visually engaging web applications with React, Next.js, TypeScript, and Tailwind CSS.",
  keywords: [
    "Chandra Shekhar",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Tailwind CSS",
    "Web Portfolio"
  ],
  authors: [{ name: "Chandra Shekhar" }],
  creator: "Chandra Shekhar",
  openGraph: {
    title: "Chandra Shekhar | Frontend Developer Portfolio",
    description:
      "Building modern web experiences that perform. Specializing in React, Next.js, TypeScript, and high-performance UI engineering.",
    url: "https://chandrashekhar-portfolio.vercel.app",
    siteName: "Chandra Shekhar Portfolio",
    images: [
      {
        url: "/images/project-saas.svg",
        width: 1200,
        height: 630,
        alt: "Chandra Shekhar Frontend Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chandra Shekhar | Frontend Developer",
    description:
      "Frontend Developer building scalable web applications with React, Next.js, and TypeScript.",
    images: ["/images/project-saas.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} antialiased bg-slate-950 text-slate-100 min-h-screen flex flex-col selection:bg-emerald-500 selection:text-slate-950`}
      >
        <ThemeProvider>
          {/* Accessibility Skip Link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-md shadow-xl"
          >
            Skip to main content
          </a>

          <ConditionalLayout>{children}</ConditionalLayout>

          {/* Structured Data JSON-LD for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Chandra Shekhar",
                jobTitle: "Frontend Developer",
                url: "https://chandrashekhar-portfolio.vercel.app",
                sameAs: [
                  "https://github.com/chandrashekhar",
                  "https://linkedin.com/in/chandrashekhar",
                ],
                knowsAbout: [
                  "React.js",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "JavaScript",
                  "Frontend Development",
                  "Web Performance",
                  "REST APIs",
                ],
              }),
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
