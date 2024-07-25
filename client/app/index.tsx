import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { Link, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { UserContext } from "../context/user-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserData } from "../types";

export default function Home() {
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);
  axios.defaults.baseURL = "http://192.168.1.7:9000";
  useEffect(() => {
    const getUser = async () => {
      const token = await AsyncStorage.getItem("token");
      axios
        .post("/users/me", { token })
        .then((res) => {
          console.log(res.data);
          setUser(res.data.user as UserData);
          //@ts-ignore
          navigation.navigate("(main)", { screen: "chat" });
        })
        .catch((err) => {
          console.log(err.response.data);
          //@ts-ignore
          navigation.navigate("(auth)", { screen: "login" });
        });
    };
    getUser();
  }, []);
  return (
    <View className="flex-1 bg-green-800 justify-center items-center gap-3">
      <StatusBar translucent={false} />
      <Text className="text-4xl text-white">Welcome Screen</Text>
      <TouchableOpacity className="p-5 bg-green-600 rounded-full">
        <Link href={"/(auth)/signup"} className="text-white">
          Get Started
        </Link>
      </TouchableOpacity>
    </View>
  );
}
