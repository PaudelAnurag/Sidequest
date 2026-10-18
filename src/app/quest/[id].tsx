import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, Share, StyleSheet, View } from 'react-native';
import { AppText } from '../../components/AppText';
import { Button } from '../../components/Button';
import { Credits } from '../../components/Credits';
import { Header } from '../../components/Header';
import { Screen } from '../../components/Screen';
import { getQuest, gbp } from '../../quests';
import { colors, radius, shadow, spacing } from '../../constants/theme';

export default function QuestDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const q = getQuest(id);

  return (
    <Screen footer={<Button title="Start Quest" onPress={() => router.push(`/progress/${q.id}`)} />}>
      <Header
        right={
          <Pressable
            onPress={() => Share.share({ message: `Join me on SideQuest: ${q.title}` })}
            hitSlop={spacing.md}
            accessibilityRole="button"
            accessibilityLabel="Share"
          >
            <Ionicons name="share-outline" size={24} color={colors.text} />
          </Pressable>
        }
      />

      <View style={styles.hero}>
        <Ionicons name={q.icon} size={64} color={colors.primary} />
        <View style={styles.sponsor}>
          <AppText variant="small" color={colors.textSecondary}>
            Sponsored by
          </AppText>
          <AppText variant="bodyStrong">{q.sponsor}</AppText>
        </View>
      </View>

      <View style={styles.gap}>
        <AppText variant="h1">{q.title}</AppText>
        <AppText color={colors.textSecondary}>{q.description}</AppText>
      </View>

      <View style={styles.steps}>
        {q.steps.map(([icon, text]) => (
          <View key={text} style={styles.step}>
            <Ionicons name={icon} size={20} color={colors.text} />
            <AppText variant="caption">{text}</AppText>
          </View>
        ))}
      </View>

      <View style={styles.reward}>
        <AppText variant="small" color={colors.textSecondary}>
          Reward
        </AppText>
        <AppText variant="h1">{gbp(q.credits)}</AppText>
        <Credits text={`${q.credits} Green Credits`} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  gap: { gap: spacing.sm },
  hero: {
    height: 192,
    borderRadius: radius.lg,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sponsor: {
    position: 'absolute',
    left: spacing.lg,
    bottom: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    ...shadow.subtle,
  },
  steps: { gap: spacing.md },
  step: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  reward: {
    gap: spacing.xs,
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.subtle,
  },
});
