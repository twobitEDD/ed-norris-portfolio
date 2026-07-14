import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import type { ResumeContent } from "@/lib/resume";

const styles = StyleSheet.create({
  page: { padding: 48, fontFamily: "Helvetica", fontSize: 10, color: "#0f172a" },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 4 },
  role: { fontSize: 12, color: "#334155", marginBottom: 2 },
  meta: { fontSize: 9, color: "#64748b", marginBottom: 16 },
  section: { marginTop: 14 },
  sectionTitle: {
    fontSize: 8,
    fontWeight: "bold",
    letterSpacing: 1.5,
    color: "#64748b",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  body: { fontSize: 10, lineHeight: 1.5, color: "#334155" },
  jobTitle: { fontSize: 11, fontWeight: "bold", marginTop: 8 },
  jobMeta: { fontSize: 9, color: "#64748b" },
});

function ResumeDocument({ content }: { content: ResumeContent }) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.name}>{content.name}</Text>
        <Text style={styles.role}>{content.targetRole}</Text>
        <Text style={styles.meta}>{content.location}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <Text style={styles.body}>{content.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {content.experiences.map((exp) => (
            <View key={exp.id}>
              <Text style={styles.jobTitle}>
                {exp.title} — {exp.organization}
              </Text>
              <Text style={styles.jobMeta}>
                {exp.period.start} – {exp.period.end ?? "Present"}
              </Text>
              <Text style={styles.body}>{exp.summary}</Text>
            </View>
          ))}
        </View>

        {content.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {content.education.map((entry) => (
              <View key={entry.id}>
                <Text style={styles.jobTitle}>
                  {entry.title} — {entry.organization}
                </Text>
                <Text style={styles.jobMeta}>
                  {entry.period.start}
                  {entry.period.end ? ` – ${entry.period.end}` : ""}
                </Text>
                {entry.summary ? <Text style={styles.body}>{entry.summary}</Text> : null}
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Projects</Text>
          {content.projects.map((p) => (
            <View key={p.id}>
              <Text style={styles.jobTitle}>{p.title}</Text>
              <Text style={styles.body}>{p.summary}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.body}>{content.skills.map((s) => s.label).join(" · ")}</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function generateResumePdf(content: ResumeContent) {
  return pdf(<ResumeDocument content={content} />).toBlob();
}
