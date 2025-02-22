import { Stack } from "expo-router";
import React from "react";

export default function IndexLayout() {
  const headerOptions = {
    headerShown: true,
    headerStyle: {
      backgroundColor: "#2A312B"
    },
    headerTintColor: "#fff"
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="battery"
        options={{
          title: "Battery Status",
          ...headerOptions
        }}
      />
      <Stack.Screen
        name="user"
        options={{
          title: "User",
          ...headerOptions
        }}
      />
    </Stack>
  );
}
