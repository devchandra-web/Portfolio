import { Metadata } from "next";
import { AboutSection } from "@/components/about/AboutSection";

export const metadata: Metadata = {
  title: "About Me | Chandra Shekhar — Frontend Developer",
  description:
    "Learn about Chandra Shekhar's frontend engineering principles, development workflow, and technology stack.",
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      <AboutSection />
    </div>
  );
}
