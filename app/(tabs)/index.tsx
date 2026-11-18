import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ReportCardProps = {
  emoji: string;
  title: string;
  description: string;
  color: string;
};

function ReportCard({ emoji, title, description, color }: ReportCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`Start a ${title.toLowerCase()} report`}
      activeOpacity={0.85}
      onPress={() => router.push("/(tabs)/reports")}
      style={[styles.card, { borderLeftColor: color }]}
    >
      <Text style={styles.cardEmoji}>{emoji}</Text>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
      <Text style={[styles.arrow, { color }]}>›</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.brandRow}>
          <View style={styles.logo}><Text style={styles.logoText}>FG</Text></View>
          <Text style={styles.brand}>FarmGuard AI</Text>
          <TouchableOpacity onPress={() => router.push("/login")} style={styles.signInButton}>
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>FARM HEALTH, MADE SIMPLER</Text>
          <Text style={styles.heading}>What needs attention today?</Text>
          <Text style={styles.subheading}>
            Report visible symptoms and receive preliminary, AI-assisted guidance.
          </Text>
        </View>

        <View style={styles.cards}>
          <ReportCard
            emoji="🌿"
            title="Plant health concern"
            description="Report crop symptoms, pests, or disease signs."
            color="#2F8F46"
          />
          <ReportCard
            emoji="🐄"
            title="Livestock health concern"
            description="Report symptoms observed in your animals."
            color="#C8791D"
          />
        </View>

        <View style={styles.guidance}>
          <Text style={styles.guidanceTitle}>A helpful first step</Text>
          <Text style={styles.guidanceText}>
            Take a clear photo, describe what you see, and we’ll help you decide on the next step. AI guidance is preliminary and does not replace an agricultural or veterinary expert.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F6FAF4" },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 12 },
  brandRow: { alignItems: "center", flexDirection: "row", gap: 10 },
  logo: { alignItems: "center", backgroundColor: "#1F6F36", borderRadius: 12, height: 42, justifyContent: "center", width: 42 },
  logoText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
  brand: { color: "#173A20", flex: 1, fontSize: 19, fontWeight: "800" },
  signInButton: { backgroundColor: "#E8F3E7", borderRadius: 18, paddingHorizontal: 12, paddingVertical: 8 },
  signInText: { color: "#245C31", fontSize: 13, fontWeight: "800" },
  hero: { marginTop: 52 },
  eyebrow: { color: "#438654", fontSize: 11, fontWeight: "800", letterSpacing: 1.2 },
  heading: { color: "#173A20", fontSize: 34, fontWeight: "800", letterSpacing: -0.8, lineHeight: 41, marginTop: 10 },
  subheading: { color: "#5E7162", fontSize: 16, lineHeight: 24, marginTop: 14 },
  cards: { gap: 14, marginTop: 38 },
  card: { alignItems: "center", backgroundColor: "#FFFFFF", borderLeftWidth: 5, borderRadius: 16, elevation: 2, flexDirection: "row", minHeight: 106, paddingHorizontal: 17, shadowColor: "#14311B", shadowOffset: { height: 2, width: 0 }, shadowOpacity: 0.08, shadowRadius: 8 },
  cardEmoji: { fontSize: 30, marginRight: 14 },
  cardContent: { flex: 1 },
  cardTitle: { color: "#213B27", fontSize: 16, fontWeight: "800" },
  cardDescription: { color: "#607064", fontSize: 13, lineHeight: 19, marginTop: 5 },
  arrow: { fontSize: 32, fontWeight: "300", marginLeft: 6 },
  guidance: { backgroundColor: "#E8F3E7", borderRadius: 16, marginTop: 28, padding: 18 },
  guidanceTitle: { color: "#245C31", fontSize: 14, fontWeight: "800" },
  guidanceText: { color: "#426248", fontSize: 13, lineHeight: 19, marginTop: 6 },
});
