import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function createAccount() {
    if (!name.trim() || !phone.trim() || password.length < 6) {
      setError("Add your name and mobile number, then use a password with at least 6 characters.");
      return;
    }
    setError("");
    router.replace("/(tabs)");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <TouchableOpacity accessibilityRole="button" onPress={() => router.back()}><Text style={styles.back}>‹ Back</Text></TouchableOpacity>
          <Text style={styles.eyebrow}>CREATE YOUR ACCOUNT</Text>
          <Text style={styles.title}>Start protecting your farm</Text>
          <Text style={styles.subtitle}>Create an account to save health concerns and follow their progress.</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Your name</Text>
            <TextInput accessibilityLabel="Your name" autoComplete="name" onChangeText={setName} placeholder="Enter your full name" placeholderTextColor="#8A978D" style={styles.input} value={name} />
            <Text style={styles.label}>Mobile number</Text>
            <TextInput accessibilityLabel="Mobile number" autoComplete="tel" keyboardType="phone-pad" onChangeText={setPhone} placeholder="Enter your mobile number" placeholderTextColor="#8A978D" style={styles.input} value={phone} />
            <Text style={styles.label}>Create password</Text>
            <TextInput accessibilityLabel="Create password" autoComplete="new-password" onChangeText={setPassword} placeholder="At least 6 characters" placeholderTextColor="#8A978D" secureTextEntry style={styles.input} value={password} />
            {error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
            <TouchableOpacity accessibilityRole="button" onPress={createAccount} style={styles.primaryButton}><Text style={styles.primaryButtonText}>Create account</Text></TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity accessibilityRole="button" onPress={() => router.replace("/login")}><Text style={styles.link}> Sign in</Text></TouchableOpacity>
          </View>
          <Text style={styles.note}>Demo only: account creation will be securely stored when the backend is connected.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#F6FAF4", flex: 1 },
  flex: { flex: 1 },
  container: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 14, paddingBottom: 28 },
  back: { color: "#245C31", fontSize: 15, fontWeight: "700" },
  eyebrow: { color: "#438654", fontSize: 11, fontWeight: "800", letterSpacing: 1.2, marginTop: 40 },
  title: { color: "#173A20", fontSize: 30, fontWeight: "800", letterSpacing: -0.5, lineHeight: 37, marginTop: 9 },
  subtitle: { color: "#5E7162", fontSize: 16, lineHeight: 23, marginTop: 12 },
  form: { marginTop: 26 },
  label: { color: "#294530", fontSize: 14, fontWeight: "700", marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: "#FFFFFF", borderColor: "#DCE7DA", borderRadius: 12, borderWidth: 1, color: "#173A20", fontSize: 16, paddingHorizontal: 15, paddingVertical: 14 },
  error: { color: "#B42318", fontSize: 13, lineHeight: 18, marginTop: 14 },
  primaryButton: { alignItems: "center", backgroundColor: "#1F6F36", borderRadius: 12, marginTop: 26, paddingVertical: 15 },
  primaryButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  footer: { alignItems: "center", flexDirection: "row", justifyContent: "center", marginTop: 27 },
  footerText: { color: "#5E7162", fontSize: 14 },
  link: { color: "#1F6F36", fontSize: 14, fontWeight: "800" },
  note: { color: "#7A887D", fontSize: 12, lineHeight: 18, marginTop: 24, textAlign: "center" },
});
