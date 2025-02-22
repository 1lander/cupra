import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

export default function UserScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <ThemedText type="title">User</ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8
  }
});
