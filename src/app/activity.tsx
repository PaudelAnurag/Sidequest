import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText';
import { Chips } from '../components/Chips';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import { colors, radius, shadow, spacing } from '../constants/theme';
import { ACTIVITY, Activity } from '../mock';

const FILTERS = { All: null, Completed: 'Completed', Rewards: 'Redeemed' } as const;
type Filter = keyof typeof FILTERS;

export default function ActivityHistory() {
  const [filter, setFilter] = useState<Filter>('All');
  const status = FILTERS[filter];
  const rows = ACTIVITY.filter((a) => !status || a.status === status);
  const months = [...new Set(rows.map((r) => r.month))];

  return (
    <Screen>
      <Header title="Activity History" />

      <Chips options={Object.keys(FILTERS) as Filter[]} value={filter} onChange={setFilter} />

      {rows.length === 0 ? (
        <AppText color={colors.textSecondary} align="center">
          Nothing here yet.
        </AppText>
      ) : (
        months.map((month) => (
          <View key={month} style={styles.group}>
            <AppText variant="caption" color={colors.textSecondary}>
              {month}
            </AppText>
            <View style={styles.list}>
              {rows
                .filter((r) => r.month === month)
                .map((r, i) => (
                  <Row key={r.id} item={r} first={i === 0} />
                ))}
            </View>
          </View>
        ))
      )}
    </Screen>
  );
}

function Row({ item, first }: { item: Activity; first: boolean }) {
  const router = useRouter();
  return (
    <Pressable
      style={[styles.row, !first && styles.divider]}
      onPress={() => router.push(`/activity/${item.id}`)}
      accessibilityRole="button"
    >
      <View style={styles.tile}>
        <Ionicons name={item.icon} size={20} color={colors.primary} />
      </View>
      <View style={styles.flex}>
        <AppText variant="bodyStrong">{item.title}</AppText>
        <AppText variant="small" color={colors.textSecondary}>
          {item.place}
        </AppText>
      </View>
      <View style={styles.right}>
        <View style={styles.credits}>
          <AppText variant="bodyStrong" color={colors.primary}>
            {item.credits}
          </AppText>
          <Ionicons name="leaf" size={16} color={colors.success} />
        </View>
        <AppText variant="small" color={colors.textSecondary}>
          {item.status}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  group: { gap: spacing.sm },
  list: {
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.subtle,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  divider: { borderTopWidth: 1, borderTopColor: colors.border },
  tile: {
    width: spacing.xxxl - spacing.sm,
    height: spacing.xxxl - spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: { alignItems: 'flex-end' },
  credits: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
});
