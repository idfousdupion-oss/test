import { useRouter } from "expo-router";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import Svg, { Circle, Path, Rect } from "react-native-svg";

import { makeStyles, useTheme } from "@/src/theme";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80";

const BUVETTE_URL = "https://www.helloasso.com/";
const TABLE_URL =
  "https://docs.google.com/spreadsheets/d/1GPuamsVc4tMFvhqOkkIHPWuaN7PXIXqlsAuRC22d4SI/edit?gid=1768619558#gid=1768619558";
const ADHESION_URL = "https://www.helloasso.com/"; // TODO: remplacer par l'URL exacte de la page d'adhésion HelloAsso

const LETTER_COLORS = ["#0764B2", "#E10275"];

function JesterHat({ size = 30 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 0.7} viewBox="0 0 100 70">
      <Path d="M 10 55 L 20 8 L 40 50 Z" fill="#0764B2" stroke="#052F5A" strokeWidth="1.5" />
      <Path d="M 35 55 L 50 4 L 65 55 Z" fill="#E10275" stroke="#7A0140" strokeWidth="1.5" />
      <Path d="M 60 50 L 80 10 L 90 55 Z" fill="#0764B2" stroke="#052F5A" strokeWidth="1.5" />
      <Path d="M 5 50 Q 50 68 95 50 L 95 58 Q 50 76 5 58 Z" fill="#052F5A" />
      <Circle cx="20" cy="8" r="5" fill="#F4C542" stroke="#8A6A00" strokeWidth="1" />
      <Circle cx="50" cy="4" r="5.5" fill="#F4C542" stroke="#8A6A00" strokeWidth="1" />
      <Circle cx="80" cy="10" r="5" fill="#F4C542" stroke="#8A6A00" strokeWidth="1" />
    </Svg>
  );
}

function CoinIcon({ size = 22, color = "#FFFFFF" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2" />
      <Circle cx="12" cy="12" r="6.5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.7" />
      <Path
        d="M 15 8.5 C 14 7.5 12.5 7.3 11.2 7.6 C 9.5 8 8.8 9.2 9.2 10.4 C 9.5 11.4 10.5 11.8 12 12 C 13.5 12.2 14.5 12.6 14.8 13.6 C 15.2 14.8 14.5 16 12.8 16.4 C 11.5 16.7 10 16.5 9 15.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <Path d="M 12 6 L 12 7.5 M 12 16.5 L 12 18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

function CalendarIcon({ size = 22, color = "#FFFFFF" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x="3" y="5" width="18" height="16" rx="2.5" fill="none" stroke={color} strokeWidth="2" />
      <Path d="M 3 10 L 21 10" stroke={color} strokeWidth="2" />
      <Path d="M 8 3 L 8 7" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M 16 3 L 16 7" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Circle cx="8" cy="15" r="1.2" fill={color} />
      <Circle cx="12" cy="15" r="1.2" fill={color} />
      <Circle cx="16" cy="15" r="1.2" fill={color} />
    </Svg>
  );
}

function CardIcon({ size = 22, color = "#FFFFFF" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x="2.5" y="5" width="19" height="14" rx="2.5" fill="none" stroke={color} strokeWidth="2" />
      <Circle cx="8.5" cy="12" r="2.3" fill="none" stroke={color} strokeWidth="1.8" />
      <Path
        d="M 5 17 C 5.5 15.5 6.8 14.5 8.5 14.5 C 10.2 14.5 11.5 15.5 12 17"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <Path d="M 14 10 L 19 10 M 14 13 L 19 13 M 14 16 L 17.5 16" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
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
    backgroundColor: "#0A0A0A",
  },
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(6, 10, 22, 0.42)",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
    alignItems: "center",
  },
  brand: {
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: -0.8,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.55)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  tagline: {
    marginTop: 12,
    color: "rgba(255,255,255,0.85)",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.5,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  center: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    gap: 14,
  },
  cta: {
    height: 64,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  ctaPrimary: {
    backgroundColor: "#D62828",
    shadowColor: "#D62828",
    shadowOpacity: 0.5,
  },
  ctaSecondary: {
    backgroundColor: "#2A9D8F",
    shadowColor: "#2A9D8F",
    shadowOpacity: 0.45,
  },
  ctaTertiary: {
    backgroundColor: "#264653",
    shadowColor: "#264653",
    shadowOpacity: 0.45,
  },
  ctaPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  ctaText: {
    color: "#FFFFFF",
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
    <View style={styles.root} testID="home-screen">
      <StatusBar style="light" />
      <ImageBackground
        source={{ uri: BG_IMAGE }}
        style={styles.bg}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={[styles.header, { paddingTop: insets.top + 24 }]}>
            <ColorfulTitle text="Fous du Pion" style={styles.brand} />
            <Text style={styles.tagline}>Association de jeux de société</Text>
          </View>

          <View style={styles.center}>
            <Pressable
              testID="buvette-button"
              onPress={() => openLink(BUVETTE_URL)}
              style={({ pressed }) => [
                styles.cta,
                styles.ctaPrimary,
                pressed && styles.ctaPressed,
              ]}
              android_ripple={{ color: "rgba(255,255,255,0.15)" }}
            >
              <CoinIcon />
              <Text style={styles.ctaText}>Buvette</Text>
            </Pressable>

            <Pressable
              testID="table-button"
              onPress={() => openLink(TABLE_URL)}
              style={({ pressed }) => [
                styles.cta,
                styles.ctaSecondary,
                pressed && styles.ctaPressed,
              ]}
              android_ripple={{ color: "rgba(255,255,255,0.15)" }}
            >
              <CalendarIcon />
              <Text style={styles.ctaText}>Table</Text>
            </Pressable>

            <Pressable
              testID="adherer-button"
              onPress={() => openLink(ADHESION_URL)}
              style={({ pressed }) => [
                styles.cta,
                styles.ctaTertiary,
                pressed && styles.ctaPressed,
              ]}
              android_ripple={{ color: "rgba(255,255,255,0.15)" }}
            >
              <CardIcon />
              <Text style={styles.ctaText}>Adhérer</Text>
            </Pressable>
          </View>

          <View style={{ height: Math.max(insets.bottom, 16) + 8 }} />
        </View>
      </ImageBackground>
    </View>
  );
}
