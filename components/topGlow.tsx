import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

export default function TopGlow() {
  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 220,
        zIndex: 0,
      }}
    >
      <LinearGradient
        colors={[
          "rgba(140, 82, 255, 0.45)", // glow color
          "rgba(140, 82, 255, 0.15)",
          "transparent",
        ]}
        locations={[0, 0.4, 1]}
        style={{
          flex: 1,
        }}
      />
    </View>
  );
}
