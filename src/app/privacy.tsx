import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText';
import { Header } from '../components/Header';
import { Rows, Section } from '../components/ListRow';
import { Screen } from '../components/Screen';
import { colors, spacing } from '../constants/theme';

export default function Privacy() {
  const tracking = useState(true);
  const biometric = useState(true);
  const twoFactor = useState(false);

  // TODO: sub-screens, real biometric (expo-local-authentication) and 2FA
  return (
    <Screen>
      <Header title="Privacy & Security" />
      <Section title="Privacy">
        <Rows
          rows={[
            { icon: 'document-lock-outline', label: 'Data & Privacy', sub: 'Manage your data and permissions', onPress: () => {} },
            { icon: 'location-outline', label: 'Location Access', value: 'While Using the App', onPress: () => {} },
            { icon: 'footsteps-outline', label: 'Activity Tracking', sub: 'Allow tracking to improve experience', toggle: tracking },
          ]}
        />
      </Section>
      <Section title="Security">
        <Rows
          rows={[
            { icon: 'key-outline', label: 'Change Password', onPress: () => {} },
            { icon: 'finger-print-outline', label: 'Biometric Login', sub: 'Use Face ID / Touch ID', toggle: biometric },
            { icon: 'shield-outline', label: 'Two-Factor Authentication', sub: 'Add an extra layer of security', toggle: twoFactor },
          ]}
        />
      </Section>
      <View style={styles.note}>
        <Ionicons name="lock-closed-outline" size={14} color={colors.textSecondary} />
        <AppText variant="small" color={colors.textSecondary}>
          Your data is encrypted and secure
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  note: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs },
});
