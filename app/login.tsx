import { router } from "expo-router";
import { View, StyleSheet, Pressable } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLogin } from "@/services/session";

export default function Login() {
  const { mutate: login } = useLogin();
  const background = useThemeColor({}, "background");
  const primary = useThemeColor({}, "primary");

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.content}>
        <Pressable
          style={[styles.loginButton, { backgroundColor: primary }]}
          onPress={() => {
            login();
            router.replace("/");
          }}
        >
          <ThemedText>Sign In</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    width: "80%",
    maxWidth: 400
  },
  loginButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center"
  }
});
