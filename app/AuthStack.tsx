import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginSignUpScreens/LoginScreen";
import HomeStack from "./HomeStack";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainHome" component={HomeStack} />
    </Stack.Navigator>
  );
}
