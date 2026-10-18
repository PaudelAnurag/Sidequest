import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../../components/AppText';
import { Card } from '../../components/ListRow';
import { Credits } from '../../components/Credits';
import { Header } from '../../components/Header';
import { Screen } from '../../components/Screen';
import { colors, radius, spacing } from '../../constants/theme';
import { ACTIVITY } from '../../mock';
import { gbp } from '../../quests';

export default function ActivityDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const a = ACTIVITY.find((x) => x.id === id) ?? ACTIVITY[0];
  const credits = Number(a.credits.replace(/\D/g, ''));
  const redeemed = a.status === 'Redeemed';
  const details: [string, string][] = [
    ['Status', a.status],
    ['Type', redeemed ? 'Reward' : 'Quest'],
    ['Date', a.month],
    ['Reward', `${redeemed ? '−' : ''}${gbp(credits)}`],
    ['Payment Method', 'Wallet Balance'],
  ];

  return (
    <Screen>
      <Header title="Activity Details" />

      <View style={styles.hero}>
        <Ionicons name={a.icon} size={56} color={colors.primary} />
      </View>

      <View style={styles.gap}>
        <View style={styles.badge}>
          <AppText variant="small" color={colors.success}>
            {a.status}
          </AppText>
        </View>
        <AppText variant="h2">{a.title}</AppText>
        <Credits text={a.place} />
      </View>

      <Card>
        <View style={styles.earned}>
          <AppText variant="caption" color={colors.textSecondary}>
            {redeemed ? 'You redeemed' : 'You earned'}
          </AppText>
          <AppText variant="h1" color={colors.primary}>
            {gbp(credits)}
          </AppText>
          <Credits text={`${credits} Green Credits`} />
        </View>
      </Card>

      <View style={styles.gap}>
        <AppText variant="title">Details</AppText>
        <Card>
          {details.map(([k, v], i) => (
            <View key={k} style={[styles.row, i > 0 && styles.divider]}>
              <AppText color={colors.textSecondary}>{k}</AppText>
              <AppText variant="bodyStrong">{v}</AppText>
            </View>
          ))}
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  gap: { gap: spacing.sm },
  hero: {
    height: 160,
    borderRadius: radius.lg,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.secondary,
  },
  earned: { paddingVertical: spacing.lg, gap: spacing.xs },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.md },
  divider: { borderTopWidth: 1, borderTopColor: colors.border },
});
