import { StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../constants/theme';

type Pct = `${number}%`;

function Tree({ left, size }: { left: Pct; size: number }) {
  return (
    <View style={[styles.tree, { left }]}>
      <View style={{ width: size, height: size, borderRadius: radius.full, backgroundColor: colors.secondary }} />
      <View style={{ width: spacing.xs, height: spacing.lg, backgroundColor: colors.primary }} />
    </View>
  );
}

function Building({ left, width, height }: { left: Pct; width: number; height: number }) {
  return <View style={[styles.building, { left, width, height }]} />;
}

/** Simple flat park illustration built from palette colors only. */
export function ParkScene({ height = 160 }: { height?: number }) {
  return (
    <View style={[styles.scene, { height }]} accessible={false}>
      <View style={styles.sun} />
      <Building left="8%" width={spacing.xl} height={spacing.huge} />
      <Building left="18%" width={spacing.xxl} height={spacing.xxxl} />
      <Building left="72%" width={spacing.xl} height={spacing.huge} />
      <View style={styles.hill} />
      <Tree left="4%" size={spacing.xxxl} />
      <Tree left="26%" size={spacing.xxl} />
      <Tree left="62%" size={spacing.xxl} />
      <Tree left="82%" size={spacing.xxxl} />
    </View>
  );
}

const styles = StyleSheet.create({
  scene: { width: '100%', overflow: 'hidden' },
  sun: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.xl,
    width: spacing.xxxl,
    height: spacing.xxxl,
    borderRadius: radius.full,
    backgroundColor: colors.warning,
    opacity: 0.6,
  },
  building: { position: 'absolute', bottom: spacing.xl, backgroundColor: colors.border },
  hill: {
    position: 'absolute',
    bottom: -spacing.xxxl,
    left: '-10%',
    width: '120%',
    height: spacing.huge * 2,
    borderRadius: radius.full,
    backgroundColor: colors.secondary,
    opacity: 0.35,
  },
  tree: { position: 'absolute', bottom: spacing.md, alignItems: 'center' },
});
