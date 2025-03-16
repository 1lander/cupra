import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/context/session";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function OAuthCallback() {
  const background = useThemeColor({}, "background");
  const router = useRouter();
  const { session } = useSession();

  useEffect(() => {
    const interval = setInterval(async () => {
      if (session) {
        router.replace("/(app)/connect");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [router, session]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: background }}>
      <ActivityIndicator size="large" />
      <ThemedText>Logging in...</ThemedText>
    </View>
  );
}
