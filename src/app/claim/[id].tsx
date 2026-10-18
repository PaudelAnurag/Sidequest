import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Share, StyleSheet, View } from 'react-native';
import { AppText } from '../../components/AppText';
import { Button } from '../../components/Button';
import { Credits } from '../../components/Credits';
import { Header } from '../../components/Header';
import { Screen } from '../../components/Screen';
import { colors, radius, shadow, spacing } from '../../constants/theme';
import { getQuest, gbp } from '../../quests';

type Choice = 'balance' | 'discount' | 'friend';

const OPTIONS: { key: Choice; icon: keyof typeof Ionicons.glyphMap; title: string; desc: string }[] = [
  { key: 'balance', icon: 'wallet-outline', title: 'Add to Balance', desc: 'Use credits later' },
  { key: 'discount', icon: 'pricetag-outline', title: 'Instant Discount', desc: 'Use at this store' },
  { key: 'friend', icon: 'person-outline', title: 'Send to Friend', desc: 'Share your reward' },
];

export default function Claim() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const q = getQuest(id);
  const [choice, setChoice] = useState<Choice>('balance');

  const claim = async () => {
    // TODO: persist the claim on the backend
    if (choice === 'friend') await Share.share({ message: `I earned ${gbp(q.credits)} on SideQuest — join me!` });
    router.dismissTo('/rewards');
  };

  return (
    <Screen footer={<Button title="Claim Reward" onPress={claim} />}>
      <Header title="Your Reward" />

      <View style={styles.reward}>
        <AppText variant="h1">{gbp(q.credits)}</AppText>
        <Credits text={`${q.credits} Green Credits`} />
      </View>

      <View style={styles.options}>
        <AppText variant="caption" color={colors.textSecondary}>
          Choose how to claim
        </AppText>
        {OPTIONS.map((o) => {
          const selected = o.key === choice;
          return (
            <Pressable
              key={o.key}
              onPress={() => setChoice(o.key)}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              style={[styles.option, selected && styles.selected]}
            >
              <Ionicons name={o.icon} size={24} color={colors.primary} />
              <View style={styles.flex}>
                <AppText variant="bodyStrong">{o.title}</AppText>
                <AppText variant="caption" color={colors.textSecondary}>
                  {o.desc}
                </AppText>
              </View>
              <Ionicons
                name={selected ? 'radio-button-on' : 'radio-button-off'}
                size={24}
                color={selected ? colors.primary : colors.border}
              />
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  reward: {
    gap: spacing.xs,
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.subtle,
  },
  options: { gap: spacing.md },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selected: { borderColor: colors.primary },
});
