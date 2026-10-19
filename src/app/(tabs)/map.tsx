import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { AppleMaps, GoogleMaps } from "expo-maps";
import { useLocalSearchParams, useRouter } from "expo-router";
import "../../polyfills"; // must run before h3-js loads
import { gridDisk, latLngToCell } from "h3-js";
import { useEffect, useRef, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../../components/AppText";
import { Button } from "../../components/Button";
import { Chips } from "../../components/Chips";
import { Credits } from "../../components/Credits";
import { colors, radius, shadow, spacing } from "../../constants/theme";
import { PLACES, Place } from "../../mock";
import { getQuest, gbp } from "../../quests";

const ZOOM = 15;
// H3 res 8 ≈ 0.8 km between cell centers; 3 rings ≈ 2.4 km around the user.
// shortcut: fixed radius, upgrade to a user setting / res 9 for dense cities.
const RES = 8;
const RINGS = 3;
// Reserves bottom space so the Google logo stays visible above the sheet.
// shortcut: fixed height, measure with onLayout if the sheet grows.
const SHEET_H = 150;
const at = (p: Place) => ({ latitude: p.lat, longitude: p.lng });

export default function Map() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  // No default selection: user picks a pin/chip (or arrives via a place link).
  const [sel, setSel] = useState<Place | undefined>(
    PLACES.find((p) => p.id === id),
  );
  const [me, setMe] = useState<{ latitude: number; longitude: number }>();
  const mapRef = useRef<{
    setCameraPosition: (c: {
      coordinates: { latitude: number; longitude: number };
      zoom: number;
      duration: number;
    }) => void;
  }>(null);
  // duration 0 = instant move. Animated moves get cancelled by the next move and the native
  // promise rejects uncaught (expo-maps' wrapper drops it, so it can't be caught from JS).
  const fly = (c: { latitude: number; longitude: number }) =>
    mapRef.current?.setCameraPosition({ coordinates: c, zoom: ZOOM, duration: 0 });

  // Links from other screens change `id` while this tab stays mounted; adjust state during render.
  const [seen, setSeen] = useState(id);
  if (id !== seen) {
    setSeen(id);
    setSel(PLACES.find((p) => p.id === id) ?? sel);
  }

  // Permission is requested during onboarding; only locate if it was granted.
  useEffect(() => {
    Location.getForegroundPermissionsAsync()
      .then((r) =>
        r.granted ? Location.getCurrentPositionAsync({}) : undefined,
      )
      .then((pos) => pos && setMe(pos.coords))
      .catch(() => {});
  }, []);

  // H3 nearby: a place is shown if its cell is within RINGS of the user's cell.
  const cells = me
    ? new Set(gridDisk(latLngToCell(me.latitude, me.longitude, RES), RINGS))
    : undefined;
  const shown = PLACES.filter(
    (p) => p.id === sel?.id || cells?.has(latLngToCell(p.lat, p.lng, RES)),
  );

  const center = sel ? at(sel) : (me ?? at(PLACES[0]));

  const props = {
    style: StyleSheet.absoluteFill,
    cameraPosition: { coordinates: center, zoom: ZOOM },
    markers: shown.map((p) => ({
      id: p.id,
      coordinates: at(p),
      title: p.name,
    })),
    properties: { isMyLocationEnabled: !!me },
    // Built-in buttons ignore safe areas and collide with the status bar; we draw our own.
    uiSettings: {
      myLocationButtonEnabled: false,
      compassEnabled: false,
    },
    onMarkerClick: (m: { id?: string }) =>
      setSel((s) => PLACES.find((p) => p.id === m.id) ?? s),
  };
  const q = sel?.questId ? getQuest(sel.questId) : undefined;

  return (
    <View style={styles.flex}>
      {Platform.OS === "ios" ? (
        <AppleMaps.View {...props} ref={mapRef as never} />
      ) : Platform.OS === "android" ? (
        <GoogleMaps.View
          {...props}
          ref={mapRef as never}
          contentPadding={{ bottom: SHEET_H }}
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
            options={shown.map((p) => p.name)}
            value={sel?.name ?? ""}
            onChange={(n) => setSel(PLACES.find((p) => p.name === n) ?? sel)}
          />
        </ScrollView>
      </SafeAreaView>

      {me ? (
        <Pressable
          onPress={() => {
            setSel(undefined);
            fly(me);
          }}
          accessibilityRole="button"
          accessibilityLabel="Center on my location"
          style={styles.locate}
        >
          <Ionicons name="locate" size={22} color={colors.primary} />
        </Pressable>
      ) : null}

      <View style={styles.sheet}>
        {sel ? (
          <>
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
          </>
        ) : (
          <AppText color={colors.textSecondary} align="center">
            {!me
              ? "Finding quests near you…"
              : shown.length
                ? "Tap a pin to see a quest"
                : "No quests nearby"}
          </AppText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  fallback: { marginTop: spacing.huge },
  top: { position: "absolute", top: 0, left: 0, right: 0 },
  chips: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  locate: {
    position: "absolute",
    right: spacing.lg,
    bottom: SHEET_H + spacing.lg,
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.medium,
  },
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