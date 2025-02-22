import React from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useUserInfo } from "@/services/userService";
import Error from "@/components/ui/Error";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import UserCard from "@/components/cards/UserCard";

export default function UserScreen() {
  const { data: userInfo, isLoading, isError } = useUserInfo();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={<Image source={require("@/assets/images/cupra_born.png")} style={styles.headerImage} />}
    >
      <View style={styles.titleContainer}>
        <ThemedText type="title">User</ThemedText>
      </View>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {isError && <Error />}
      {userInfo && (
        <UserCard
          name={userInfo.name}
          email={userInfo.email}
          birthdate={userInfo.birthdate}
          avatarUrl={userInfo.picture}
        />
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8
  },
  headerImage: {
    height: 250,
    width: "100%",
    bottom: 0,
    left: 0
  }
});
