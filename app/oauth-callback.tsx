import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { TokenData } from "@/services/session";

export default function OAuthCallback() {
  const queryClient = useQueryClient();
  const background = useThemeColor({}, "background");
  const router = useRouter();

  useEffect(() => {
    // Check for token data every 100ms
    const interval = setInterval(() => {
      const tokenData = queryClient.getQueryData<TokenData>(["token_data"]);
      if (tokenData?.access_token) {
        router.replace("/(app)/(index)");
        clearInterval(interval);
      }
    }, 100);

    // Cleanup interval
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: background }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
