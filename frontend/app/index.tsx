import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import Svg, { Circle, Path } from "react-native-svg";

import { makeStyles, useTheme } from "@/src/theme";

const HERO_IMAGE =
  "https://customer-assets-m6fa6gv7.emergentagent.net/job_donation-app-8/artifacts/3qfahjon_582007449_10231969855494905_4995105215266488191_n.jpg";

const BUVETTE_URL = "https://www.helloasso.com/";
const TABLE_URL =
  "https://docs.google.com/spreadsheets/d/1GPuamsVc4tMFvhqOkkIHPWuaN7PXIXqlsAuRC22d4SI/edit?gid=1768619558#gid=1768619558";

const LETTER_COLORS = ["#0764B2", "#E10275"];

function JesterHat({ size = 30 }: { size?: number }) {
  // Classic three-point jester hat with bells, tilted left.
  // viewBox 100 x 70, fits above a capital letter.
  return (
    <Svg width={size} height={size * 0.7} viewBox="0 0 100 70">
      {/* Left point */}
      <Path
        d="M 10 55 L 20 8 L 40 50 Z"
        fill="#0764B2"
        stroke="#052F5A"
        strokeWidth="1.5"
      />
      {/* Middle point */}
      <Path
        d="M 35 55 L 50 4 L 65 55 Z"
        fill="#E10275"
        stroke="#7A0140"
        strokeWidth="1.5"
      />
      {/* Right point */}
      <Path
        d="M 60 50 L 80 10 L 90 55 Z"
        fill="#0764B2"
        stroke="#052F5A"
        strokeWidth="1.5"
      />
      {/* Base band */}
      <Path
        d="M 5 50 Q 50 68 95 50 L 95 58 Q 50 76 5 58 Z"
        fill="#052F5A"
      />
      {/* Bells */}
      <Circle cx="20" cy="8" r="5" fill="#F4C542" stroke="#8A6A00" strokeWidth="1" />
      <Circle cx="50" cy="4" r="5.5" fill="#F4C542" stroke="#8A6A00" strokeWidth="1" />
      <Circle cx="80" cy="10" r="5" fill="#F4C542" stroke="#8A6A00" strokeWidth="1" />
    </Svg>
  );
}


function ColorfulTitle({ text, style }: { text: string; style: any }) {
  let letterIndex = 0;
  const fontSize = (style && style.fontSize) || 34;
  const hatSize = fontSize * 0.9;
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", flexWrap: "wrap" }}>
      {Array.from(text).map((c, i) => {
        if (c === " ") {
          return (
            <Text key={i} style={style}>
              {"\u00A0"}
            </Text>
          );
        }
        const color = LETTER_COLORS[letterIndex % LETTER_COLORS.length];
        const isFirstLetter = i === 0;
        letterIndex += 1;
        return (
          <View key={i} style={{ position: "relative" }}>
            {isFirstLetter && (
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  top: -hatSize * 0.35,
                  left: -hatSize * 0.05,
                  transform: [{ rotate: "-22deg" }],
                  zIndex: 2,
                }}
              >
                <JesterHat size={hatSize} />
              </View>
            )}
            <Text style={[style, { color }]}>{c}</Text>
          </View>
        );
      })}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  root: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 8,
    alignItems: "center",
  },
  brand: {
    fontSize: 34,
    fontWeight: "900",
    color: "#00335E",
    letterSpacing: -0.8,
    textAlign: "center",
  },
  brandAccent: {
    color: "#E10275",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  heroCard: {
    width: "100%",
    aspectRatio: 1.2,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#D62828",
    shadowColor: "#D62828",
    shadowOpacity: 0.35,
  },
  ctaSecondary: {
    backgroundColor: "#2A9D8F",
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
        <ColorfulTitle text="Fous du Pion" style={styles.brand} />
      </View>

      <View style={styles.content}>
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
