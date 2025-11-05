import Section from "@/components/Section";
import { experience } from "@/data/resume";
import TimelineItem from "@/components/TimelineItem";

export default function ExperiencePage() {
  return (
    <Section title="Experience">
      <div className="grid gap-4">
        {experience.map((e, i) => <TimelineItem key={i} {...e} />)}
      </div>
    </Section>
  );
}
