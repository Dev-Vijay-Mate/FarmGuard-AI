import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ReportPreviewProps = { icon: string; title: string; detail: string; status: "Under review" | "Guidance ready"; tone: "plant" | "livestock" };

function ReportPreview({ icon, title, detail, status, tone }: ReportPreviewProps) {
  const statusStyle = tone === "plant" ? styles.plantStatus : styles.livestockStatus;
  return (
    <View style={styles.reportCard}>
      <View style={[styles.iconCircle, tone === "plant" ? styles.plantCircle : styles.livestockCircle]}><Text style={styles.icon}>{icon}</Text></View>
      <View style={styles.reportContent}>
        <Text style={styles.reportTitle}>{title}</Text><Text style={styles.reportDetail}>{detail}</Text>
        <View style={[styles.status, statusStyle]}><Text style={styles.statusText}>{status}</Text></View>
      </View>
      <Text style={styles.arrow}>›</Text>
    </View>
  );
}

export default function ReportsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.intro}><Text style={styles.title}>Your health reports</Text><Text style={styles.description}>Track plant and livestock concerns in one place.</Text></View>
      <View style={styles.filterRow}>
        <TouchableOpacity accessibilityRole="button" style={[styles.filter, styles.activeFilter]}><Text style={styles.activeFilterText}>All reports</Text></TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" style={styles.filter}><Text style={styles.filterText}>Plants</Text></TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" style={styles.filter}><Text style={styles.filterText}>Livestock</Text></TouchableOpacity>
      </View>
      <Text style={styles.sectionLabel}>SAMPLE PREVIEWS</Text>
      <ReportPreview icon="🌿" title="Tomato leaf spots" detail="Plant health • Today" status="Under review" tone="plant" />
      <ReportPreview icon="🐄" title="Cattle feeding concern" detail="Livestock health • Yesterday" status="Guidance ready" tone="livestock" />
      <View style={styles.notice}><Text style={styles.noticeTitle}>Reports will appear here</Text><Text style={styles.noticeText}>These are interface previews. Submitted reports will be saved and tracked after the reporting and backend features are added.</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#F6FAF4", flex: 1, paddingHorizontal: 20, paddingTop: 20 }, intro: { marginBottom: 20 },
  title: { color: "#173A20", fontSize: 25, fontWeight: "800", letterSpacing: -0.4 }, description: { color: "#5E7162", fontSize: 15, lineHeight: 22, marginTop: 5 },
  filterRow: { flexDirection: "row", gap: 8, marginBottom: 25 }, filter: { backgroundColor: "#FFFFFF", borderColor: "#DCE7DA", borderRadius: 18, borderWidth: 1, paddingHorizontal: 13, paddingVertical: 8 },
  activeFilter: { backgroundColor: "#1F6F36", borderColor: "#1F6F36" }, filterText: { color: "#536457", fontSize: 13, fontWeight: "700" }, activeFilterText: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
  sectionLabel: { color: "#718075", fontSize: 11, fontWeight: "800", letterSpacing: 1.1, marginBottom: 10 },
  reportCard: { alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 15, elevation: 1, flexDirection: "row", marginBottom: 12, padding: 14, shadowColor: "#14311B", shadowOffset: { height: 1, width: 0 }, shadowOpacity: 0.05, shadowRadius: 5 },
  iconCircle: { alignItems: "center", borderRadius: 20, height: 40, justifyContent: "center", marginRight: 12, width: 40 }, plantCircle: { backgroundColor: "#E5F3E6" }, livestockCircle: { backgroundColor: "#FFF0DE" }, icon: { fontSize: 20 },
  reportContent: { flex: 1 }, reportTitle: { color: "#213B27", fontSize: 15, fontWeight: "800" }, reportDetail: { color: "#6B7C6E", fontSize: 12, marginTop: 3 },
  status: { alignSelf: "flex-start", borderRadius: 8, marginTop: 8, paddingHorizontal: 8, paddingVertical: 4 }, plantStatus: { backgroundColor: "#FFF1D6" }, livestockStatus: { backgroundColor: "#E4F2E5" }, statusText: { color: "#49604E", fontSize: 11, fontWeight: "800" },
  arrow: { color: "#8C9B8F", fontSize: 28, fontWeight: "300", marginLeft: 8 }, notice: { backgroundColor: "#E8F3E7", borderRadius: 14, marginTop: 12, padding: 16 }, noticeTitle: { color: "#245C31", fontSize: 14, fontWeight: "800" }, noticeText: { color: "#496A50", fontSize: 12, lineHeight: 18, marginTop: 5 },
});
