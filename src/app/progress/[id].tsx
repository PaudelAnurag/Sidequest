import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { AppText } from "../../components/AppText";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Screen } from "../../components/Screen";
import { colors, radius, spacing } from "../../constants/theme";
import { getQuest } from "../../quests";

const STEP = 2; // TODO: from backend / QR scan state
const DOTS = Array.from({ length: 8 }, (_, i) => i / 8);

export default function Progress() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const q = getQuest(id);
  const total = q.steps.length;
  const fill: `${number}%` = `${((STEP - 0.5) / total) * 100}%`;

  return (
    <Screen
      footer={
        <Button
          title="View Details"
          variant="secondary"
          onPress={() => router.back()}
        />
      }
    >
      <Header title="In Progress" />

      {/* TODO: swap for a real map (react-native-maps + expo-location) */}
      <View style={styles.map}>
        {DOTS.map((t) => (
          <View
            key={t}
            style={[
              styles.dot,
              { left: `${24 + 52 * t}%`, top: `${68 - 46 * t}%` },
            ]}
          />
        ))}
        <View style={styles.me} />
        <Ionicons
          name="location"
          size={40}
          color={colors.primary}
          style={styles.pin}
        />
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
  dot: {
    position: "absolute",
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  me: {
    position: "absolute",
    left: "20%",
    top: "68%",
    width: spacing.lg,
    height: spacing.lg,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  pin: { position: "absolute", left: "72%", top: "10%" },
  text: { gap: spacing.sm },
  track: {
    height: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.border,
    overflow: "hidden",
  },
  fill: { height: "100%", backgroundColor: colors.primary },
});
