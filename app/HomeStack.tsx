import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeDrawerNavigator from "./HomeDrawerNavigator";
import SettingsScreen from "./SettingNavigatorScreens/SettingScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeDrawer" component={HomeDrawerNavigator} />
      <Stack.Screen name="Setting" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
