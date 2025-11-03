import Section from "@/components/Section";
import { projects } from "@/data/resume";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  return (
    <Section title="Projects">
      <div className="grid sm:grid-cols-2 gap-4">
        {projects.map(p => <ProjectCard key={p.name} {...p} />)}
      </div>
    </Section>
  );
}
