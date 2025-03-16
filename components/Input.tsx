import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, TextInputProps } from "react-native";

import { useThemeColor } from "../hooks/useThemeColor";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  lightColor?: string;
  darkColor?: string;
}

export default function Input({
  label,
  error,
  style,
  lightColor,
  darkColor,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const backgroundColor = useThemeColor({ light: "#F5F5F5", dark: "#2A2A2A" }, "background");
  const borderColor = error ? "#FF3B30" : isFocused ? "#2A312B" : "#E0E0E0";

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: textColor }]}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          {
            color: textColor,
            backgroundColor,
            borderColor
          },
          style
        ]}
        placeholder={placeholder}
        placeholderTextColor="#9E9E9E"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8
  },
  input: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 48
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 4
  }
});
