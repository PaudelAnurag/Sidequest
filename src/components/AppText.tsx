import { Text, TextProps } from 'react-native';
import { colors, textVariants } from '../constants/theme';

type Props = TextProps & {
  variant?: keyof typeof textVariants;
  color?: string;
  align?: 'left' | 'center' | 'right';
};

export function AppText({ variant = 'body', color = colors.text, align, style, ...rest }: Props) {
  return <Text {...rest} style={[textVariants[variant], { color, textAlign: align }, style]} />;
}
