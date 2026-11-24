import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FarmerProfile, useFarmData } from "./providers/FarmDataProvider";
import { api, isApiConfigured } from "../services/api";

function Field({ label, value, onChangeText, keyboardType = "default" }: { label: string; value: string; onChangeText: (text: string) => void; keyboardType?: "default" | "phone-pad" }) {
  return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput accessibilityLabel={label} keyboardType={keyboardType} onChangeText={onChangeText} placeholder={`Enter ${label.toLowerCase()}`} placeholderTextColor="#8A978D" style={styles.input} value={value} /></View>;
}

export default function FarmerProfileScreen() {
  const router = useRouter();
  const { farmer, updateFarmer, setBackendFarmerId } = useFarmData();
  const [form, setForm] = useState<FarmerProfile>(farmer);
  const [error, setError] = useState("");

  function update(key: keyof FarmerProfile, value: string) { setForm((current) => ({ ...current, [key]: value })); }
  async function save() {
    if (!form.name.trim() || !form.phone.trim() || !form.village.trim() || !form.district.trim()) {
      setError("Complete all fields so experts can understand your farm context.");
      return;
    }
    if (form.phone.replace(/\D/g, "").length < 10) { setError("Enter a valid 10-digit mobile number."); return; }
    if (isApiConfigured) {
      try { const remoteFarmer = await api.createFarmer(form); setBackendFarmerId(remoteFarmer.id); }
      catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Unable to save profile to the backend."); return; }
    }
    updateFarmer(form);
    router.back();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <TouchableOpacity accessibilityRole="button" onPress={() => router.back()}><Text style={styles.back}>‹ Back</Text></TouchableOpacity>
          <Text style={styles.eyebrow}>FARMER DETAILS</Text><Text style={styles.title}>Your farmer profile</Text>
          <Text style={styles.subtitle}>These details will help an expert understand where a report came from.</Text>
          <View style={styles.form}>
            <Field label="Full name" onChangeText={(value) => update("name", value)} value={form.name} />
            <Field label="Mobile number" keyboardType="phone-pad" onChangeText={(value) => update("phone", value)} value={form.phone} />
            <Field label="Village" onChangeText={(value) => update("village", value)} value={form.village} />
            <Field label="District" onChangeText={(value) => update("district", value)} value={form.district} />
            {error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
            <TouchableOpacity accessibilityRole="button" onPress={save} style={styles.button}><Text style={styles.buttonText}>Save profile</Text></TouchableOpacity>
          </View>
          <Text style={styles.note}>Saved details stay on this device during the demo. Secure cloud storage will be added with the backend.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#F6FAF4", flex: 1 }, flex: { flex: 1 }, container: { flexGrow: 1, paddingBottom: 28, paddingHorizontal: 24, paddingTop: 14 },
  back: { color: "#245C31", fontSize: 15, fontWeight: "700" }, eyebrow: { color: "#438654", fontSize: 11, fontWeight: "800", letterSpacing: 1.2, marginTop: 38 },
  title: { color: "#173A20", fontSize: 30, fontWeight: "800", letterSpacing: -0.5, marginTop: 8 }, subtitle: { color: "#5E7162", fontSize: 16, lineHeight: 23, marginTop: 11 }, form: { marginTop: 21 },
  field: { marginTop: 15 }, label: { color: "#294530", fontSize: 14, fontWeight: "700", marginBottom: 8 }, input: { backgroundColor: "#FFFFFF", borderColor: "#DCE7DA", borderRadius: 12, borderWidth: 1, color: "#173A20", fontSize: 16, paddingHorizontal: 15, paddingVertical: 14 },
  error: { color: "#B42318", fontSize: 13, lineHeight: 18, marginTop: 15 }, button: { alignItems: "center", backgroundColor: "#1F6F36", borderRadius: 12, marginTop: 25, paddingVertical: 15 }, buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" }, note: { color: "#7A887D", fontSize: 12, lineHeight: 18, marginTop: 25, textAlign: "center" },
});
