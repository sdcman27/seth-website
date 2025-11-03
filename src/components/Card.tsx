export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--card)] p-4 shadow-sm">
      {children}
    </div>
  );
}
