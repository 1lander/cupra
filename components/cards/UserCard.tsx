import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { useUser } from "@/services/user";

import DashboardItem from "../ui/DashboardItem";
interface UserCardProps {
  onNavigate?: () => void;
}

export default function UserCard({ onNavigate }: UserCardProps) {
  const { data: user, isLoading, isError } = useUser();
  const textColor = useThemeColor({}, "text");

  return (
    <DashboardItem
      title="User Info"
      isLoading={isLoading}
      isError={isError}
      icon={<MaterialCommunityIcons name="account" size={24} color={textColor} />}
      onPress={onNavigate}
    >
      {user && (
        <>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: textColor }]}>Name:</Text>
            <Text style={[styles.value, { color: textColor }]}>{user.name}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: textColor }]}>Email:</Text>
            <Text style={[styles.value, { color: textColor }]}>{user.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: textColor }]}>Birthdate:</Text>
            <Text style={[styles.value, { color: textColor }]}>{format(user.birthdate, "dd/MM/yyyy")}</Text>
          </View>
        </>
      )}
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
  }
});
