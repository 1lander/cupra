import React from "react";
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import Error from "./Error";

interface DashboardItemProps {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  onPress?: () => void;
  isLoading?: boolean;
  isError?: boolean;
  noData?: boolean;
}

export default function DashboardItem({ title, children, icon, isLoading, isError, onPress }: DashboardItemProps) {
  const textColor = useThemeColor({}, "text");

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          borderColor: textColor,
          opacity: pressed ? 0.8 : 1
        }
      ]}
      disabled={isLoading || isError}
    >
      <View style={styles.header}>
        {icon}
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      </View>
      {isLoading && <ActivityIndicator size="large" color={textColor} />}
      {isError && <Error />}
      <View style={styles.content}>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: "#2A312B"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8
  },
  content: {
    gap: 12
  }
});
