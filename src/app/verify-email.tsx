import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText';
import { Button } from '../components/Button';
import { Screen } from '../components/Screen';
import { colors, radius, shadow, spacing } from '../constants/theme';

const RESEND_SECONDS = 59;

export default function VerifyEmail() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [seconds, setSeconds] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds]);

  const resend = () => {
    // TODO: call backend to resend the verification link
    setSeconds(RESEND_SECONDS);
  };

  return (
    <Screen>
      <View style={styles.center}>
        <View style={styles.envelope}>
          <Ionicons name="mail-open-outline" size={48} color={colors.primary} />
          <View style={styles.badge}>
            <Ionicons name="checkmark" size={16} color={colors.surface} />
          </View>
        </View>

        <AppText variant="h2" align="center">
          Verify your email
        </AppText>

        <View style={styles.text}>
          <AppText color={colors.textSecondary} align="center">
            We’ve sent a verification link to
          </AppText>
          <AppText variant="bodyStrong" align="center">
            {email || 'your email'}
          </AppText>
        </View>

        <AppText variant="caption" color={colors.textSecondary} align="center">
          Please check your inbox and click the link to continue.
        </AppText>

        <View style={styles.links}>
          {seconds > 0 ? (
            <AppText variant="caption" color={colors.textSecondary}>
              Resend email ({seconds}s)
            </AppText>
          ) : (
            <Pressable onPress={resend} accessibilityRole="button" hitSlop={spacing.sm}>
              <AppText variant="caption" color={colors.primary} style={styles.linkStrong}>
                Resend email
              </AppText>
            </Pressable>
          )}
          <Pressable onPress={() => router.replace('/auth')} accessibilityRole="button" hitSlop={spacing.sm}>
            <AppText variant="caption" color={colors.primary} style={styles.linkStrong}>
              Change email
            </AppText>
          </Pressable>
        </View>

        {/* TODO: remove once the verification link deep-links into the app */}
        <Button title="I’ve verified my email" variant="secondary" onPress={() => router.replace('/home')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.lg },
  envelope: {
    width: spacing.huge * 2,
    height: spacing.huge * 2,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    ...shadow.medium,
  },
  badge: {
    position: 'absolute',
    top: -spacing.sm,
    right: -spacing.sm,
    width: spacing.xl + spacing.xs,
    height: spacing.xl + spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { alignItems: 'center' },
  links: { alignItems: 'center', gap: spacing.md, marginTop: spacing.lg },
  linkStrong: { fontFamily: 'Inter_600SemiBold' },
});
