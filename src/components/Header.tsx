import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from './AppText';
import { colors, spacing } from '../constants/theme';

export function Header({ title, right }: { title?: string; right?: ReactNode }) {
  const router = useRouter();
  return (
    <View style={styles.row}>
      <Pressable onPress={() => router.back()} hitSlop={spacing.md} accessibilityRole="button" accessibilityLabel="Back">
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </Pressable>
      {title ? <AppText variant="bodyStrong">{title}</AppText> : null}
      <View style={styles.side}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  side: { minWidth: spacing.xl, alignItems: 'flex-end' },
});
