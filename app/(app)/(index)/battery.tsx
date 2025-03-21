import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import data from "@/assets/dummyData/home.json";
import Button from "@/components/Button";
import LoadingBar from "@/components/LoadingBar";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function ChargingScreen() {
  const textColor = useThemeColor({}, "text");
  const { battery } = data;
  const [chargingLimit, setChargingLimit] = useState(80);

  const batteryColor = useMemo(() => {
    if (battery.level > 30) {
      return "#33ab37";
    }
    if (battery.level > 10) {
      return "#FFC107";
    }
    return "#f52516";
  }, [battery.level]);

  const handleToggleCharging = () => {
    // TODO: Implement actual charging control
    console.log("Toggle charging");
  };

  const handleChargingLimitChange = (value: number) => {
    setChargingLimit(value);
    // TODO: Implement actual charging limit control
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.mainStats}>
          <Text style={[styles.percentage, { color: textColor }]}>{battery.level}%</Text>
          <Text style={[styles.range, { color: textColor }]}>{battery.range} km remaining</Text>
        </View>

        <LoadingBar animate={battery.isCharging} progress={battery.level} color={batteryColor} height={10} />

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
              value={80}
              minimumValue={50}
              maximumValue={100}
              step={5}
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
