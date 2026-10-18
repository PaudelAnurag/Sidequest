import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { AppleMaps, GoogleMaps } from "expo-maps";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../../components/AppText";
import { Button } from "../../components/Button";
import { Chips } from "../../components/Chips";
import { Credits } from "../../components/Credits";
import { colors, radius, shadow, spacing } from "../../constants/theme";
import { PLACES } from "../../mock";
import { getQuest, gbp } from "../../quests";

const ZOOM = 15;
const at = (p: (typeof PLACES)[number]) => ({
  latitude: p.lat,
  longitude: p.lng,
});

export default function Map() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [sel, setSel] = useState(PLACES.find((p) => p.id === id) ?? PLACES[0]);
  const [located, setLocated] = useState(false);
  // Android rejects setCameraPosition until the map has loaded (lateinit cameraState); iOS has no load event.
  const [ready, setReady] = useState(Platform.OS !== "android");
  const mapRef = useRef<{
    setCameraPosition: (c: {
      coordinates: ReturnType<typeof at>;
      zoom: number;
    }) => void;
  }>(null);

  // Links from other screens change `id` while this tab stays mounted; adjust state during render.
  const [seen, setSeen] = useState(id);
  if (id !== seen) {
    setSeen(id);
    setSel(PLACES.find((p) => p.id === id) ?? sel);
  }

  useEffect(() => {
    if (ready)
      mapRef.current?.setCameraPosition({ coordinates: at(sel), zoom: ZOOM });
  }, [sel, ready]);

  // Permission is requested during onboarding; only show the blue dot if it was granted.
  useEffect(() => {
    Location.getForegroundPermissionsAsync().then((r) => setLocated(r.granted));
  }, []);

  const props = {
    style: StyleSheet.absoluteFill,
    cameraPosition: { coordinates: at(sel), zoom: ZOOM },
    markers: PLACES.map((p) => ({
      id: p.id,
      coordinates: at(p),
      title: p.name,
    })),
    properties: { isMyLocationEnabled: located },
    onMarkerClick: (m: { id?: string }) =>
      setSel((s) => PLACES.find((p) => p.id === m.id) ?? s),
  };
  const q = sel.questId ? getQuest(sel.questId) : undefined;

  return (
    <View style={styles.flex}>
      {Platform.OS === "ios" ? (
        <AppleMaps.View {...props} ref={mapRef as never} />
      ) : Platform.OS === "android" ? (
        <GoogleMaps.View
          {...props}
          ref={mapRef as never}
          onMapLoaded={() => setReady(true)}
        />
      ) : (
        <AppText
          color={colors.textSecondary}
          align="center"
          style={styles.fallback}
        >
          Map is only available on iOS and Android.
        </AppText>
      )}

      {/* Chips also select places on iOS < 18, where marker taps are not reported. */}
      <SafeAreaView edges={["top"]} style={styles.top} pointerEvents="box-none">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          <Chips
            options={PLACES.map((p) => p.name)}
            value={sel.name}
            onChange={(n) => setSel(PLACES.find((p) => p.name === n) ?? sel)}
          />
        </ScrollView>
      </SafeAreaView>

      <View style={styles.sheet}>
        <View style={styles.row}>
          <View style={styles.tile}>
            <Ionicons name={sel.icon} size={20} color={colors.primary} />
          </View>
          <View style={styles.flex}>
            <AppText variant="bodyStrong">{sel.name}</AppText>
            <AppText variant="small" color={colors.textSecondary}>
              {sel.kind} · {sel.distance}
            </AppText>
          </View>
          {q ? (
            <Credits text={`Earn ${gbp(q.credits)}`} color={colors.primary} />
          ) : null}
        </View>
        <Button
          title="View Details"
          onPress={() => router.push(`/place/${sel.id}`)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  fallback: { marginTop: spacing.huge },
  top: { position: "absolute", top: 0, left: 0, right: 0 },
  chips: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  sheet: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    ...shadow.strong,
  },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  tile: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
});
