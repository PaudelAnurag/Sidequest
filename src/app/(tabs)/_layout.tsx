import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { colors, font, fontSize } from "../../constants/theme";

type Name = keyof typeof Ionicons.glyphMap;
const icon =
  (name: Name) =>
  ({ color, size }: { color: string; size: number }) => (
    <Ionicons name={name} color={color} size={size} />
  );

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: { fontFamily: font.medium, fontSize: fontSize.xs },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: "Home", tabBarIcon: icon("home") }}
      />
      <Tabs.Screen
        name="map"
        options={{ title: "Map", tabBarIcon: icon("location-outline") }}
      />
      <Tabs.Screen
        name="rewards"
        options={{ title: "Rewards", tabBarIcon: icon("gift-outline") }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", tabBarIcon: icon("person-outline") }}
      />
    </Tabs>
  );
}
