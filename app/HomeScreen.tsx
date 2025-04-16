import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { View, Text, Button } from "react-native";

export default function HomeScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>This is the Home Screen</Text>
      <Button
        onPress={() => navigation.navigate("Settings")}
        title="Goto Settings"
      />
    </View>
  );
}
