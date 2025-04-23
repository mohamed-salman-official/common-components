import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderScreen from "./OrderNavigatorScreens/OrderScreen";

const Stack = createNativeStackNavigator();

export default function OrderStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Order" component={OrderScreen} />
    </Stack.Navigator>
  );
}
