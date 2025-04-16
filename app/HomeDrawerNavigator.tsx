import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingScreen";

const Drawer = createDrawerNavigator();

export default function HomeDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          headerLeft: () => null,
          swipeEnabled: false,
        }}
      />
    </Drawer.Navigator>
  );
}
