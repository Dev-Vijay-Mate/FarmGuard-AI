import { Tabs } from "expo-router";

const tabScreenOptions = {
  headerStyle: { backgroundColor: "#F6FAF4" },
  headerShadowVisible: false,
  headerTitleStyle: { color: "#173A20", fontWeight: "800" as const },
  tabBarActiveTintColor: "#1F6F36",
  tabBarInactiveTintColor: "#718075",
  tabBarStyle: { backgroundColor: "#FFFFFF", borderTopColor: "#E5EBE3" },
};

export default function TabsLayout() {
  return (
    <Tabs screenOptions={tabScreenOptions}>
      <Tabs.Screen name="index" options={{ title: "Home", headerShown: false }} />
      <Tabs.Screen name="reports" options={{ title: "My Reports" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
