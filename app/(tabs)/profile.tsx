import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.avatar}><Text style={styles.avatarText}>FG</Text></View>
      <Text style={styles.title}>Welcome to FarmGuard AI</Text>
      <Text style={styles.description}>Sign in to save reports, manage your farm details, and receive expert updates.</Text>
      <TouchableOpacity onPress={() => router.push("/login")} style={styles.button}>
        <Text style={styles.buttonText}>Sign in or create an account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", backgroundColor: "#F6FAF4", flex: 1, justifyContent: "center", padding: 28 },
  avatar: { alignItems: "center", backgroundColor: "#1F6F36", borderRadius: 40, height: 80, justifyContent: "center", width: 80 },
  avatarText: { color: "#FFFFFF", fontSize: 24, fontWeight: "800" },
  title: { color: "#173A20", fontSize: 21, fontWeight: "800", marginTop: 22 },
  description: { color: "#5E7162", fontSize: 15, lineHeight: 22, marginTop: 10, textAlign: "center" },
  button: { backgroundColor: "#1F6F36", borderRadius: 12, marginTop: 24, paddingHorizontal: 18, paddingVertical: 14 },
  buttonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
});
