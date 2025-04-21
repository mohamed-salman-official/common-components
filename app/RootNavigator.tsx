import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeDrawerNavigator from "./HomeDrawerNavigator";
import SettingsScreen from "./SettingScreen";
import { Button } from "react-native";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeDrawer"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeDrawer" component={HomeDrawerNavigator} />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => (
            <Button onPress={() => navigation.goBack()} title="← Back" />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
