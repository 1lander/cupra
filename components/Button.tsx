import React from "react";
import { StyleSheet, Pressable, ActivityIndicator, Text } from "react-native";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export default function Button({ title, onPress, isLoading, variant = "primary", disabled = false }: ButtonProps) {
  const getBackgroundColor = () => {
    if (disabled) return "#4A4A4A";
    return variant === "primary" ? "#2A312B" : "transparent";
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
      {isLoading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.text}>{title}</Text>}
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
  }
});
