import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,

        tabBarBackground: () => (
          <LinearGradient
            colors={["#4568DC", "#B06AB3"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
        headerBackground: () => (
          <LinearGradient
            colors={["#4568DC", "#B06AB3"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
        headerTintColor: "white", // This will make the title text white
        headerStyle: {
          backgroundColor: "transparent",
        },
        tabBarStyle: {
          height: 60,
          flexDirection: "column",
          gap: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name="home" size={focused ? 28 : 24} color={"white"} />
          ),
          tabBarLabelStyle: {
            color: "white",
            fontSize: 12,
          },
          title: "Message",

          headerRight: () => (
            <View className="pr-4">
              <Feather name="search" size={22} color="white" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ color, focused, size }) => (
            <Feather
              name="message-square"
              size={focused ? 24 : 20}
              color={"white"}
            />
          ),
          tabBarLabelStyle: {
            color: "white",
            fontSize: 12,
          },
          headerRight: () => {
            return (
              <View className="flex-row space-x-4 pr-4">
                <FontAwesome5 name="video" size={16} color="white" />
                <Ionicons name="call" size={16} color="white" />
                <Entypo name="dots-three-vertical" size={16} color="white" />
              </View>
            );
          },
          headerLeft: () => (
            <View className="pl-4">
              <Ionicons name="chevron-back" size={24} color="white" />
            </View>
          ),
          headerTitle: () => (
            <View className="flex-row -ml-4 items-center">
              <Image
                source={{
                  uri: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
                }}
                className="w-7 h-7 rounded-full"
              />
              <View className="ml-3">
                <Text className="text-base text-white">Hello</Text>
                <Text className="text-white  text-xs">last seen 10 min</Text>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          tabBarIcon: ({ color, focused, size }) => (
            <Feather name="settings" size={focused ? 24 : 18} color={"white"} />
          ),
          tabBarLabelStyle: {
            color: "white",
            fontSize: 12,
          },
        }}
      />
    </Tabs>
  );
}
