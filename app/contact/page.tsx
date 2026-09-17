import { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact Chandra Shekhar | Frontend Developer",
  description:
    "Get in touch with Chandra Shekhar for frontend development projects, React/Next.js consulting, and hiring inquiries.",
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      <ContactSection />
    </div>
  );
}
