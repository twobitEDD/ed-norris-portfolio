import path from "node:path";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  pdf,
  Svg,
  Line,
} from "@react-pdf/renderer";
import type { ResumeContent } from "@/lib/resume";
import { profilePhoto } from "@/data/career-images";
import { disciplineColors } from "@/data/types";

const profilePhotoPath = path.join(process.cwd(), "public", profilePhoto.src.replace(/^\//, ""));

const baseStyles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingRight: 48,
    paddingBottom: 48,
    paddingLeft: 56,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#0f172a",
    position: "relative",
  },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 6 },
  accentRule: { height: 2, width: 56, marginBottom: 8 },
  role: { fontSize: 12, color: "#334155", marginBottom: 2 },
  meta: { fontSize: 9, color: "#64748b", marginBottom: 16 },
  headerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 16,
    marginBottom: 4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
  },
  headerText: {
    flex: 1,
    minWidth: 0,
  },
  profilePhoto: {
    width: 56,
    height: 56,
    borderRadius: 28,
    objectFit: "cover",
    flexShrink: 0,
  },
  section: { marginTop: 14 },
  entryBlock: { marginTop: 8 },
  sectionTitleRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  sectionDash: { width: 12, height: 1, marginRight: 6 },
  sectionTitle: {
    fontSize: 8,
    fontWeight: "bold",
    letterSpacing: 1.5,
    color: "#64748b",
    textTransform: "uppercase",
  },
  body: { fontSize: 10, lineHeight: 1.5, color: "#334155" },
  jobTitle: { fontSize: 11, fontWeight: "bold" },
  jobMeta: { fontSize: 9, color: "#64748b" },
});

function SectionTitle({ label, accentColor }: { label: string; accentColor: string }) {
  return (
    <View style={baseStyles.sectionTitleRow}>
      <View style={[baseStyles.sectionDash, { backgroundColor: accentColor }]} />
      <Text style={baseStyles.sectionTitle}>{label}</Text>
    </View>
  );
}

function CornerLines({ accentColor }: { accentColor: string }) {
  const stroke = accentColor;
  return (
    <>
      <Svg
        viewBox="0 0 40 40"
        style={{ position: "absolute", top: 36, right: 36, width: 32, height: 32 }}
      >
        <Line x1="28" y1="0" x2="40" y2="0" stroke={stroke} strokeWidth={1} opacity={0.35} />
        <Line x1="40" y1="0" x2="40" y2="12" stroke={stroke} strokeWidth={1} opacity={0.35} />
      </Svg>
      <Svg
        viewBox="0 0 40 40"
        style={{ position: "absolute", bottom: 36, left: 44, width: 32, height: 32 }}
      >
        <Line x1="0" y1="28" x2="0" y2="40" stroke={stroke} strokeWidth={1} opacity={0.35} />
        <Line x1="0" y1="40" x2="12" y2="40" stroke={stroke} strokeWidth={1} opacity={0.35} />
      </Svg>
    </>
  );
}

function ResumeDocument({ content }: { content: ResumeContent }) {
  const accentColor = content.accentColor ?? disciplineColors.software;

  return (
    <Document>
      <Page size="LETTER" style={baseStyles.page}>
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            backgroundColor: accentColor,
          }}
        />

        <CornerLines accentColor={accentColor} />

        <View style={baseStyles.headerBorder}>
          <View style={baseStyles.headerRow}>
            <View style={baseStyles.headerText}>
              <Text style={baseStyles.name}>{content.name}</Text>
              <View style={[baseStyles.accentRule, { backgroundColor: accentColor }]} />
              <Text style={baseStyles.role}>{content.targetRole}</Text>
              <Text style={baseStyles.meta}>{content.location}</Text>
            </View>
            <Image src={profilePhotoPath} style={baseStyles.profilePhoto} />
          </View>
        </View>

        <View style={baseStyles.section}>
          <SectionTitle label="Profile" accentColor={accentColor} />
          <Text style={baseStyles.body}>{content.summary}</Text>
        </View>

        <View style={baseStyles.section}>
          <SectionTitle label="Experience" accentColor={accentColor} />
          {content.experiences.map((exp) => (
            <View key={exp.id} wrap={false} style={baseStyles.entryBlock}>
              <Text style={baseStyles.jobTitle}>
                {exp.title} — {exp.organization}
              </Text>
              <Text style={baseStyles.jobMeta}>
                {exp.period.start} – {exp.period.end ?? "Present"}
              </Text>
              <Text style={baseStyles.body}>{exp.summary}</Text>
            </View>
          ))}
        </View>

        {content.education.length > 0 && (
          <View style={baseStyles.section}>
            <SectionTitle label="Education" accentColor={accentColor} />
            {content.education.map((entry) => (
              <View key={entry.id} wrap={false} style={baseStyles.entryBlock}>
                <Text style={baseStyles.jobTitle}>
                  {entry.title} — {entry.organization}
                </Text>
                <Text style={baseStyles.jobMeta}>
                  {entry.period.start}
                  {entry.period.end ? ` – ${entry.period.end}` : ""}
                </Text>
                {entry.summary ? <Text style={baseStyles.body}>{entry.summary}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {content.projects.length > 0 && (
          <View style={baseStyles.section}>
            <SectionTitle label="Selected Projects" accentColor={accentColor} />
            {content.projects.map((p) => (
              <View key={p.id} wrap={false} style={baseStyles.entryBlock}>
                <Text style={baseStyles.jobTitle}>{p.title}</Text>
                <Text style={baseStyles.body}>{p.summary}</Text>
              </View>
            ))}
          </View>
        )}

        {content.skills.length > 0 && (
          <View style={baseStyles.section}>
            <SectionTitle label="Skills" accentColor={accentColor} />
            <Text style={baseStyles.body}>{content.skills.map((s) => s.label).join(" · ")}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}

export async function generateResumePdf(content: ResumeContent) {
  return pdf(<ResumeDocument content={content} />).toBlob();
}
