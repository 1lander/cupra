import React, { useEffect, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
  withDelay
} from "react-native-reanimated";
import DashboardItem from "./DashboardItem";

interface BatteryCardProps {
  batteryLevel: number; // percentage (0-100)
  range: number; // miles/kilometers
  isCharging: boolean;
  timeRemaining?: string; // only present if charging
}

export default function BatteryCard({ batteryLevel, range, isCharging, timeRemaining }: BatteryCardProps) {
  const textColor = useThemeColor({}, "text");
  const opacity = useSharedValue(1);

  const batteryColor = useMemo(() => {
    if (batteryLevel > 30) {
      return "green";
    }
    if (batteryLevel > 10) {
      return "yellow";
    }
    return "red";
  }, [batteryLevel]);

  useEffect(() => {
    if (isCharging) {
      opacity.value = withRepeat(
        withSequence(withDelay(500, withTiming(0.6, { duration: 1000 })), withTiming(1, { duration: 1000 })),
        -1,
        true
      );
    } else {
      opacity.value = withTiming(1);
    }
  }, [isCharging]);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));

  return (
    <DashboardItem
      title="Battery Status"
      icon={<MaterialCommunityIcons name={isCharging ? "battery-charging" : "battery"} size={24} color={textColor} />}
    >
      <>
        <View style={styles.percentageContainer}>
          <Text style={[styles.percentage, { color: textColor }]}>{batteryLevel}%</Text>
          <Text style={[styles.range, { color: textColor }]}>{range} km remaining</Text>
        </View>

        <View style={[styles.progressBarContainer, { backgroundColor: `${batteryColor}30` }]}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                backgroundColor: batteryColor,
                width: `${batteryLevel}%`
              },
              animatedProgressStyle
            ]}
          />
        </View>

        {isCharging && (
          <View style={styles.chargingInfo}>
            <MaterialCommunityIcons name="lightning-bolt" size={20} color={textColor} />
            <Text style={[styles.chargingText, { color: textColor }]}>Charging - {timeRemaining} remaining</Text>
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
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    width: "100%"
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4
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
