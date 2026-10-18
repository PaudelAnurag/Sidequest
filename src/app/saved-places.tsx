import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Card } from '../components/ListRow';
import { Screen } from '../components/Screen';
import { colors, radius, spacing } from '../constants/theme';
import { PLACES } from '../mock';

export default function SavedPlaces() {
  const router = useRouter();
  return (
    <Screen footer={<Button title="Discover More Places" onPress={() => router.push('/map')} />}>
      <Header title="Saved Places" />
      <Card>
        {PLACES.map((p, i) => (
          <Pressable
            key={p.id}
            style={[styles.row, i > 0 && styles.divider]}
            onPress={() => router.push(`/place/${p.id}`)}
            accessibilityRole="button"
          >
            <View style={styles.tile}>
              <Ionicons name={p.icon} size={20} color={colors.primary} />
            </View>
            <View style={styles.flex}>
              <AppText variant="bodyStrong">{p.name}</AppText>
              <AppText variant="small" color={colors.textSecondary}>
                {p.kind}
              </AppText>
            </View>
            <View style={styles.right}>
              <Ionicons name="star" size={16} color={colors.warning} />
              <AppText variant="small" color={colors.textSecondary}>
                {p.distance}
              </AppText>
            </View>
          </Pressable>
        ))}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  divider: { borderTopWidth: 1, borderTopColor: colors.border },
  tile: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: { alignItems: 'flex-end', gap: spacing.xs },
});
