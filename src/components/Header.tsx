"use client";
import Link from "next/link";
import { profile } from "@/data/resume";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
  { href: "games.sethchritzman.com", label: "Games" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10 bg-[color:var(--bg)]/70">
      <nav className="mx-auto max-w-5xl px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          {profile.name}
        </Link>
        <ul className="flex gap-3 text-sm">
          {nav.map(n => (
            <li key={n.href}>
              <Link
                href={n.href}
                className={`px-3 py-1 rounded-md hover:bg-white/5 ${
                  pathname === n.href ? "bg-white/10" : ""
                }`}
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
