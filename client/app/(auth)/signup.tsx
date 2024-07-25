import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigation } from "expo-router";
import axios from "axios";
import Toast from "react-native-toast-message";

export default function Signup() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    name: yup.string(),
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
      .post("/users/signup", values)
      .then((res) => {
        //@ts-ignore
        navigation.navigate("login");
        Toast.show({
          type: "success",
          text2: res.data.msg,
        });
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          type: "error",
          text2: err.response.data.message,
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
        initialValues={{ email: "", name: "", password: "" }}
        onSubmit={submitHandler}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
            <View className="flex justify-center space-y-3">
              <View className="space-y-2 w-60">
                <Text className="font-medium text-base text-gray-500">
                  Name
                </Text>
                <TextInput
                  className="border rounded border-gray-400 px-2 h-12 text-lg"
                  value={values.name}
                  placeholder="John"
                  onChangeText={handleChange("name")}
                  aria-disabled={loading}
                />
                {errors.name && (
                  <Text className="text-rose-500 mt-2">{errors.name}</Text>
                )}
              </View>

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
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        )}
      </Formik>
      <Text className="pt-5">
        Already have an account?
        <Link href={"login"} className="text-blue-500">
          Login{" "}
        </Link>
      </Text>
    </View>
  );
}
