import { Image, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import data from "@/assets/dummyData/home.json";
import BatteryCard from "@/components/cards/BatteryCard";
import DoorsCard from "@/components/cards/DoorsCard";
import WindowsCard from "@/components/cards/WindowsCard";
import VehicleCard from "@/components/cards/VehicleCard";
import Error from "@/components/ui/Error";
import { useRouter } from "expo-router";
import UserCard from "@/components/cards/UserCard";
import { useUserInfo } from "@/services/userService";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<Image source={require("@/assets/images/cupra_born.png")} style={styles.headerImage} />}
    >
      <View style={styles.titleContainer}>
        <ThemedText type="title">Welcome {data.vehicle.nickname}!</ThemedText>
        <HelloWave />
      </View>
      <View style={styles.stepContainer}>
        <VehicleCard
          model={data.vehicle.name}
          year={data.vehicle.year}
          odometer={data.vehicle.odometer}
          vin={data.vehicle.vin}
          location={data.location}
        />
        <BatteryCard
          batteryLevel={data.battery.level}
          range={data.battery.range}
          isCharging={data.battery.isCharging}
          timeRemaining={data.battery.charging.timeRemaining}
          onNavigate={() => {
            router.push("/charging");
          }}
        />
          <UserCard
            onNavigate={() => {
              router.push("/user");
            }}
          />
        
        {/* <DoorsCard doorStatus={data.vehicle.doorStatus} />
        <WindowsCard windowStatus={data.vehicle.windowStatus} /> */}
      </View>
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
    gap: 20,
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
