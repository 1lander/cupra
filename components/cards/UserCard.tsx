import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DashboardItem from "../ui/DashboardItem";
import { useThemeColor } from "@/hooks/useThemeColor";
import { format } from "date-fns";

interface UserCardProps {
  name: string;
  email: string;
  birthdate: string;
  avatarUrl?: string;
}

export default function UserCard({ name, email, birthdate, avatarUrl }: UserCardProps) {
  const textColor = useThemeColor({}, "text");

  return (
    <DashboardItem title="User Info" icon={<MaterialCommunityIcons name="account" size={24} color={textColor} />}>
      <View style={styles.infoRow}>
        <Text style={[styles.label, { color: textColor }]}>Name:</Text>
        <Text style={[styles.value, { color: textColor }]}>{name}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={[styles.label, { color: textColor }]}>Email:</Text>
        <Text style={[styles.value, { color: textColor }]}>{email}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={[styles.label, { color: textColor }]}>Birthdate:</Text>
        <Text style={[styles.value, { color: textColor }]}>{format(birthdate, "dd/MM/yyyy")}</Text>
      </View>
    </DashboardItem>
  );
}

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4
  },
  label: {
    fontSize: 16,
    fontWeight: "500"
  },
  value: {
    fontSize: 16
  },
  link: {
    textDecorationLine: "underline"
  }
});
