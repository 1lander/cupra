import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";

import { SessionProvider } from "@/context/session";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function Root() {
  const queryClient = new QueryClient();
  const colorScheme = useColorScheme();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Slot />
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
