export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-[var(--card)] px-2 py-1 text-xs">
      {children}
    </span>
  );
}
