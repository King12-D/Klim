import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

export default function Default() {
  const scale = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1.15,
        friction: 3,
        tension: 150,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        router.replace("/(tabs)/home");
      }, 1000);
    });
  }, [scale]);

  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      className="bg-primary"
    >
      <Animated.Image
        source={require("../assets/images/icon.png")}
        style={{
          width: 200,
          height: 200,
          marginBottom: 8,
          borderRadius: 20,
          transform: [{ scale }],
        }}
      />
    </View>
  );
}
