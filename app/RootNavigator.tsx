import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeDrawerNavigator from "./HomeDrawerNavigator";
import SettingsScreen from "./SettingScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeDrawer"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeDrawer" component={HomeDrawerNavigator} />
      {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  );
}
