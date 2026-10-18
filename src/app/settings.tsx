import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Header } from '../components/Header';
import { Rows, Section } from '../components/ListRow';
import { Screen } from '../components/Screen';

export default function Settings() {
  const router = useRouter();
  const [dark, setDark] = useState(false); // TODO: wire to a theme; app is light-only today

  return (
    <Screen>
      <Header title="Settings" />
      <Section title="Account">
        <Rows
          rows={[
            { icon: 'person-outline', label: 'Edit Profile', onPress: () => {} }, // TODO: screen
            { icon: 'options-outline', label: 'Preferences', onPress: () => {} }, // TODO: screen
          ]}
        />
      </Section>
      <Section title="App">
        <Rows
          rows={[
            { icon: 'notifications-outline', label: 'Notifications', onPress: () => router.push('/notifications') },
            { icon: 'shield-checkmark-outline', label: 'Privacy & Security', onPress: () => router.push('/privacy') },
            { icon: 'language-outline', label: 'Language', value: 'English' },
            { icon: 'moon-outline', label: 'Dark Mode', toggle: [dark, setDark] },
            { icon: 'location-outline', label: 'Location', value: 'On' },
          ]}
        />
      </Section>
      <Section title="More">
        <Rows
          rows={[
            { icon: 'information-circle-outline', label: 'About SideQuest', onPress: () => {} }, // TODO: screen
            { icon: 'document-text-outline', label: 'Terms & Conditions', onPress: () => {} }, // TODO: screen
            { icon: 'log-out-outline', label: 'Log Out', danger: true, onPress: () => router.replace('/auth') }, // TODO: clear session
          ]}
        />
      </Section>
    </Screen>
  );
}
