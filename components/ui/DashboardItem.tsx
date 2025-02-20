import { StyleSheet, View, TextProps, Text } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  backgroundColor?: string;
  lightColor?: string;
  darkColor?: string;
  icon: React.ReactNode;
  title: string;
  value: string;
};

export default function DashboardItem({
  lightColor = "white",
  darkColor = "white",
  backgroundColor,
  icon,
  title,
  value
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <View style={[styles.step, { backgroundColor }]}>
      <View style={styles.iconContainer}>
        {icon}
        <Text style={[styles.text, { color }]}>{title}</Text>
      </View>
      <Text style={[styles.text, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  step: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    padding: 16,
    borderRadius: 16
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  text: {
    fontSize: 18
  }
});
