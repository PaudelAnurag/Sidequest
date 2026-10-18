import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { LogoMark } from '../components/Logo';
import { ParkScene } from '../components/ParkScene';
import { Screen } from '../components/Screen';
import { colors, spacing } from '../constants/theme';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Auth() {
  const router = useRouter();
  const params = useLocalSearchParams<{ mode?: string }>();
  const [mode, setMode] = useState<'signup' | 'login'>(params.mode === 'login' ? 'login' : 'signup');
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>();

  const goNext = (userEmail: string) => router.push({ pathname: '/permissions', params: { email: userEmail } });

  const submitEmail = () => {
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setError('Enter a valid email address.');
      return;
    }
    setError(undefined);
    goNext(value);
  };

  // TODO: wire Google / Apple OAuth (expo-auth-session / expo-apple-authentication)
  const socialSignIn = () => goNext('');

  return (
    <Screen>
      <View style={styles.header}>
        <LogoMark size={48} />
        <AppText color={colors.textSecondary}>{mode === 'signup' ? 'Welcome to' : 'Welcome back to'}</AppText>
        <AppText variant="h1" color={colors.primary}>
          SideQuest
        </AppText>
      </View>

      <View style={styles.scene}>
        <ParkScene height={120} />
      </View>

      <View style={styles.actions}>
        {showEmail ? (
          <>
            <Input
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                if (error) setError(undefined);
              }}
              placeholder="Email address"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              autoFocus
              returnKeyType="go"
              onSubmitEditing={submitEmail}
              error={error}
            />
            <Button title="Continue" onPress={submitEmail} />
          </>
        ) : (
          <Button title="Continue with Email" onPress={() => setShowEmail(true)} />
        )}
        <Button
          title="Continue with Google"
          variant="secondary"
          icon={<Ionicons name="logo-google" size={20} color={colors.text} />}
          onPress={socialSignIn}
        />
        <Button
          title="Continue with Apple"
          variant="secondary"
          icon={<Ionicons name="logo-apple" size={20} color={colors.text} />}
          onPress={socialSignIn}
        />
      </View>

      <Pressable onPress={() => setMode(mode === 'signup' ? 'login' : 'signup')} accessibilityRole="button">
        <AppText variant="caption" color={colors.textSecondary} align="center">
          {mode === 'signup' ? 'Already have an account? ' : 'New to SideQuest? '}
          <AppText variant="caption" color={colors.primary} style={styles.link}>
            {mode === 'signup' ? 'Log in' : 'Sign up'}
          </AppText>
        </AppText>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', gap: spacing.xs, marginTop: spacing.xxxl },
  scene: { flex: 1, justifyContent: 'flex-end', minHeight: 120 },
  actions: { gap: spacing.md },
  link: { fontFamily: 'Inter_600SemiBold' },
});
