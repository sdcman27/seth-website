"use client";
import Link from "next/link";
import { profile } from "@/data/resume";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "https://games.sethchritzman.com", label: "Games" },
];

const menuId = "mobile-navigation";

export default function Header() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  const linkClasses = (href: string) =>
    `block rounded-md px-3 py-1 transition hover:bg-white/5 ${
      pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))
        ? "bg-white/10"
        : ""
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:var(--bg)]/70 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl flex-col px-4 lg:px-6">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            {profile.name}
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-sm md:hidden"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            aria-controls={menuId}
            onClick={() => setOpen(prev => !prev)}
          >
            <span className="sr-only">Toggle navigation menu</span>
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {open ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
          <ul className="hidden items-center gap-3 text-sm md:flex">
            {nav.map(n => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={linkClasses(n.href)}
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          id={menuId}
          className={`md:hidden ${
            open ? "grid border-t border-white/10 pb-3" : "hidden"
          }`}
        >
          <ul className="grid gap-1 pt-3 text-sm">
            {nav.map(n => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={linkClasses(n.href)}
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
