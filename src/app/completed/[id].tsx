import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../../components/AppText';
import { Button } from '../../components/Button';
import { Credits } from '../../components/Credits';
import { Screen } from '../../components/Screen';
import { colors, radius, shadow, spacing } from '../../constants/theme';
import { getQuest, gbp } from '../../quests';

export default function Completed() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const q = getQuest(id);

  return (
    <Screen footer={<Button title="View Rewards" onPress={() => router.push(`/claim/${q.id}`)} />}>
      <View style={styles.center}>
        <View style={styles.check}>
          <Ionicons name="checkmark" size={64} color={colors.surface} />
        </View>
        <AppText variant="h1" align="center">
          Quest Completed!
        </AppText>
        <AppText color={colors.textSecondary}>You earned</AppText>
        <AppText variant="display" color={colors.primary}>
          {gbp(q.credits)}
        </AppText>
        <Credits text={`${q.credits} Green Credits`} />
      </View>

      <View style={styles.card}>
        <Ionicons name="leaf-outline" size={24} color={colors.primary} />
        <View style={styles.flex}>
          <AppText variant="bodyStrong">Great job!</AppText>
          <AppText variant="caption" color={colors.textSecondary}>
            You’re helping local businesses and the planet.
          </AppText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  check: {
    width: spacing.huge * 2,
    height: spacing.huge * 2,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.subtle,
  },
});
