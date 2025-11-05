import Section from "@/components/Section";
import Card from "@/components/Card";
import { contact } from "@/data/resume";

export default function ContactPage() {
  return (
    <Section title="Contact">
      <Card>
        <p className="text-sm">Email: <a className="underline" href={`mailto:${contact.email}`}>{contact.email}</a></p>
        <p className="mt-2 text-sm text-[var(--muted)]">{contact.note}</p>
      </Card>
    </Section>
  );
}
