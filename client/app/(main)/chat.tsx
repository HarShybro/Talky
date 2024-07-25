import { View, Text, ScrollView, TextInput } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function chat() {
  return (
    <>
      <ScrollView className="bg-white">
        <View className="p-5">
          <View className="flex-row items-center gap-2 mb-3">
            <View className="bg-blue-100  max-w-[70%] border-gray-300 border rounded">
              <Text className="p-2">Hello</Text>
            </View>
            <Text className="text-gray-400 text-xs">Today at 3:14am</Text>
          </View>

          <View className="flex-row items-center justify-end gap-2">
            <View className="bg-purple-100 w-32  rounded">
              <Text className="p-2">Hello, how are you?</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-2 mb-3">
            <View className=" bg-blue-100  shadow rounded">
              <Text className="p-2">Hello, how are you ?</Text>
            </View>
            <Text className="text-gray-400 text-xs">Today at 3:14am</Text>
          </View>

          <View className="flex-row items-center justify-end gap-2">
            <View className="bg-purple-100  shadow rounded">
              <Text className="p-2">Hello, how are you?</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 z-10 w-full flex-row bg-slate-200 rounded-t-2xl p-3 space-x-3">
        <View className="bg-white border rounded-full border-gray-400 flex-row items-center p-2 space-x-2">
          <Feather name="smile" size={21} color="black" />
          <TextInput
            placeholder="Message"
            className="w-48 justify-self-center"
          />
        </View>
        <View className="flex-row space-x-2 items-center">
          <Entypo name="camera" size={20} color="black" />
          <Ionicons name="add-circle" size={20} color="black" />
          <MaterialIcons name="photo-library" size={20} color="black" />
        </View>
      </View>
    </>
  );
}
