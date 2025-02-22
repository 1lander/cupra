import { StyleSheet, Image, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";

export default function ControlsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={<Image source={require("@/assets/images/cupra_born.png")} style={styles.headerImage} />}
    >
      <View style={styles.titleContainer}>
        <ThemedText type="title">Controls</ThemedText>
      </View>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
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
    left: 0,
    position: "absolute"
  }
});
