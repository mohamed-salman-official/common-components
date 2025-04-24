import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "./SettingNavigatorScreens/SettingScreen";
import OrderScreen from "./OrderNavigatorScreens/OrderScreen";
import HomeDrawerNavigator from "./HomeDrawerNavigator";
import CategoryScreen from "./CategoryNavigatorScreens/CategoryScreen";

import { Ionicons } from "@expo/vector-icons";

const tabBar = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <tabBar.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#fff",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "home";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Order") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Category") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Setting") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007aff",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <tabBar.Screen name="Home" component={HomeDrawerNavigator} />
      <tabBar.Screen
        name="Order"
        component={OrderScreen}
        options={{ headerShown: true }}
      />
      <tabBar.Screen
        name="Category"
        component={CategoryScreen}
        options={{ headerShown: true }}
      />
      <tabBar.Screen
        name="Setting"
        component={SettingsScreen}
        options={{ headerShown: true }}
      />
    </tabBar.Navigator>
  );
}
