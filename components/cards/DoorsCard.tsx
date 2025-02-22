import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

import DashboardItem from "../ui/DashboardItem";

interface DoorStatus {
  frontLeft: boolean;
  frontRight: boolean;
  rearLeft: boolean;
  rearRight: boolean;
  trunk: boolean;
  hood: boolean;
}

interface DoorsCardProps {
  doorStatus: DoorStatus;
}

export default function DoorsCard({ doorStatus }: DoorsCardProps) {
  const textColor = useThemeColor({}, "text");

  const DoorIndicator = ({ isOpen, label }: { isOpen: boolean; label: string }) => (
    <View style={styles.doorIndicator}>
      <MaterialCommunityIcons
        name={isOpen ? "car-door" : "car-door-lock"}
        size={24}
        color={isOpen ? "#ff4444" : "#44ff44"}
      />
      <Text style={[styles.doorLabel, { color: textColor }]}>
        {label} {isOpen ? "Open" : "Closed"}
      </Text>
    </View>
  );

  return (
    <DashboardItem title="Doors" icon={<MaterialCommunityIcons name="car-door" size={24} color={textColor} />}>
      <View style={styles.doorsGrid}>
        <DoorIndicator isOpen={doorStatus.frontLeft} label="Front Left" />
        <DoorIndicator isOpen={doorStatus.frontRight} label="Front Right" />
        <DoorIndicator isOpen={doorStatus.rearLeft} label="Rear Left" />
        <DoorIndicator isOpen={doorStatus.rearRight} label="Rear Right" />
        <DoorIndicator isOpen={doorStatus.trunk} label="Trunk" />
        <DoorIndicator isOpen={doorStatus.hood} label="Hood" />
      </View>
    </DashboardItem>
  );
}

const styles = StyleSheet.create({
  doorsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16
  },
  doorIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minWidth: "45%"
  },
  doorLabel: {
    fontSize: 14,
    fontWeight: "500"
  }
});
