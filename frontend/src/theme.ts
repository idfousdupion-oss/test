// Design tokens for this app. Light theme only.
import { useMemo } from "react";
import { Appearance, StyleSheet, useColorScheme } from "react-native";

export type ColorScheme = "light" | "dark";

const light = {
  surface: "#FDFCF8",
  onSurface: "#1F1D1B",
  surfaceSecondary: "#FFFFFF",
  onSurfaceSecondary: "#1F1D1B",
  surfaceTertiary: "#F2EFEB",
  onSurfaceTertiary: "#4A4744",
  surfaceInverse: "#2C2A28",
  onSurfaceInverse: "#FDFCF8",
  muted: "#8A847E",

  brand: "#DE6B48",
  onBrand: "#FFFFFF",
  brandPrimary: "#DE6B48",
  onBrandPrimary: "#FFFFFF",
  brandSecondary: "#E8B298",
  onBrandSecondary: "#2C2A28",
  brandTertiary: "#F4D9CE",
  onBrandTertiary: "#DE6B48",

  success: "#5C8D6D",
  onSuccess: "#FFFFFF",
  warning: "#E5A93B",
  onWarning: "#1F1D1B",
  error: "#C65B53",
  onError: "#FFFFFF",
  info: "#7A7067",
  onInfo: "#FFFFFF",

  border: "#EAE5DF",
  borderStrong: "#D1C9C0",
  divider: "#EAE5DF",
};

export type ThemeColors = typeof light;

export const defaultScheme = "light" satisfies ColorScheme;

export const themes: { light: ThemeColors; dark?: ThemeColors } = { light };

export function setColorScheme(scheme: ColorScheme | null) {
  Appearance.setColorScheme?.(scheme);
}

setColorScheme?.(themes.dark ? null : defaultScheme);

export function useTheme(): { scheme: ColorScheme; colors: ThemeColors } {
  const system = useColorScheme();
  const scheme: ColorScheme = system && themes[system] ? system : defaultScheme;
  return { scheme, colors: themes[scheme] ?? themes.light };
}

export function makeStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  factory: (colors: ThemeColors) => T & StyleSheet.NamedStyles<any>,
): () => T {
  return function useStyles(): T {
    const { colors } = useTheme();
    return useMemo(() => StyleSheet.create(factory(colors)), [colors]);
  };
}
