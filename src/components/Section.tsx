export default function Section({
  title,
  children,
  aside,
}: { title: string; children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-5xl px-4 lg:px-6 grid gap-6 md:grid-cols-[1fr,2fr]">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="space-y-4">{children}</div>
        {aside && <div className="md:col-start-2">{aside}</div>}
      </div>
    </section>
  );
}
