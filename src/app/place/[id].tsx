import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '../../components/AppText';
import { Button } from '../../components/Button';
import { Credits } from '../../components/Credits';
import { Header } from '../../components/Header';
import { Card, Section } from '../../components/ListRow';
import { Screen } from '../../components/Screen';
import { colors, radius, spacing } from '../../constants/theme';
import { PLACES } from '../../mock';
import { getQuest, gbp } from '../../quests';

export default function PlaceDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const p = PLACES.find((x) => x.id === id) ?? PLACES[0];
  const q = p.questId ? getQuest(p.questId) : undefined;

  return (
    <Screen footer={<Button title="View on Map" onPress={() => router.push({ pathname: '/map', params: { id: p.id } })} />}>
      <Header title="Saved Place Details" />

      <View style={styles.hero}>
        <Ionicons name={p.icon} size={56} color={colors.primary} />
      </View>

      <View style={styles.gap}>
        <AppText variant="h2">{p.name}</AppText>
        <View style={styles.meta}>
          <AppText variant="caption" color={colors.textSecondary}>
            {p.kind}
          </AppText>
          <Ionicons name="star" size={14} color={colors.warning} />
          <AppText variant="caption">{p.rating}</AppText>
          <AppText variant="caption" color={colors.textSecondary}>
            · {p.distance}
          </AppText>
        </View>
        <AppText color={colors.textSecondary}>{p.about}</AppText>
      </View>

      <View style={styles.gap}>
        <View style={styles.meta}>
          <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
          <AppText variant="caption">{p.address}</AppText>
        </View>
        <View style={styles.meta}>
          <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
          <AppText variant="caption">{p.hours}</AppText>
        </View>
      </View>

      <Section title="Why you'll love it">
        <View style={styles.tags}>
          {p.tags.map((t) => (
            <View key={t} style={styles.tag}>
              <AppText variant="small" color={colors.primary}>
                {t}
              </AppText>
            </View>
          ))}
        </View>
      </Section>

      {q ? (
        <Section title="Active Quests">
          <Card>
            <Pressable
              style={styles.quest}
              onPress={() => router.push(`/quest/${q.id}`)}
              accessibilityRole="button"
            >
              <Ionicons name={q.icon} size={20} color={colors.primary} />
              <View style={styles.flex}>
                <AppText variant="bodyStrong">{q.title}</AppText>
                <Credits text={`Earn ${gbp(q.credits)}`} />
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </Pressable>
          </Card>
        </Section>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  gap: { gap: spacing.sm },
  meta: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  hero: {
    height: 160,
    borderRadius: radius.lg,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.secondary,
  },
  quest: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
});
