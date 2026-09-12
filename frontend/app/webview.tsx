import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { makeStyles, useTheme } from "@/src/theme";

const DEFAULT_URL = "https://www.helloasso.com/";

const useStyles = makeStyles((colors) => ({
  root: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  webview: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  loader: {
    ...Platform.select({
      web: { position: "fixed" as any },
      default: { position: "absolute" as const },
    }),
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
  },
  closeButton: {
    position: "absolute",
    right: 16,
    height: 44,
    minWidth: 88,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: colors.surfaceInverse,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  closeButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  closeText: {
    color: colors.onSurfaceInverse,
    fontSize: 15,
    fontWeight: "700",
  },
  errorBox: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
  },
  errorText: {
    color: colors.onSurface,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 24,
    height: 48,
    borderRadius: 999,
    backgroundColor: colors.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  retryText: {
    color: colors.onBrandPrimary,
    fontWeight: "700",
    fontSize: 16,
  },
}));

export default function WebviewScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const styles = useStyles();
  const { colors } = useTheme();
  const params = useLocalSearchParams<{ url?: string }>();
  const targetUrl = params.url && params.url.length > 0 ? params.url : DEFAULT_URL;
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const handleClose = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleRetry = () => {
    setHasError(false);
    setLoading(true);
    setReloadKey((k) => k + 1);
  };

  return (
    <View style={styles.root} testID="webview-screen">
      <StatusBar style="dark" />
      {hasError ? (
        <View style={[styles.errorBox, { paddingTop: insets.top + 24 }]}>
          <Text style={styles.errorText}>
            Impossible de charger la page
          </Text>
          <Pressable
            testID="retry-button"
            onPress={handleRetry}
            style={styles.retryButton}
          >
            <Text style={styles.retryText}>Réessayer</Text>
          </Pressable>
        </View>
      ) : Platform.OS === "web" ? (
        // WebView is not supported on web; use an iframe fallback.
        <View style={{ flex: 1 }}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(() => {
            const Iframe: any = "iframe";
            return (
              <Iframe
                key={reloadKey}
                src={targetUrl}
                style={{ flex: 1, border: "none", width: "100%", height: "100%" }}
                onLoad={() => setLoading(false)}
              />
            );
          })()}
          {loading && (
            <View style={styles.loader} pointerEvents="none">
              <ActivityIndicator size="large" color={colors.brandPrimary} />
            </View>
          )}
        </View>
      ) : (
        <>
          <WebView
            key={reloadKey}
            source={{ uri: targetUrl }}
            style={styles.webview}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setHasError(true);
            }}
            onHttpError={() => {
              setLoading(false);
            }}
            startInLoadingState
            allowsBackForwardNavigationGestures
          />
          {loading && (
            <View style={styles.loader} pointerEvents="none">
              <ActivityIndicator size="large" color={colors.brandPrimary} />
            </View>
          )}
        </>
      )}

      <Pressable
        testID="webview-close-button"
        onPress={handleClose}
        style={({ pressed }) => [
          styles.closeButton,
          { top: insets.top + 12 },
          pressed && styles.closeButtonPressed,
        ]}
      >
        <Text style={styles.closeText}>Fermer</Text>
      </Pressable>
    </View>
  );
}
