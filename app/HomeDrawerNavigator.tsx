import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingScreen";
import { TouchableOpacity, Text } from "react-native";
import { NavigationProp } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export default function HomeDrawerNavigator({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: true }}
      />
    </Drawer.Navigator>
  );
}
