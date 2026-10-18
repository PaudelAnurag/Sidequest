import { TextStyle, ViewStyle } from 'react-native';

export const colors = {
  primary: '#075C3D',
  secondary: '#A8C49A',
  background: '#FAF9F5',
  surface: '#FFFFFF',
  text: '#17231D',
  textSecondary: '#777D76',
  border: '#E7E9E2',
  success: '#2E8B57',
  warning: '#E9B949',
  error: '#D9534F',
} as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48, huge: 64 } as const;

export const radius = { sm: 8, md: 12, lg: 20, full: 9999 } as const;

export const fontSize = { xs: 12, sm: 14, md: 16, lg: 20, xl: 24, xxl: 32, xxxl: 40, display: 48 } as const;

export const font = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

export const shadow: Record<'subtle' | 'medium' | 'strong', ViewStyle> = {
  subtle: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1, elevation: 1 },
  medium: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  strong: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 6 },
};

export const textVariants: Record<string, TextStyle> = {
  display: { fontFamily: font.bold, fontSize: fontSize.xxxl, lineHeight: 48, letterSpacing: -1 },
  h1: { fontFamily: font.bold, fontSize: fontSize.xxl, lineHeight: 40, letterSpacing: -0.5 },
  h2: { fontFamily: font.bold, fontSize: fontSize.xl, lineHeight: 32, letterSpacing: -0.5 },
  title: { fontFamily: font.semibold, fontSize: fontSize.lg, lineHeight: 28, letterSpacing: -0.25 },
  body: { fontFamily: font.regular, fontSize: fontSize.md, lineHeight: 24 },
  bodyStrong: { fontFamily: font.semibold, fontSize: fontSize.md, lineHeight: 24 },
  caption: { fontFamily: font.regular, fontSize: fontSize.sm, lineHeight: 20 },
  small: { fontFamily: font.regular, fontSize: fontSize.xs, lineHeight: 16 },
};
