import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
  withDelay
} from "react-native-reanimated";

import data from "@/assets/dummyData/home.json";
import Button from "@/components/Button";
import { useThemeColor } from "@/hooks/useThemeColor";
export default function ChargingScreen() {
  const textColor = useThemeColor({}, "text");
  const opacity = useSharedValue(1);
  const { battery } = data;
  const [chargingLimit, setChargingLimit] = useState(100);

  const batteryColor = battery.level > 30 ? "green" : battery.level > 10 ? "yellow" : "red";

  useEffect(() => {
    if (battery.isCharging) {
      opacity.value = withRepeat(
        withSequence(withDelay(500, withTiming(0.6, { duration: 1000 })), withTiming(1, { duration: 1000 })),
        -1,
        true
      );
    } else {
      opacity.value = withTiming(1);
    }
  }, [battery.isCharging, opacity]);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));

  const handleToggleCharging = () => {
    // TODO: Implement actual charging control
    console.log("Toggle charging");
  };

  const handleChargingLimitChange = (value: number) => {
    setChargingLimit(Math.round(value));
    // TODO: Implement actual charging limit control
    console.log("Charging limit set to:", Math.round(value));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.mainStats}>
          <Text style={[styles.percentage, { color: textColor }]}>{battery.level}%</Text>
          <Text style={[styles.range, { color: textColor }]}>{battery.range} km remaining</Text>
        </View>

        <View style={[styles.progressBarContainer, { backgroundColor: `${batteryColor}30` }]}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                backgroundColor: batteryColor,
                width: `${battery.level}%`
              },
              animatedProgressStyle
            ]}
          />
        </View>

        <View style={styles.chargingControlContainer}>
          <Button
            onPress={handleToggleCharging}
            title={battery.isCharging ? "Stop Charging" : "Start Charging"}
            color={battery.isCharging ? "#ff4444" : "#44aa44"}
            icon={
              <MaterialCommunityIcons
                name={battery.isCharging ? "power-plug-off" : "power-plug"}
                size={24}
                color="white"
              />
            }
          />
        </View>

        {battery.isCharging && (
          <View style={styles.chargingContainer}>
            <View style={styles.chargingHeader}>
              <MaterialCommunityIcons name="lightning-bolt" size={24} color={textColor} />
              <Text style={[styles.chargingTitle, { color: textColor }]}>Currently Charging</Text>
            </View>
            <View style={styles.chargingDetails}>
              <Text style={[styles.chargingText, { color: textColor }]}>
                Time Remaining: {battery.charging.timeRemaining}
              </Text>
              <Text style={[styles.chargingText, { color: textColor }]}>Charging Rate: 7.4 kW</Text>
              <Text style={[styles.chargingText, { color: textColor }]}>Added Range: 25 km/hour</Text>
            </View>
          </View>
        )}

        <View style={styles.chargingLimitContainer}>
          <View style={styles.chargingLimitHeader}>
            <MaterialCommunityIcons name="battery-charging-100" size={24} color={textColor} />
            <Text style={[styles.chargingLimitTitle, { color: textColor }]}>Charging Limit</Text>
          </View>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={50}
              maximumValue={100}
              step={1}
              value={chargingLimit}
              onValueChange={handleChargingLimitChange}
              minimumTrackTintColor={batteryColor}
              maximumTrackTintColor={`${batteryColor}30`}
              thumbTintColor={batteryColor}
            />
            <Text style={[styles.chargingLimitValue, { color: textColor }]}>{chargingLimit}%</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="speedometer" size={24} color={textColor} />
            <Text style={[styles.statLabel, { color: textColor }]}>Average Consumption</Text>
            <Text style={[styles.statValue, { color: textColor }]}>18.5 kWh/100km</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="thermometer" size={24} color={textColor} />
            <Text style={[styles.statLabel, { color: textColor }]}>Battery Temperature</Text>
            <Text style={[styles.statValue, { color: textColor }]}>25°C</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  infoContainer: {
    flex: 1,
    gap: 24
  },
  mainStats: {
    alignItems: "center",
    marginBottom: 16
  },
  percentage: {
    fontSize: 64,
    fontWeight: "bold"
  },
  range: {
    fontSize: 20,
    opacity: 0.8,
    marginTop: 8
  },
  progressBarContainer: {
    height: 12,
    borderRadius: 6,
    overflow: "hidden",
    width: "100%"
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 6
  },
  chargingContainer: {
    backgroundColor: "#2A312B",
    padding: 16,
    borderRadius: 12
  },
  chargingHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  chargingTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 8
  },
  chargingDetails: {
    gap: 8
  },
  chargingText: {
    fontSize: 16
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16
  },
  statItem: {
    flex: 1,
    backgroundColor: "#2A312B",
    padding: 16,
    borderRadius: 12,
    alignItems: "center"
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.8,
    marginTop: 8,
    textAlign: "center"
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4
  },
  chargingControlContainer: {
    alignItems: "center",
    marginVertical: 16
  },
  chargingLimitContainer: {
    backgroundColor: "#2A312B",
    padding: 16,
    borderRadius: 12
  },
  chargingLimitHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  chargingLimitTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 8
  },
  sliderContainer: {
    alignItems: "center"
  },
  slider: {
    width: "100%",
    height: 40
  },
  chargingLimitValue: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8
  }
});
