import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pedometer } from 'expo-sensors';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText';
import { Button } from '../components/Button';
import { Screen } from '../components/Screen';
import { colors, radius, shadow, spacing } from '../constants/theme';

type Key = 'location' | 'camera' | 'notifications' | 'activity';
type Status = 'granted' | 'denied';

const ITEMS: {
  key: Key;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  desc: string;
  request: () => Promise<{ granted: boolean }>;
}[] = [
  { key: 'location', icon: 'location-outline', title: 'Location', desc: 'To find quests near you', request: () => Location.requestForegroundPermissionsAsync() },
  { key: 'camera', icon: 'camera-outline', title: 'Camera', desc: 'To scan QR codes', request: () => Camera.requestCameraPermissionsAsync() },
  { key: 'notifications', icon: 'notifications-outline', title: 'Notifications', desc: 'To send updates and rewards', request: () => Notifications.requestPermissionsAsync() },
  { key: 'activity', icon: 'walk-outline', title: 'Activity Tracking', desc: 'To improve your journey', request: () => Pedometer.requestPermissionsAsync() },
];

export default function Permissions() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [status, setStatus] = useState<Partial<Record<Key, Status>>>({});
  const [loading, setLoading] = useState(false);

  const onContinue = async () => {
    setLoading(true);
    for (const item of ITEMS) {
      try {
        const res = await item.request();
        setStatus((s) => ({ ...s, [item.key]: res.granted ? 'granted' : 'denied' }));
      } catch {
        setStatus((s) => ({ ...s, [item.key]: 'denied' }));
      }
    }
    await new Promise((r) => setTimeout(r, 600)); // let the user see the results
    setLoading(false);
    router.push({ pathname: '/verify-email', params: { email: email ?? '' } });
  };

  return (
    <Screen>
      <View style={styles.header}>
        <AppText variant="h1">We need a few permissions</AppText>
        <AppText color={colors.textSecondary}>These help us verify your actions and show you relevant quests.</AppText>
      </View>

      <View style={styles.card}>
        {ITEMS.map((item, i) => (
          <View key={item.key} style={[styles.row, i > 0 && styles.divider]}>
            <View style={styles.iconWrap}>
              <Ionicons name={item.icon} size={20} color={colors.primary} />
            </View>
            <View style={styles.rowText}>
              <AppText variant="bodyStrong">{item.title}</AppText>
              <AppText variant="caption" color={colors.textSecondary}>
                {item.desc}
              </AppText>
            </View>
            {status[item.key] === 'granted' && <Ionicons name="checkmark-circle" size={24} color={colors.success} />}
            {status[item.key] === 'denied' && <Ionicons name="alert-circle" size={24} color={colors.warning} />}
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Button title="Continue" onPress={onContinue} loading={loading} />
        <AppText variant="small" color={colors.textSecondary} align="center">
          You can change this later in settings.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { gap: spacing.sm, marginTop: spacing.xl },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    ...shadow.subtle,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.lg },
  divider: { borderTopWidth: 1, borderTopColor: colors.border },
  iconWrap: {
    width: spacing.xxxl - spacing.sm,
    height: spacing.xxxl - spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: { flex: 1 },
  footer: { flex: 1, justifyContent: 'flex-end', gap: spacing.md },
});
