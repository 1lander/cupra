import { Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import DashboardItem from "@/components/ui/DashboardItem";
import data from "@/assets/dummyData/home.json";
import BatteryCard from "@/components/ui/BatteryCard";
import DoorsCard from "@/components/ui/DoorsCard";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<Image source={require("@/assets/images/cupra_born.png")} style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to {data.vehicle.nickname}!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <BatteryCard
          batteryLevel={data.battery.level}
          range={data.battery.range}
          isCharging={data.vehicle.isCharging}
          timeRemaining={data.battery.charging.timeRemaining}
        />
        <DoorsCard doorStatus={data.vehicle.doorStatus} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  step: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "red",
    padding: 16,
    borderRadius: 16
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  stepContainer: {
    gap: 12,
    marginBottom: 16
  },
  headerImage: {
    height: 250,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute"
  }
});
