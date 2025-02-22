import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useUserInfo } from '@/services/userService';
import Error from '@/components/ui/Error';

export default function UserScreen() {
  const { data: userInfo, isLoading, isError } = useUserInfo();

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {isError && <Error />}
      {userInfo && <ThemedText>{userInfo.name}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
