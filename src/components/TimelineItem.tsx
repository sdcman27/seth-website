import Badge from "./Badge";
import Card from "./Card";

export default function TimelineItem({
  role, company, period, bullets, tech,
}: {
  role: string; company: string; period: string;
  bullets: string[]; tech?: string[];
}) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-medium">{role} • {company}</h3>
          <p className="text-sm text-[var(--muted)]">{period}</p>
        </div>
      </div>
      <ul className="mt-3 list-disc pl-5 space-y-1 text-sm">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      {!!tech?.length && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tech.map(t => <Badge key={t}>{t}</Badge>)}
        </div>
      )}
    </Card>
  );
}
