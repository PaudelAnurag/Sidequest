import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Rows, Section } from '../components/ListRow';
import { Screen } from '../components/Screen';
import { colors, radius, spacing } from '../constants/theme';
import { PROFILE } from '../mock';

export default function Help() {
  const router = useRouter();
  const [q, setQ] = useState('');

  return (
    <Screen>
      <Header title="Help & Support" />
      <View>
        <AppText variant="h2">Hi {PROFILE.name.split(' ')[0]},</AppText>
        <AppText color={colors.textSecondary}>How can we help you today?</AppText>
      </View>

      <Input
        value={q}
        onChangeText={setQ}
        placeholder="Search for help topics"
        returnKeyType="search"
        onSubmitEditing={() => router.push({ pathname: '/faq', params: { q } })}
      />

      <Section title="Quick Support">
        <Rows
          rows={[
            { icon: 'help-buoy-outline', label: 'Help Center', sub: 'Find answers to common questions', onPress: () => router.push('/faq') },
            { icon: 'mail-outline', label: 'Contact Us', sub: 'Send us a message and our team will get back to you', onPress: () => router.push('/contact') },
            { icon: 'flag-outline', label: 'Report an Issue', sub: 'Let us know if something went wrong', onPress: () => router.push({ pathname: '/contact', params: { subject: 'Issue report' } }) },
            { icon: 'chatbox-ellipses-outline', label: 'Share Feedback', sub: 'Help us improve SideQuest', onPress: () => router.push({ pathname: '/contact', params: { subject: 'Feedback' } }) },
          ]}
        />
      </Section>

      <View style={styles.banner}>
        <Ionicons name="headset-outline" size={28} color={colors.primary} />
        <View style={styles.flex}>
          <AppText variant="bodyStrong">We&apos;re here to help!</AppText>
          <AppText variant="small" color={colors.textSecondary}>
            Usually replies within a few hours
          </AppText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.secondary,
  },
});
