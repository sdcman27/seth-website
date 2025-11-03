import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seth – Portfolio",
  description: "Modern resume and project showcase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
