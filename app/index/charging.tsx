import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function ChargingScreen() {
  const textColor = useThemeColor({}, "text");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="battery-charging" size={48} color={textColor} />
        <Text style={[styles.title, { color: textColor }]}>Charging Status</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text>test</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16
  },
  infoContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
  },
});
