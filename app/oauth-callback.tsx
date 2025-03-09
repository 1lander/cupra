import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { getStoredTokenData } from "@/services/session";

export default function OAuthCallback() {
  const background = useThemeColor({}, "background");
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(async () => {
      const tokenData = await getStoredTokenData();
      if (tokenData?.access_token) {
        router.replace("/(app)/(index)");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: background }}>
      <ActivityIndicator size="large" />
      <ThemedText>Logging in...</ThemedText>
    </View>
  );
}
