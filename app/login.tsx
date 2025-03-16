import { useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/context/session";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Login() {
  const { signIn } = useSession();

  const background = useThemeColor({}, "background");

  useEffect(() => {
    signIn();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.content}>
        <ThemedText style={styles.text}>Redirecting to login page...</ThemedText>
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
  text: {
    textAlign: "center"
  }
});
