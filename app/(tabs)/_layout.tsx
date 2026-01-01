import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 20,
          position: "absolute",
          overflow: "hidden",
          height: 55,
          borderWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              marginTop={8}
              color={focused ? "#A78BFA" : "#FFFFFF"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={22}
              marginTop={8}
              color={focused ? "#A78BFA" : "#FFFFFF"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "save" : "save-outline"}
              size={22}
              marginTop={8}
              color={focused ? "#A78BFA" : "#FFFFFF"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={22}
              marginTop={8}
              color={focused ? "#A78BFA" : "#FFFFFF"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
