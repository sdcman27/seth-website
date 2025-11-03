import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { profile } from "@/data/resume"; // ok to keep

export const metadata: Metadata = {
  title: `${profile.name} – ${profile.title}`,
  description: profile.blurb,
  keywords: profile.keywords,
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
