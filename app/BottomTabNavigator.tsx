import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "./SettingNavigatorScreens/SettingScreen";
import OrderScreen from "./OrderNavigatorScreens/OrderScreen";
import HomeDrawerNavigator from "./HomeDrawerNavigator";
import CategoryScreen from "./CategoryNavigatorScreens/CategoryScreen";

const tabBar = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <tabBar.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#fff",
        },
      }}
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
        name="Profile"
        component={SettingsScreen}
        options={{ headerShown: true }}
      />
    </tabBar.Navigator>
  );
}
