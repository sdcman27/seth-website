import Section from "@/components/Section";
import Badge from "@/components/Badge";
import Card from "@/components/Card";
import { profile, skills, projects, experience, contact } from "@/data/resume";
import ProjectCard from "@/components/ProjectCard";
import TimelineItem from "@/components/TimelineItem";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <section className="py-10">
        <div className="mx-auto max-w-5xl px-4 lg:px-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            {profile.name}
          </h1>
          <p className="mt-2 text-[var(--muted)]">{profile.title}</p>
          <p className="mt-4 max-w-2xl">{profile.blurb}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {profile.links.map(l => (
              <a key={l.label} href={l.href} className="underline text-sm">{l.label}</a>
            ))}
          </div>
        </div>
      </section>

      <Section title="Skills">
        <div className="flex flex-wrap gap-2">
          {skills.map(s => <Badge key={s}>{s}</Badge>)}
        </div>
      </Section>

      <Section title="Experience" aside={
        <Link href="/experience" className="underline text-sm">See all →</Link>
      }>
        <div className="grid gap-4">
          {experience.slice(0,2).map((e, i) => (
            <TimelineItem key={i} {...e} />
          ))}
        </div>
      </Section>

      <Section title="Projects" aside={
        <Link href="/projects" className="underline text-sm">See all →</Link>
      }>
        <div className="grid md:grid-cols-2 gap-4">
          {projects.slice(0,2).map(p => <ProjectCard key={p.name} {...p} />)}
        </div>
      </Section>

      <Section title="Contact" aside={
        <Link href="/contact" className="underline text-sm">Go to contact →</Link>
      }>
        <Card>
          <p className="text-sm">
            {profile.location}. {` `}
            Prefer email:{" "}
            <a className="underline" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
        </Card>
      </Section>
    </>
  );
}
