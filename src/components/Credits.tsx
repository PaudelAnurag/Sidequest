import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { AppText } from './AppText';
import { colors, spacing } from '../constants/theme';

export function Credits({ text, color = colors.textSecondary }: { text: string; color?: string }) {
  return (
    <View style={styles.row}>
      <Ionicons name="leaf" size={16} color={colors.success} />
      <AppText variant="small" color={color}>
        {text}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
});
