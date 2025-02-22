import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useEffect } from "react";

import { useAuthStatus } from "@/services/session";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const { isAuthenticated } = useAuthStatus();

  const [loaded] = useFonts({
    SpaceMono: require("./../../assets/fonts/SpaceMono-Regular.ttf")
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  //TODO: Remove this once we have a proper auth flow
  if (isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
