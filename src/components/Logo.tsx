import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { AppText } from './AppText';
import { colors, spacing } from '../constants/theme';

export function LogoMark({ size = 48 }: { size?: number }) {
  return <Ionicons name="location" size={size} color={colors.primary} />;
}

export function Logo() {
  return (
    <View style={styles.row}>
      <LogoMark size={32} />
      <AppText variant="h2" color={colors.primary}>
        SideQuest
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
});
