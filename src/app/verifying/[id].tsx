import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { AppText } from '../../components/AppText';
import { Screen } from '../../components/Screen';
import { colors, radius, spacing } from '../../constants/theme';

const SIZE = 192;

export default function Verifying() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [spin] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 1200, easing: Easing.linear, useNativeDriver: true }),
    );
    loop.start();
    // TODO: poll the backend for the real verification result
    const timer = setTimeout(() => router.replace(`/completed/${id}`), 2500);
    return () => {
      loop.stop();
      clearTimeout(timer);
    };
  }, [id, router, spin]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <Screen>
      <View style={styles.center}>
        <View style={styles.ring}>
          <View style={[StyleSheet.absoluteFill, styles.track]} />
          <Animated.View style={[StyleSheet.absoluteFill, styles.arc, { transform: [{ rotate }] }]} />
          <View style={styles.inner}>
            <Ionicons name="leaf" size={64} color={colors.primary} />
          </View>
        </View>
        <AppText variant="h2" align="center">
          Verifying your action
        </AppText>
        <AppText color={colors.textSecondary} align="center">
          Please wait a moment while we confirm your visit.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md },
  ring: { width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl },
  track: { borderRadius: radius.full, borderWidth: 8, borderColor: colors.border },
  arc: { borderRadius: radius.full, borderWidth: 8, borderColor: 'transparent', borderTopColor: colors.primary },
  inner: {
    width: SIZE - spacing.xxxl,
    height: SIZE - spacing.xxxl,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
