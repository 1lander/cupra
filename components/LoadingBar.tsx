import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PROGRESS_WIDTH = 100; // Width of the moving progress bar

interface LoadingBarProps {
  animate?: boolean;
  color?: string;
  height?: number;
  backgroundColor?: string;
  progress?: number; // Expected as percentage (0-100)
}

export const LoadingBar: React.FC<LoadingBarProps> = ({
  animate = true,
  color = "#4CAF50",
  height = 8,
  backgroundColor = "#E0E0E0",
  progress = 100
}) => {
  const translateX = useSharedValue(-PROGRESS_WIDTH);
  const containerWidth = (SCREEN_WIDTH * progress) / 100;

  React.useEffect(() => {
    if (animate) {
      translateX.value = withRepeat(
        withSequence(
          withTiming(-PROGRESS_WIDTH, { duration: 0 }),
          withDelay(
            100,
            withTiming(containerWidth, {
              duration: 1000,
              easing: Easing.bezier(0.4, 0.0, 0.2, 1)
            })
          )
        ),
        -1 // Infinite repetition
      );
    } else {
      translateX.value = withTiming(-PROGRESS_WIDTH);
    }
  }, [animate, containerWidth]);

  const progressStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }));

  const progressContainerStyle = useAnimatedStyle(() => ({
    width: `${progress}%`,
    backgroundColor: animate ? `${color}90` : color
  }));

  return (
    <View style={[styles.container, { height, backgroundColor }]}>
      <Animated.View style={[styles.progressContainer, progressContainerStyle]}>
        <Animated.View style={[styles.progress, { width: PROGRESS_WIDTH, backgroundColor: color }, progressStyle]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 4
  },
  progressContainer: {
    height: "100%",
    overflow: "hidden"
  },
  progress: {
    height: "100%",
    borderRadius: 4
  }
});

export default LoadingBar;
