import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function signIn() {
    if (!phone.trim() || !password) {
      setError("Enter your phone number and password to continue.");
      return;
    }
    setError("");
    router.replace("/(tabs)");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
        <TouchableOpacity accessibilityRole="button" onPress={() => router.back()}><Text style={styles.back}>‹ Back</Text></TouchableOpacity>
        <Text style={styles.eyebrow}>WELCOME BACK</Text>
        <Text style={styles.title}>Sign in to your farm account</Text>
        <Text style={styles.subtitle}>Keep your reports and farm information in one place.</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Mobile number</Text>
          <TextInput
            accessibilityLabel="Mobile number"
            autoComplete="tel"
            keyboardType="phone-pad"
            onChangeText={setPhone}
            placeholder="Enter your mobile number"
            placeholderTextColor="#8A978D"
            style={styles.input}
            value={phone}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            accessibilityLabel="Password"
            autoComplete="password"
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#8A978D"
            secureTextEntry
            style={styles.input}
            value={password}
          />
          {error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
          <TouchableOpacity accessibilityRole="button" onPress={signIn} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Sign in</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>New to FarmGuard AI?</Text>
          <TouchableOpacity accessibilityRole="button" onPress={() => router.push("/register")}><Text style={styles.link}> Create an account</Text></TouchableOpacity>
        </View>
        <Text style={styles.note}>Demo only: secure sign-in will be connected to the backend in a later phase.</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#F6FAF4", flex: 1 },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 14 },
  back: { color: "#245C31", fontSize: 15, fontWeight: "700" },
  eyebrow: { color: "#438654", fontSize: 11, fontWeight: "800", letterSpacing: 1.2, marginTop: 46 },
  title: { color: "#173A20", fontSize: 30, fontWeight: "800", letterSpacing: -0.5, lineHeight: 37, marginTop: 9 },
  subtitle: { color: "#5E7162", fontSize: 16, lineHeight: 23, marginTop: 12 },
  form: { marginTop: 35 },
  label: { color: "#294530", fontSize: 14, fontWeight: "700", marginBottom: 8, marginTop: 18 },
  input: { backgroundColor: "#FFFFFF", borderColor: "#DCE7DA", borderRadius: 12, borderWidth: 1, color: "#173A20", fontSize: 16, paddingHorizontal: 15, paddingVertical: 14 },
  error: { color: "#B42318", fontSize: 13, marginTop: 14 },
  primaryButton: { alignItems: "center", backgroundColor: "#1F6F36", borderRadius: 12, marginTop: 26, paddingVertical: 15 },
  primaryButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  footer: { alignItems: "center", flexDirection: "row", justifyContent: "center", marginTop: 28 },
  footerText: { color: "#5E7162", fontSize: 14 },
  link: { color: "#1F6F36", fontSize: 14, fontWeight: "800" },
  note: { color: "#7A887D", fontSize: 12, lineHeight: 18, marginTop: 28, textAlign: "center" },
});
