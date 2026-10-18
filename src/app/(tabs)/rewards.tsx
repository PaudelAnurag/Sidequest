import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../../components/AppText';
import { Credits } from '../../components/Credits';
import { Screen } from '../../components/Screen';
import { colors, radius, shadow, spacing } from '../../constants/theme';
import { OFFERS, REWARDS_BALANCE } from '../../mock';

export default function Rewards() {
  return (
    <Screen noBottomInset>
      <AppText variant="h1">Rewards</AppText>

      <View style={styles.gap}>
        <AppText variant="small" color={colors.textSecondary}>
          Your Balance
        </AppText>
        <AppText variant="h1" color={colors.primary}>
          {REWARDS_BALANCE.gbp}
        </AppText>
        <Credits text={`${REWARDS_BALANCE.credits} Green Credits`} />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <AppText variant="title">Redeem Offers</AppText>
          <AppText variant="caption" color={colors.primary} style={styles.bold}>
            See all
          </AppText>
        </View>

        <View style={styles.list}>
          {OFFERS.map((o, i) => (
            <View key={o.id} style={[styles.row, i > 0 && styles.divider]}>
              <View style={styles.tile}>
                <Ionicons name={o.icon} size={24} color={colors.primary} />
              </View>
              <View style={styles.flex}>
                <AppText variant="bodyStrong">{o.title}</AppText>
                <AppText variant="bodyStrong">{o.place}</AppText>
                <AppText variant="small" color={colors.textSecondary}>
                  {o.note}
                </AppText>
              </View>
              <View style={styles.badge}>
                <AppText variant="small" color={colors.surface} style={styles.bold}>
                  {o.badge}
                </AppText>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  bold: { fontFamily: 'Inter_600SemiBold' },
  gap: { gap: spacing.xs },
  section: { gap: spacing.md },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  list: {
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.subtle,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.lg },
  divider: { borderTopWidth: 1, borderTopColor: colors.border },
  tile: {
    width: spacing.xxxl + spacing.sm,
    height: spacing.xxxl + spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.sm, backgroundColor: colors.primary },
});
