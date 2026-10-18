import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../../components/AppText";
import { Credits } from "../../components/Credits";
import { Screen } from "../../components/Screen";
import { colors, radius, shadow, spacing } from "../../constants/theme";
import { gbp, quests } from "../../quests";

const USER_NAME = "Sarah"; // TODO: from auth
const BALANCE = { gbp: "£12.50", credits: 125 }; // TODO: from API

function SectionHeader({ title, action }: { title: string; action: string }) {
  return (
    <View style={styles.sectionHeader}>
      <AppText variant="title">{title}</AppText>
      <AppText variant="caption" color={colors.primary} style={styles.bold}>
        {action}
      </AppText>
    </View>
  );
}

export default function Home() {
  const router = useRouter();
  const [today, ...nearby] = quests;
  const open = (id: string) => router.push(`/quest/${id}`);

  return (
    <Screen noBottomInset>
      <View style={styles.header}>
        <View>
          <AppText variant="h2">Hello, {USER_NAME}! 👋</AppText>
          <AppText variant="caption" color={colors.textSecondary}>
            Let’s make an impact today.
          </AppText>
        </View>
        <Ionicons name="notifications-outline" size={24} color={colors.text} />
      </View>

      <View style={[styles.card, styles.balance]}>
        <View style={styles.balanceText}>
          <AppText variant="small" color={colors.textSecondary}>
            Your Balance
          </AppText>
          <AppText variant="h1" color={colors.primary}>
            {BALANCE.gbp}
          </AppText>
          <Credits text={`${BALANCE.credits} Green Credits`} />
        </View>
        <Pressable
          style={styles.redeem}
          onPress={() => router.push("/rewards")}
          accessibilityRole="button"
        >
          <Ionicons name="gift-outline" size={32} color={colors.primary} />
          <AppText variant="caption" color={colors.primary} style={styles.bold}>
            Redeem
          </AppText>
        </Pressable>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Today’s Quest" action="View all" />
        <Pressable
          style={[styles.card, styles.today, shadow.medium]}
          onPress={() => open(today.id)}
          accessibilityRole="button"
        >
          <View style={styles.todayText}>
            <AppText variant="title">{today.title}</AppText>
            <AppText variant="caption" color={colors.textSecondary}>
              {today.subtitle}
            </AppText>
            <AppText variant="bodyStrong">Earn {gbp(today.credits)}</AppText>
            <Credits text={`${today.credits} Credits`} />
          </View>
          <View style={styles.todayArt}>
            <Ionicons name={today.icon} size={48} color={colors.primary} />
          </View>
        </Pressable>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Nearby Quests" action="See all" />
        <View style={[styles.card, styles.list]}>
          {nearby.map((q, i) => (
            <Pressable
              key={q.id}
              style={[styles.row, i > 0 && styles.divider]}
              onPress={() => open(q.id)}
              accessibilityRole="button"
            >
              <Ionicons name={q.icon} size={24} color={colors.primary} />
              <View style={styles.flex}>
                <AppText variant="bodyStrong">{q.title}</AppText>
                <AppText variant="caption" color={colors.textSecondary}>
                  {q.subtitle}
                </AppText>
              </View>
              <AppText variant="bodyStrong" color={colors.primary}>
                +{q.credits}
              </AppText>
              <Ionicons name="leaf" size={16} color={colors.success} />
            </Pressable>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  bold: { fontFamily: "Inter_600SemiBold" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    ...shadow.subtle,
  },
  balance: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    padding: spacing.lg,
  },
  balanceText: { flex: 1, gap: spacing.xs },
  redeem: {
    width: spacing.huge + spacing.xxl,
    height: spacing.huge + spacing.xxl,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },
  section: { gap: spacing.md },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  today: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    padding: spacing.lg,
  },
  todayText: { flex: 1, gap: spacing.xs },
  todayArt: {
    width: spacing.huge + spacing.xxl,
    height: spacing.huge + spacing.xxl,
    borderRadius: radius.md,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  list: { paddingHorizontal: spacing.lg },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.lg,
  },
  divider: { borderTopWidth: 1, borderTopColor: colors.border },
});
