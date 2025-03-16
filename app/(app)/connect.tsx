import { useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";

import Button from "@/components/Button";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Connect() {
  const background = useThemeColor({}, "background");
  const router = useRouter();
  const [vin, setVin] = useState<string | undefined>();

  const connectVehicle = () => {
    console.log("Connecting vehicle...");
    if (vin) {
      router.replace("/(app)/(index)");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.content}>
        <TextInput placeholder="Enter VIN" value={vin} onChangeText={setVin} style={styles.input} />
        <Button title="Connect Vehicle" onPress={() => connectVehicle()} />
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
    maxWidth: 400,
    gap: 16
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10
  }
});
