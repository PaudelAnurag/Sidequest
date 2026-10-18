import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';
import { AppText } from './AppText';
import { colors, radius, shadow, spacing } from '../constants/theme';

type Icon = keyof typeof Ionicons.glyphMap;

export type Row = {
  icon: Icon;
  label: string;
  sub?: string;
  /** Right-aligned text, e.g. "English". */
  value?: string;
  toggle?: [boolean, (v: boolean) => void];
  onPress?: () => void;
  danger?: boolean;
};

export function Card({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

export function Section({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      {title ? (
        <AppText variant="caption" color={colors.textSecondary}>
          {title}
        </AppText>
      ) : null}
      {children}
    </View>
  );
}

/** One bordered card of rows: icon, label, and a chevron / value / switch. */
export function Rows({ rows }: { rows: Row[] }) {
  return (
    <Card>
      {rows.map((r, i) => {
        const color = r.danger ? colors.error : colors.text;
        const body = (
          <>
            <Ionicons name={r.icon} size={20} color={r.danger ? colors.error : colors.primary} />
            <View style={styles.flex}>
              <AppText color={color}>{r.label}</AppText>
              {r.sub ? (
                <AppText variant="small" color={colors.textSecondary}>
                  {r.sub}
                </AppText>
              ) : null}
            </View>
            {r.value ? (
              <AppText variant="caption" color={colors.textSecondary}>
                {r.value}
              </AppText>
            ) : null}
            {r.toggle ? (
              <Switch
                value={r.toggle[0]}
                onValueChange={r.toggle[1]}
                trackColor={{ true: colors.primary, false: colors.border }}
                accessibilityLabel={r.label}
              />
            ) : r.onPress && !r.danger ? (
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            ) : null}
          </>
        );
        const style = [styles.row, i > 0 && styles.divider];
        return r.onPress ? (
          <Pressable key={r.label} style={style} onPress={r.onPress} accessibilityRole="button">
            {body}
          </Pressable>
        ) : (
          <View key={r.label} style={style}>
            {body}
          </View>
        );
      })}
    </Card>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  section: { gap: spacing.sm },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    ...shadow.subtle,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md, minHeight: 56 },
  divider: { borderTopWidth: 1, borderTopColor: colors.border },
});
