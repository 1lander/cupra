import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useEffect } from "react";

import "react-native-reanimated";
import { getStoredTokenData } from "@/services/session";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getStoredTokenData();
      setIsLoggedIn(!!token);
    };
    checkToken();
  }, []);

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

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(index)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
