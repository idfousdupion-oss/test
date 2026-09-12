import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";

import { makeStyles, useTheme } from "@/src/theme";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmd8ZW58MHx8fHwxNzg5MjE4Njc3fDA&ixlib=rb-4.1.0&q=85";

const BUVETTE_URL = "https://www.helloasso.com/";
const TABLE_URL =
  "https://docs.google.com/spreadsheets/d/1GPuamsVc4tMFvhqOkkIHPWuaN7PXIXqlsAuRC22d4SI/edit?gid=1768619558#gid=1768619558";

const useStyles = makeStyles((colors) => ({
  root: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: "center",
  },
  brand: {
    fontSize: 34,
    fontWeight: "900",
    color: colors.onSurface,
    letterSpacing: -0.8,
    textAlign: "center",
  },
  brandAccent: {
    color: colors.brandPrimary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  heroCard: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.surfaceTertiary,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  subtitle: {
    marginTop: 20,
    fontSize: 16,
    color: colors.muted,
    textAlign: "center",
  },
  ctaWrapper: {
    paddingHorizontal: 24,
    gap: 12,
  },
  cta: {
    height: 64,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  ctaPrimary: {
    backgroundColor: colors.brandPrimary,
    shadowColor: colors.brandPrimary,
    shadowOpacity: 0.35,
  },
  ctaSecondary: {
    backgroundColor: colors.surfaceInverse,
  },
  ctaPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  ctaTextPrimary: {
    color: colors.onBrandPrimary,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  ctaTextSecondary: {
    color: colors.onSurfaceInverse,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
}));

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const styles = useStyles();
  const { colors } = useTheme();

  const openLink = async (url: string) => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {}
    router.push({ pathname: "/webview", params: { url } });
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]} testID="home-screen">
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.brand} testID="association-name">
          Fous du <Text style={styles.brandAccent}>Pion</Text>
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.heroCard}>
          <Image
            source={{ uri: HERO_IMAGE }}
            style={styles.heroImage}
            contentFit="cover"
            transition={300}
          />
        </View>
        <Text style={styles.subtitle}>Soutenez notre campagne</Text>
      </View>

      <View
        style={[
          styles.ctaWrapper,
          { paddingBottom: Math.max(insets.bottom, 16) + 8 },
        ]}
      >
        <Pressable
          testID="buvette-button"
          onPress={() => openLink(BUVETTE_URL)}
          style={({ pressed }) => [
            styles.cta,
            styles.ctaPrimary,
            pressed && styles.ctaPressed,
          ]}
          android_ripple={{ color: colors.brandSecondary }}
        >
          <Text style={styles.ctaTextPrimary}>Buvette</Text>
        </Pressable>

        <Pressable
          testID="table-button"
          onPress={() => openLink(TABLE_URL)}
          style={({ pressed }) => [
            styles.cta,
            styles.ctaSecondary,
            pressed && styles.ctaPressed,
          ]}
          android_ripple={{ color: colors.surfaceTertiary }}
        >
          <Text style={styles.ctaTextSecondary}>Table</Text>
        </Pressable>
      </View>
    </View>
  );
}
