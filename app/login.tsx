import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import Button from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { login, getStoredTokenData } from "@/services/session";

export default function Login() {
  const background = useThemeColor({}, "background");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getStoredTokenData();
      setIsLoggedIn(!!token);
    };
    checkToken();
  }, []);

  if (isLoggedIn) {
    return <Redirect href="/(app)/(index)" />;
  }

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.content}>
        <Button title="Login" onPress={login} />
      </View>
      <ThemedText style={styles.text}>This will redirect you to the cupra login page.</ThemedText>
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
    textAlign: "center",
    marginTop: 16
  }
});
