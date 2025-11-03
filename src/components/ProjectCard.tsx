import Card from "./Card";
import Badge from "./Badge";
import Link from "next/link";

export default function ProjectCard({
  name, description, tech, href,
}: { name: string; description: string; tech?: string[]; href?: string }) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <h3 className="font-medium">{name}</h3>
        {href && <Link className="text-sm underline" href={href}>View</Link>}
      </div>
      <p className="mt-2 text-sm text-[var(--muted)]">{description}</p>
      {!!tech?.length && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tech.map(t => <Badge key={t}>{t}</Badge>)}
        </div>
      )}
    </Card>
  );
}
