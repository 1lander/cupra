import { Stack } from 'expo-router';
import React from 'react';

export default function IndexLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="charging"
        options={{
          title: "Charging Status",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="user"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
} 