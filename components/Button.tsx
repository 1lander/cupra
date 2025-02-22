import React from "react";
import { StyleSheet, Pressable, ActivityIndicator, Text, View } from "react-native";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  isLoading?: boolean;
  color?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export default function Button({ title, onPress, isLoading, color = "#2A312B", disabled = false, icon }: ButtonProps) {
  const getBackgroundColor = () => {
    if (disabled) return "#4A4A4A";
    return color;
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          opacity: pressed ? 0.8 : 1
        }
      ]}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <View style={styles.buttonContent}>
          {icon}
          <Text style={styles.text}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  }
});
