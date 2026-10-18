import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText';
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

      <View style={styles.chips}>
        {(Object.keys(FILTERS) as Filter[]).map((f) => {
          const active = f === filter;
          return (
            <Pressable
              key={f}
              onPress={() => setFilter(f)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              style={[styles.chip, active && styles.chipActive]}
            >
              <AppText variant="caption" color={active ? colors.surface : colors.textSecondary} style={styles.bold}>
                {f}
              </AppText>
            </Pressable>
          );
        })}
      </View>

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
  return (
    <View style={[styles.row, !first && styles.divider]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  bold: { fontFamily: 'Inter_600SemiBold' },
  chips: { flexDirection: 'row', gap: spacing.sm },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
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
