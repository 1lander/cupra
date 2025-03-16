import { useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet } from "react-native";

import Button from "@/components/Button";
import Input from "@/components/Input";
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
        <Input label="Enter your car's VIN" value={vin} onChangeText={setVin} />
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
  }
});
