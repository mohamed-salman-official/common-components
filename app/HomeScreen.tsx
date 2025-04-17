import { showAlert } from "@/Components/AlertManager";
import { showToast } from "@/Components/CustomToast";
import { NavigationProp } from "@react-navigation/native";
import { View, Text, Button } from "react-native";

export default function HomeScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const showCustomAlert = () => {
    showAlert({
      message: "Are you sure you want to continue?",

      onConfirm: () => {
        console.log("Confirmed!");
      },
      onClose: () => {
        console.log("Cancelled or closed.");
      },
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>This is the Home Screen</Text>
      <Button
        // onPress={() => navigation.navigate("Settings")}
        // onPress={showCustomAlert}
        onPress={() => showToast("Hello, this is a toast message!")}
        title="Goto Settings"
      />
    </View>
  );
}
