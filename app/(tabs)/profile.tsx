import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFarmData } from "../providers/FarmDataProvider";

function MenuRow({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return <TouchableOpacity accessibilityRole="button" activeOpacity={0.75} style={styles.menuRow}><Text style={styles.menuEmoji}>{emoji}</Text><View style={styles.menuContent}><Text style={styles.menuTitle}>{title}</Text><Text style={styles.menuDescription}>{description}</Text></View><Text style={styles.arrow}>›</Text></TouchableOpacity>;
}

export default function ProfileScreen() {
  const router = useRouter();
  const { farmer } = useFarmData();
  const profileTitle = farmer.name ? farmer.name : "Your farm profile";
  const profileHelper = farmer.name ? `${farmer.village}, ${farmer.district}` : "Add your farmer details to get started";
  return (
    <View style={styles.container}>
      <View style={styles.profileCard}><View style={styles.avatar}><Text style={styles.avatarText}>{farmer.name ? farmer.name.slice(0, 1).toUpperCase() : "FG"}</Text></View><View style={styles.profileContent}><Text style={styles.name}>{profileTitle}</Text><Text style={styles.helper}>{profileHelper}</Text></View></View>
      <TouchableOpacity accessibilityRole="button" onPress={() => router.push("/farmer-profile")} style={styles.signInButton}><Text style={styles.signInText}>{farmer.name ? "Edit farmer profile" : "Set up farmer profile"}</Text></TouchableOpacity>
      <Text style={styles.sectionLabel}>FARM MANAGEMENT</Text>
      <View style={styles.menuGroup}><MenuRow emoji="🚜" title="My farm" description="Add your location and crop details" /><View style={styles.divider} /><MenuRow emoji="🐄" title="My animals" description="Register livestock records" /></View>
      <Text style={styles.sectionLabel}>SUPPORT</Text>
      <View style={styles.menuGroup}><MenuRow emoji="💬" title="Help and guidance" description="Learn how FarmGuard AI works" /></View>
      <Text style={styles.note}>Farm and animal records can be added from this profile in the current setup phase.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#F6FAF4", flex: 1, paddingHorizontal: 20, paddingTop: 20 }, profileCard: { alignItems: "center", flexDirection: "row", marginBottom: 14 },
  avatar: { alignItems: "center", backgroundColor: "#1F6F36", borderRadius: 29, height: 58, justifyContent: "center", width: 58 }, avatarText: { color: "#FFFFFF", fontSize: 17, fontWeight: "800" }, profileContent: { marginLeft: 13 }, name: { color: "#173A20", fontSize: 19, fontWeight: "800" }, helper: { color: "#66766A", fontSize: 13, marginTop: 4 },
  signInButton: { alignItems: "center", backgroundColor: "#1F6F36", borderRadius: 12, marginBottom: 27, paddingVertical: 14 }, signInText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
  sectionLabel: { color: "#718075", fontSize: 11, fontWeight: "800", letterSpacing: 1.1, marginBottom: 9 }, menuGroup: { backgroundColor: "#FFFFFF", borderRadius: 15, marginBottom: 25, overflow: "hidden" }, menuRow: { alignItems: "center", flexDirection: "row", minHeight: 74, paddingHorizontal: 14 }, menuEmoji: { fontSize: 22, marginRight: 13 }, menuContent: { flex: 1 }, menuTitle: { color: "#213B27", fontSize: 15, fontWeight: "800" }, menuDescription: { color: "#718075", fontSize: 12, marginTop: 4 }, arrow: { color: "#8C9B8F", fontSize: 28, fontWeight: "300" }, divider: { backgroundColor: "#E8EEE7", height: 1, marginLeft: 49 }, note: { color: "#7A887D", fontSize: 12, lineHeight: 18, textAlign: "center" },
});
