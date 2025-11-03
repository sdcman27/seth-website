export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-5xl px-4 lg:px-6 py-8 text-sm text-[var(--muted)]">
        © {new Date().getFullYear()} • Built with Next.js & Tailwind
      </div>
    </footer>
  );
}
