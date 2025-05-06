import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function registerForPushNotificationsAsync() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Permission not granted!");
    return;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
}

// Schedule notification after 5 seconds
export async function scheduleLocalNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "📢 Reminder",
      body: "Local notification Expo.",
      data: { customData: "Some value" },
    },
    trigger: null,
  });
}
