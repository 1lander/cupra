import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DashboardItem from "../ui/DashboardItem";
import { useThemeColor } from "@/hooks/useThemeColor";
import { format } from "date-fns";
import { useUserInfo } from "@/services/userService";
interface UserCardProps {
  onNavigate?: () => void;
}

export default function UserCard({ onNavigate }: UserCardProps) {
  const { data: userInfo, isLoading, isError } = useUserInfo();
  const textColor = useThemeColor({}, "text");

  return (
    <DashboardItem
      title="User Info"
      isLoading={isLoading}
      isError={isError}
      icon={<MaterialCommunityIcons name="account" size={24} color={textColor} />}
      onPress={onNavigate}
    >
      {userInfo && (
        <>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: textColor }]}>Name:</Text>
            <Text style={[styles.value, { color: textColor }]}>{userInfo.name}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: textColor }]}>Email:</Text>
            <Text style={[styles.value, { color: textColor }]}>{userInfo.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: textColor }]}>Birthdate:</Text>
            <Text style={[styles.value, { color: textColor }]}>{format(userInfo.birthdate, "dd/MM/yyyy")}</Text>
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
  },
  link: {
    textDecorationLine: "underline"
  }
});
