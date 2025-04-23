import { NavigationProp } from "@react-navigation/native";
import { View, Text, Button } from "react-native";

export default function LoginScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("MainHome")}
      />
    </View>
  );
}
