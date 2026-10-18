import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { AppText } from './AppText';
import { colors, font, fontSize, radius, spacing } from '../constants/theme';

type Props = TextInputProps & { error?: string };

export function Input({ error, style, ...rest }: Props) {
  const [focused, setFocused] = useState(false);
  return (
    <View>
      <TextInput
        {...rest}
        placeholderTextColor={colors.textSecondary}
        onFocus={(e) => {
          setFocused(true);
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          rest.onBlur?.(e);
        }}
        style={[styles.input, focused && styles.focused, !!error && styles.error, style]}
      />
      {error ? (
        <AppText variant="small" color={colors.error} style={{ marginTop: spacing.xs }}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    color: colors.text,
    fontFamily: font.regular,
    fontSize: fontSize.md,
  },
  focused: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  error: { borderColor: colors.error },
});
