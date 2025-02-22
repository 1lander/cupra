import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { withRepeat, withSequence, withTiming, useSharedValue, withDelay } from "react-native-reanimated";

import data from "@/assets/dummyData/home.json";
import { useThemeColor } from "@/hooks/useThemeColor";

import LoadingBar from "../LoadingBar";
import DashboardItem from "../ui/DashboardItem";

interface BatteryCardProps {
  onNavigate?: () => void;
}

export default function BatteryCard({ onNavigate }: BatteryCardProps) {
  const textColor = useThemeColor({}, "text");
  const opacity = useSharedValue(1);
  const { battery } = data;

  const batteryColor = useMemo(() => {
    if (battery.level > 30) {
      return "#33ab37";
    }
    if (battery.level > 10) {
      return "#FFC107";
    }
    return "#f52516";
  }, [battery.level]);

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

  return (
    <DashboardItem
      title="Battery Status"
      icon={
        <MaterialCommunityIcons
          name={battery.isCharging ? "battery-charging" : "battery"}
          size={24}
          color={textColor}
        />
      }
      onPress={onNavigate}
    >
      <>
        <View style={styles.percentageContainer}>
          <Text style={[styles.percentage, { color: textColor }]}>{battery.level}%</Text>
          <Text style={[styles.range, { color: textColor }]}>{battery.range} km remaining</Text>
        </View>

        <LoadingBar animate={battery.isCharging} progress={battery.level} color={batteryColor} height={10} />

        {battery.isCharging && (
          <View style={styles.chargingInfo}>
            <MaterialCommunityIcons name="lightning-bolt" size={20} color={textColor} />
            <Text style={[styles.chargingText, { color: textColor }]}>
              Charging - {battery.charging.timeRemaining} remaining
            </Text>
          </View>
        )}
      </>
    </DashboardItem>
  );
}

const styles = StyleSheet.create({
  percentageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline"
  },
  percentage: {
    fontSize: 32,
    fontWeight: "bold"
  },
  range: {
    fontSize: 16,
    opacity: 0.8
  },
  chargingInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4
  },
  chargingText: {
    marginLeft: 6,
    fontSize: 14
  }
});
