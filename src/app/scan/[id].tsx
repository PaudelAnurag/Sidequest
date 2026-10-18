import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../../components/AppText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { colors, radius, spacing } from '../../constants/theme';

const FRAME = 240;
const SCRIM = `${colors.text}99`; // palette text color at 60% for legibility over the camera
const CORNERS = [
  { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: radius.md },
  { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: radius.md },
  { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: radius.md },
  { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: radius.md },
] as const;

export default function Scan() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [permission, requestPermission] = useCameraPermissions();
  const [manual, setManual] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState<string>();
  const done = useRef(false);

  // TODO: validate the scanned/typed code against the quest on the backend
  const submit = () => {
    if (done.current) return;
    done.current = true;
    router.replace(`/verifying/${id}`);
  };

  const submitManual = () => {
    if (!code.trim()) {
      setError('Enter the code shown at the counter.');
      return;
    }
    submit();
  };

  return (
    <View style={styles.root}>
      {permission?.granted ? (
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={() => submit()}
        />
      ) : (
        <View style={styles.denied}>
          <AppText color={colors.surface} align="center">
            Camera access is needed to scan the QR code.
          </AppText>
          {permission ? <Button title="Allow camera" onPress={requestPermission} /> : null}
        </View>
      )}

      <SafeAreaView style={styles.overlay}>
        <KeyboardAvoidingView style={styles.overlay} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.top}>
            <Pressable onPress={() => router.back()} hitSlop={spacing.md} accessibilityRole="button" accessibilityLabel="Back">
              <Ionicons name="arrow-back" size={24} color={colors.surface} />
            </Pressable>
            <View style={styles.topText}>
              <AppText variant="title" color={colors.surface}>
                Scan the QR code at the counter
              </AppText>
              <AppText variant="caption" color={colors.surface}>
                This verifies your visit and completes the quest.
              </AppText>
            </View>
          </View>

          <View style={styles.middle}>
            <View style={styles.frame}>
              {CORNERS.map((c, i) => (
                <View key={i} style={[styles.corner, c]} />
              ))}
            </View>
          </View>

          <View style={styles.bottom}>
            {manual ? (
              <>
                <Input
                  value={code}
                  onChangeText={(t) => {
                    setCode(t);
                    if (error) setError(undefined);
                  }}
                  placeholder="Code from the counter"
                  autoCapitalize="characters"
                  autoCorrect={false}
                  autoFocus
                  returnKeyType="go"
                  onSubmitEditing={submitManual}
                  error={error}
                />
                <Button title="Submit code" onPress={submitManual} />
              </>
            ) : (
              <Pressable onPress={() => setManual(true)} accessibilityRole="button">
                <AppText variant="bodyStrong" color={colors.surface} align="center">
                  Enter code manually
                </AppText>
              </Pressable>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.text },
  overlay: { flex: 1 },
  denied: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', gap: spacing.lg, padding: spacing.xl },
  top: { flexDirection: 'row', gap: spacing.md, padding: spacing.lg, backgroundColor: SCRIM },
  topText: { flex: 1, gap: spacing.xs },
  middle: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  frame: { width: FRAME, height: FRAME },
  corner: { position: 'absolute', width: spacing.xxxl, height: spacing.xxxl, borderColor: colors.secondary },
  bottom: { gap: spacing.md, padding: spacing.lg, backgroundColor: SCRIM },
});
