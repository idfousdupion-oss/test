# PRD — Mon Association (Lanceur de campagne HelloAsso)

## Objectif
Application mobile ultra-simple qui ouvre la page de campagne HelloAsso d'une association directement dans l'app (WebView), via un unique bouton.

## Fonctionnalités
- **Écran d'accueil** :
  - Image communautaire (hero) en haut, dans une carte arrondie
  - Titre "Mon Association" (nom générique, personnalisable)
  - Sous-titre "Soutenez notre campagne"
  - Bouton principal chunky pill "Buvette" (couleur corail #DE6B48) en bas
  - Haptique au tap
- **Écran WebView** (`/webview`) :
  - Ouvre `https://www.helloasso.com/` (URL démo — à remplacer par l'URL de la campagne HelloAsso réelle)
  - Bouton flottant "Fermer" en haut à droite (safe-area aware)
  - Loader pendant le chargement
  - État d'erreur avec bouton "Réessayer"
  - Fallback iframe pour la version web

## Design
- Personnalité : Tactile / Playful LIGHT
- Palette : crème `#FDFCF8` + corail `#DE6B48`
- Boutons pill (radius 999), min-height 56pt

## Stack technique
- Expo Router (stack)
- `react-native-webview` (déjà installé)
- `expo-image`, `expo-haptics`, `react-native-safe-area-context`
- Thème centralisé dans `src/theme.ts`

## À personnaliser plus tard
- Remplacer `HELLOASSO_URL` dans `/app/frontend/app/webview.tsx` par l'URL réelle de la campagne
- Remplacer "Mon Association" par le vrai nom / logo dans `/app/frontend/app/index.tsx`
