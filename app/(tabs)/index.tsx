import { Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import DashboardItem from "@/components/ui/DashboardItem";
import data from "@/assets/dummyData/home.json";

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
        <DashboardItem
          backgroundColor="#2e6921"
          icon={<FontAwesome name="battery-full" size={24} color="white" />}
          title="Battery Level"
          value={`${data.battery.level}%`}
        />

        <DashboardItem
          backgroundColor="#1e4f8a"
          icon={<MaterialCommunityIcons name="ev-station" size={24} color="white" />}
          title="Charging Status"
          value={data.vehicle.isCharging ? `${data.battery.charging.rateKwH} kW` : "Not Connected"}
        />

        <DashboardItem
          backgroundColor="#8a1e4f"
          icon={<MaterialCommunityIcons name="thermometer" size={24} color="white" />}
          title="Climate"
          value={`${data.climate.interiorTemp}°F Inside`}
        />
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
