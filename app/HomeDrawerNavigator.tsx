import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeNavigatorScreens/HomeScreen";
import { NavigationProp } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export default function HomeDrawerNavigator({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: true }}
      />
    </Drawer.Navigator>
  );
}
