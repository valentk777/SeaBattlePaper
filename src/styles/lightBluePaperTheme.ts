import {baseTheme} from './baseTheme';
import {AppTheme, Palette, Shadow, Shadows} from './themeModels';

const palette: Palette = {
  canvas: '#FFFFFF',
  canvasInverted: '#74858C',
  primary: '#D4E2FF',
  secondary: '#A1C0FF',
  tertiary: '#1B1464',
  exceptional: '#E32F45',
};

const shadows: Shadows = {
  light: {
    shadowColor: palette.canvasInverted,
    ...baseTheme.shadows.light,
  } as Shadow,
  medium: {
    shadowColor: palette.canvasInverted,
    ...baseTheme.shadows.medium,
  } as Shadow,
  dark: {
    shadowColor: palette.canvasInverted,
    ...baseTheme.shadows.dark,
  } as Shadow,
  primary: {
    shadowColor: palette.tertiary,
    ...baseTheme.shadows.primary,
  } as Shadow,
};

export const lightBluePaperTheme: AppTheme = {
  ...baseTheme,
  colors: palette,
  shadows: shadows,
};
