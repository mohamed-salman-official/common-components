import {
  registerForPushNotificationsAsync,
  scheduleLocalNotification,
} from "@/Helper/NotificationHelper";
import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import * as Notifications from "expo-notifications";

// 🔔 Set notification handler BEFORE component mounts
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function CategoryScreen() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Trigger Notification"
        onPress={scheduleLocalNotification}
      />
    </View>
  );
}
