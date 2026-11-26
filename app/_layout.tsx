import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FarmDataProvider } from "./providers/FarmDataProvider";

export default function RootLayout() {
  return (
    <FarmDataProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" options={{ presentation: "card" }} />
        <Stack.Screen name="register" options={{ presentation: "card" }} />
        <Stack.Screen name="farmer-profile" options={{ presentation: "card" }} />
        <Stack.Screen name="animals" options={{ presentation: "card" }} />
        <Stack.Screen name="farms" options={{ presentation: "card" }} />
        <Stack.Screen name="new-report" options={{ presentation: "card" }} />
        <Stack.Screen name="report-evidence" options={{ presentation: "card" }} />
        <Stack.Screen name="assessment" options={{ presentation: "card" }} />
      </Stack>
    </FarmDataProvider>
  );
}
