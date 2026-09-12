import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";

import { makeStyles, useTheme } from "@/src/theme";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmd8ZW58MHx8fHwxNzg5MjE4Njc3fDA&ixlib=rb-4.1.0&q=85";

const useStyles = makeStyles((colors) => ({
  root: {
    flex: 1,
    backgroundColor: colors.surface,
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
  title: {
    marginTop: 32,
    fontSize: 28,
    fontWeight: "800",
    color: colors.onSurface,
    letterSpacing: -0.5,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: colors.muted,
    textAlign: "center",
  },
  ctaWrapper: {
    paddingHorizontal: 24,
  },
  cta: {
    height: 64,
    borderRadius: 999,
    backgroundColor: colors.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.brandPrimary,
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  ctaPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  ctaText: {
    color: colors.onBrandPrimary,
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

  const handlePress = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {}
    router.push("/webview");
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]} testID="home-screen">
      <StatusBar style="dark" />
      <View style={styles.content}>
        <View style={styles.heroCard}>
          <Image
            source={{ uri: HERO_IMAGE }}
            style={styles.heroImage}
            contentFit="cover"
            transition={300}
          />
        </View>
        <Text style={styles.title} testID="association-name">
          Mon Association
        </Text>
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
          onPress={handlePress}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          android_ripple={{ color: colors.brandSecondary }}
        >
          <Text style={styles.ctaText}>Buvette</Text>
        </Pressable>
      </View>
    </View>
  );
}
