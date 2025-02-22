import { View, StyleSheet, Pressable, Text } from "react-native";

import { useLogin } from "@/services/session";

export default function Login() {
  const { mutate: login } = useLogin();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Pressable style={styles.loginButton} onPress={() => login()}>
          <Text>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    width: "80%",
    maxWidth: 400
  },
  loginButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center"
  }
});
