import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Share, StyleSheet, View } from 'react-native';
import { AppText } from '../../components/AppText';
import { Screen } from '../../components/Screen';
import { colors, radius, shadow, spacing } from '../../constants/theme';
import { PROFILE } from '../../mock';

const STATS = [
  { value: String(PROFILE.quests), label: 'Quests Completed' },
  { value: PROFILE.co2, label: 'CO₂ Saved' },
  { value: String(PROFILE.badges), label: 'Badges Earned' },
];

const MENU: { icon: keyof typeof Ionicons.glyphMap; label: string; href?: '/activity' }[] = [
  { icon: 'time-outline', label: 'Activity History', href: '/activity' },
  { icon: 'location-outline', label: 'Saved Places' },
  { icon: 'card-outline', label: 'Payment Methods' },
  { icon: 'settings-outline', label: 'Settings' },
  { icon: 'help-circle-outline', label: 'Help & Support' },
];

export default function Profile() {
  const router = useRouter();

  return (
    <Screen noBottomInset>
      <View style={styles.shareRow}>
        <Pressable
          onPress={() => Share.share({ message: 'Join me on SideQuest!' })}
          hitSlop={spacing.md}
          accessibilityRole="button"
          accessibilityLabel="Share"
        >
          <Ionicons name="share-outline" size={24} color={colors.text} />
        </Pressable>
      </View>

      <View style={styles.identity}>
        {/* TODO: user photo */}
        <View style={styles.avatar}>
          <Ionicons name="person" size={48} color={colors.primary} />
        </View>
        <AppText variant="h2">{PROFILE.name}</AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          Member since {PROFILE.since}
        </AppText>
      </View>

      <View style={styles.stats}>
        {STATS.map((s) => (
          <View key={s.label} style={[styles.card, styles.stat]}>
            <AppText variant="h2">{s.value}</AppText>
            <AppText variant="small" color={colors.textSecondary} align="center">
              {s.label}
            </AppText>
          </View>
        ))}
      </View>

      <View style={[styles.card, styles.menu]}>
        {MENU.map((m, i) => (
          <Pressable
            key={m.label}
            style={[styles.row, i > 0 && styles.divider]}
            onPress={() => (m.href ? router.push(m.href) : undefined)}
            accessibilityRole="button"
          >
            <Ionicons name={m.icon} size={20} color={colors.text} />
            <AppText style={styles.flex}>{m.label}</AppText>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  shareRow: { alignItems: 'flex-end' },
  identity: { alignItems: 'center', gap: spacing.xs },
  avatar: {
    width: spacing.huge + spacing.xxl,
    height: spacing.huge + spacing.xxl,
    borderRadius: radius.full,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  stats: { flexDirection: 'row', gap: spacing.md },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    ...shadow.subtle,
  },
  stat: { flex: 1, alignItems: 'center', gap: spacing.xs, padding: spacing.lg },
  menu: { paddingHorizontal: spacing.lg },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.lg },
  divider: { borderTopWidth: 1, borderTopColor: colors.border },
});
