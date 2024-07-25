import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigation } from "expo-router";
import axios from "axios";
import Toast from "react-native-toast-message";
import { UserContext } from "../../context/user-context";
import { UserData } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be contain 8 character"),
  });

  type FormValues = yup.InferType<typeof schema>;

  const submitHandler = (values: FormValues) => {
    setLoading(true);
    axios
      .post("/users/login", values)
      .then(async (res) => {
        setUser(res.data.user as UserData);
        await AsyncStorage.setItem("token", res.data.token);
        Toast.show({
          type: "success",
          text2: res.data.msg,
        });
        //@ts-ignore
        navigation.navigate("(main)", { screen: "home" });
      })
      .catch((err) => {
        console.error(err.response.data);
        Toast.show({
          type: "error",
          text1: err.response.data.error,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View className="flex h-full w-full items-center justify-center">
      <Text className=" text-5xl justify-self-end self-center pb-6">
        Welcome to TalkZone!
      </Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={submitHandler}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
            <View className="flex justify-center space-y-3">
              <View className="space-y-2 w-60">
                <Text className="font-medium text-base text-gray-500">
                  Email address:
                </Text>
                <TextInput
                  className="border rounded border-gray-400 px-2 h-12 text-lg"
                  value={values.email}
                  placeholder="yourname@gmail.com"
                  onChangeText={handleChange("email")}
                />
                {errors.email && (
                  <Text className="text-rose-500 mt-2">{errors.email}</Text>
                )}
              </View>

              <View className="space-y-2 w-60">
                <Text className="font-medium text-base text-gray-500">
                  Password:
                </Text>
                <TextInput
                  className="border rounded border-gray-400 px-2 h-12 text-lg"
                  value={values.password}
                  placeholder="********"
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                />
                {errors.password && (
                  <Text className="text-rose-500 mt-2">{errors.password}</Text>
                )}
              </View>

              <TouchableOpacity
                onPress={() => handleSubmit()}
                disabled={loading}
              >
                <Text className="bg-green-500 px-2 py-3 text-center font-bold text-base text-white rounded-md">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        )}
      </Formik>
      <Text className="pt-5">
        New Here?{" "}
        <Link href={"signup"} className="text-blue-500">
          Create An Account
        </Link>
      </Text>
    </View>
  );
}
