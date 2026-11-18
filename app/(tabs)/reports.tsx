import { StyleSheet, Text, View } from "react-native";

export default function ReportsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No reports yet</Text>
      <Text style={styles.description}>Your submitted plant and livestock health reports will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", backgroundColor: "#F6FAF4", flex: 1, justifyContent: "center", padding: 28 },
  title: { color: "#173A20", fontSize: 21, fontWeight: "800" },
  description: { color: "#5E7162", fontSize: 15, lineHeight: 22, marginTop: 10, textAlign: "center" },
});
