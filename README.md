# SideQuest — first 4 screens (Expo + TypeScript + expo-router)

Flow: `/` onboarding → `/auth` → `/permissions` → `/verify-email`

## Setup
```bash
npx create-expo-app@latest sidequest        # default template (TypeScript + expo-router)
cd sidequest
rm -rf app components                        # drop template screens
# copy theme.ts, app/, components/ from this folder into the project root
npx expo install @expo-google-fonts/inter expo-font expo-splash-screen expo-status-bar \
  expo-location expo-camera expo-notifications expo-sensors \
  @expo/vector-icons react-native-safe-area-context
npx expo start
```

## app.json plugins (permission strings)
```json
{
  "expo": {
    "plugins": [
      "expo-router",
      ["expo-location", { "locationWhenInUsePermission": "SideQuest uses your location to find quests near you." }],
      ["expo-camera", { "cameraPermission": "SideQuest uses the camera to scan quest QR codes." }],
      "expo-notifications"
    ],
    "ios": { "infoPlist": { "NSMotionUsageDescription": "SideQuest uses activity data to improve your journey." } }
  }
}
```
Note: push notifications on Android need a dev build, not Expo Go.

## TODO
- Google / Apple OAuth in `app/auth.tsx`
- Resend + verification-link handling in `app/verify-email.tsx`
