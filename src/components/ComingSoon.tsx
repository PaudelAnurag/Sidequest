import { AppText } from './AppText';
import { Screen } from './Screen';
import { colors } from '../constants/theme';

export function ComingSoon({ title }: { title: string }) {
  return (
    <Screen noBottomInset>
      <AppText variant="h2">{title}</AppText>
      <AppText color={colors.textSecondary}>Coming soon.</AppText>
    </Screen>
  );
}
