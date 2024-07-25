import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { Stack, useNavigation } from "expo-router";
import axios from "axios";
import Toast from "react-native-toast-message";
import UserContextProvider from "../context/user-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserData } from "../types";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

const GradientHeader = () => (
  <LinearGradient
    colors={["#ff9966", "#ff5e62"]}
    style={{ flex: 1 }}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
  >
    <Text
      style={{
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 10,
      }}
    >
      Message
    </Text>
  </LinearGradient>
);

export default function _layout() {
  return (
    <UserContextProvider>
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)"
          options={{
            navigationBarColor: "white",
            title: "Welcome",
            headerShadowVisible: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(main)"
          options={{
            headerShown: false,
            headerShadowVisible: false,
          }}
        />
      </Stack>
      <Toast />
    </UserContextProvider>
  );
}
