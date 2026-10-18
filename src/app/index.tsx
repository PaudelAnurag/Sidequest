import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { ParkScene } from '../components/ParkScene';
import { Screen } from '../components/Screen';
import { colors, radius, spacing } from '../constants/theme';

export default function Onboarding() {
  const router = useRouter();

  return (
    <Screen>
      <Logo />

      <View style={styles.copy}>
        <AppText variant="display">Do good.</AppText>
        <AppText variant="display" color={colors.primary}>
          Get rewarded.
        </AppText>
        <AppText color={colors.textSecondary} style={styles.body}>
          Discover local places, complete quests, earn rewards and support businesses that care.
        </AppText>
      </View>

      <View style={styles.hero}>
        <View style={styles.walker}>
          <Ionicons name="walk" size={48} color={colors.primary} />
        </View>
        <ParkScene height={160} />
      </View>

      <View style={styles.actions}>
        <Button title="Get started" onPress={() => router.push('/auth')} />
        <Button title="I already have an account" variant="ghost" onPress={() => router.push({ pathname: '/auth', params: { mode: 'login' } })} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  copy: { gap: spacing.xs, marginTop: spacing.xl },
  body: { marginTop: spacing.md },
  hero: { flex: 1, justifyContent: 'flex-end', minHeight: 200 },
  walker: {
    alignSelf: 'center',
    width: spacing.huge + spacing.lg,
    height: spacing.huge + spacing.lg,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -spacing.lg,
    zIndex: 1,
  },
  actions: { gap: spacing.sm },
});
