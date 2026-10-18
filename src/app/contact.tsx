import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Screen } from '../components/Screen';
import { colors, spacing } from '../constants/theme';

export default function Contact() {
  const router = useRouter();
  const params = useLocalSearchParams<{ subject?: string }>();
  const [subject, setSubject] = useState(params.subject ?? '');
  const [message, setMessage] = useState('');
  const [tried, setTried] = useState(false);

  const send = () => {
    setTried(true);
    if (!subject.trim() || !message.trim()) return;
    // TODO: POST to the support API; attachments need expo-image-picker
    Alert.alert('Message sent', "Thanks — we'll get back to you soon.", [{ text: 'OK', onPress: () => router.back() }]);
  };

  return (
    <Screen
      footer={
        <View style={styles.footer}>
          <Button title="Send Message" onPress={send} />
          <AppText variant="small" color={colors.textSecondary} align="center">
            Usually replies within a few hours
          </AppText>
        </View>
      }
    >
      <Header title="Contact Us" />
      <View>
        <AppText variant="h2">We&apos;re here for you</AppText>
        <AppText color={colors.textSecondary}>Send us a message and our team will get back to you.</AppText>
      </View>
      <View style={styles.field}>
        <AppText variant="caption" color={colors.textSecondary}>
          Subject
        </AppText>
        <Input value={subject} onChangeText={setSubject} placeholder="I need help with a quest" error={tried && !subject.trim() ? 'Add a subject' : ''} />
      </View>
      <View style={styles.field}>
        <AppText variant="caption" color={colors.textSecondary}>
          Message
        </AppText>
        <Input
          value={message}
          onChangeText={setMessage}
          placeholder="Tell us what happened"
          multiline
          style={styles.message}
          error={tried && !message.trim() ? 'Add a message' : ''}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  field: { gap: spacing.xs },
  message: { height: 140, paddingTop: spacing.md, textAlignVertical: 'top' },
  footer: { gap: spacing.sm },
});
