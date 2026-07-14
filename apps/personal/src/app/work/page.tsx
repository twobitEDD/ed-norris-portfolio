import { practices, profile } from "@/data";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/layout/SectionShell";
import { PracticeGateway } from "@/components/practices/PracticeGateway";

export default function WorkPage() {
  return (
    <PageShell name={profile.name}>
      <SectionShell id="environmental">
        <SectionHeading
          eyebrow="Practices"
          title="Focused offers for different kinds of work."
          description="Environmental systems and creative technology — each with its own proof, case studies, and hiring path."
        />
        <PracticeGateway practices={practices} />
      </SectionShell>
    </PageShell>
  );
}
