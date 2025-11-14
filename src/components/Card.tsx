"use client";

import type { ReactNode } from "react";
import Reveal from "./Reveal";

type CardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Card({ children, className = "", delay }: CardProps) {
  return (
    <Reveal
      className={`rounded-2xl border border-white/10 bg-[var(--card)] p-4 shadow-sm transition-transform duration-500 ease-out hover:-translate-y-1 hover:border-white/20 ${className}`.trim()}
      delay={delay}
    >
      {children}
    </Reveal>
  );
}