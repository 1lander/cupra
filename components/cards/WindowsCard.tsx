import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

import DashboardItem from "../ui/DashboardItem";

interface WindowStatus {
  frontLeft: boolean;
  frontRight: boolean;
  rearLeft: boolean;
  rearRight: boolean;
}

interface WindowsCardProps {
  windowStatus: WindowStatus;
}

export default function WindowsCard({ windowStatus }: WindowsCardProps) {
  const textColor = useThemeColor({}, "text");

  const WindowIndicator = ({ isOpen, label }: { isOpen: boolean; label: string }) => (
    <View style={styles.windowIndicator}>
      <MaterialCommunityIcons
        name={isOpen ? "window-open" : "window-closed"}
        size={24}
        color={isOpen ? "#ff4444" : "#44ff44"}
      />
      <Text style={[styles.windowLabel, { color: textColor }]}>
        {label} {isOpen ? "Open" : "Closed"}
      </Text>
    </View>
  );

  return (
    <DashboardItem title="Windows" icon={<MaterialCommunityIcons name="car-door" size={24} color={textColor} />}>
      <View style={styles.windowGrid}>
        <WindowIndicator isOpen={windowStatus.frontLeft} label="Front Left" />
        <WindowIndicator isOpen={windowStatus.frontRight} label="Front Right" />
        <WindowIndicator isOpen={windowStatus.rearLeft} label="Rear Left" />
        <WindowIndicator isOpen={windowStatus.rearRight} label="Rear Right" />
      </View>
    </DashboardItem>
  );
}

const styles = StyleSheet.create({
  windowGrid: {
    gap: 8
  },
  windowIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  windowLabel: {
    fontSize: 14,
    fontWeight: "500"
  }
});
