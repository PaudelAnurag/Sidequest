import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText';
import { Button } from '../components/Button';
import { Chips } from '../components/Chips';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Card } from '../components/ListRow';
import { Screen } from '../components/Screen';
import { colors, spacing } from '../constants/theme';
import { FAQS, FAQ_TABS } from '../mock';

export default function Faq() {
  const router = useRouter();
  const params = useLocalSearchParams<{ q?: string }>();
  const [query, setQuery] = useState(params.q ?? '');
  const [tab, setTab] = useState<(typeof FAQ_TABS)[number]>('Popular');
  const [open, setOpen] = useState<string | null>(null);

  const needle = query.trim().toLowerCase();
  // A search looks across every tab; otherwise filter by the selected tab.
  const items = FAQS.filter((f) => (needle ? (f.q + f.a).toLowerCase().includes(needle) : f.tags.includes(tab)));

  return (
    <Screen>
      <Header title="Help Center" />
      <Input value={query} onChangeText={setQuery} placeholder="Search FAQs" />
      <Chips options={FAQ_TABS} value={tab} onChange={setTab} />

      {items.length === 0 ? (
        <AppText color={colors.textSecondary} align="center">
          No answers found.
        </AppText>
      ) : (
        <Card>
          {items.map((f, i) => {
            const expanded = open === f.q;
            return (
              <View key={f.q} style={i > 0 && styles.divider}>
                <Pressable
                  style={styles.q}
                  onPress={() => setOpen(expanded ? null : f.q)}
                  accessibilityRole="button"
                  accessibilityState={{ expanded }}
                >
                  <AppText style={styles.flex}>{f.q}</AppText>
                  <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={20} color={colors.textSecondary} />
                </Pressable>
                {expanded ? (
                  <AppText variant="caption" color={colors.textSecondary} style={styles.a}>
                    {f.a}
                  </AppText>
                ) : null}
              </View>
            );
          })}
        </Card>
      )}

      <View style={styles.still}>
        <AppText variant="bodyStrong">Still need help?</AppText>
        <Button title="Contact Us" variant="secondary" onPress={() => router.push('/contact')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  divider: { borderTopWidth: 1, borderTopColor: colors.border },
  q: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.lg },
  a: { paddingBottom: spacing.lg },
  still: { gap: spacing.sm },
});
