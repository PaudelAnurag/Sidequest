import { AppleMaps, GoogleMaps } from "expo-maps";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import { AppText } from "../../components/AppText";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Screen } from "../../components/Screen";
import { colors, radius, spacing } from "../../constants/theme";
import { getQuest } from "../../quests";

const STEP = 2; // TODO: from backend / QR scan state
// TODO: per-quest location from the API
const LOCATION = { latitude: 27.765464500000004, longitude: 85.34308866666666 };
const MAP = {
  style: StyleSheet.absoluteFill,
  cameraPosition: { coordinates: LOCATION, zoom: 17 },
  markers: [{ id: "quest", coordinates: LOCATION }],
};

export default function Progress() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const q = getQuest(id);
  const total = q.steps.length;
  const fill: `${number}%` = `${((STEP - 0.5) / total) * 100}%`;

  return (
    <Screen
      footer={
        <View style={{ gap: spacing.sm }}>
          <Button
            title="Scan QR code"
            onPress={() => router.push(`/scan/${q.id}`)}
          />
          <Button
            title="View Details"
            variant="secondary"
            onPress={() => router.back()}
          />
        </View>
      }
    >
      <Header title="In Progress" />

      <View style={styles.map}>
        {Platform.OS === "ios" ? (
          <AppleMaps.View {...MAP} />
        ) : Platform.OS === "android" ? (
          <GoogleMaps.View {...MAP} />
        ) : (
          <AppText color={colors.textSecondary} align="center" style={styles.fallback}>
            Map is only available on iOS and Android.
          </AppText>
        )}
      </View>

      <View style={styles.text}>
        <AppText variant="caption" color={colors.textSecondary}>
          Step {STEP} of {total}
        </AppText>
        <AppText variant="h2">{q.steps[STEP - 1][1]}</AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          You’re almost there!
        </AppText>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: fill }]} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 320,
    borderRadius: radius.lg,
    backgroundColor: colors.border,
    overflow: "hidden",
  },
  fallback: { marginTop: spacing.huge },
  text: { gap: spacing.sm },
  track: {
    height: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.border,
    overflow: "hidden",
  },
  fill: { height: "100%", backgroundColor: colors.primary },
});