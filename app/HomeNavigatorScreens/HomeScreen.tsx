import { showAlert } from "@/Components/AlertManager";
import { showToast } from "@/Components/CustomToast";
import { paymentIntent } from "@/Helper/APIServices";
import {
  STRIPE_API_URL,
  STRIPE_OFFICIAL_MAIL,
  STRIPE_SECRET,
} from "@/Utils/Constant";
import { NavigationProp } from "@react-navigation/native";
import {
  CardField,
  CardFieldInput,
  useStripe,
} from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";

export default function HomeScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  // const showCustomAlert = () => {
  //   showAlert({
  //     message: "Are you sure you want to continue?",

  //     onConfirm: () => {
  //       console.log("Confirmed!");
  //     },
  //     onClose: () => {
  //       console.log("Cancelled or closed.");
  //     },
  //   });
  // };
  //
  // return (
  //   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //     <Text>This is the Home Screen</Text>
  //     <Button
  //       onPress={() => navigation.navigate("Setting")}
  //       // onPress={showCustomAlert}
  //       // onPress={() => showToast("Hello, this is a toast message!")}
  //       title="Goto Settings"
  //     />
  //   </View>
  // );
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isPaymentSheetReady, setIsPaymentSheetReady] = useState(false);
  const userData = {
    amount: 5000,
    currency: "usd",
  };

  const fetchPaymentIntent = async () => {
    try {
      const data = await paymentIntent(userData);
      if (data?.clientSecret) {
        setClientSecret(data.clientSecret);
        console.log("Payment Intent fetched:", data);
        return data.clientSecret;
      } else {
        throw new Error("Client secret missing from response");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // const fetchPaymentIntent = async () => {
  //   try {
  //     const res = await fetch("http://localhost:4242/create-payment-intent", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization:
  //           "Bearer sk_test_51RLiDtP1TbJNLwdaKVgacMzAkzsrkI8ZuMeSMkaekIjS9VBGVoBerYHwWhNdT1ZMLtEmW1woZvbj8CoSZZqyEx5X00jA03MRlq",
  //       },
  //       body: JSON.stringify({ amount: 5000, currency: "usd" }),
  //     });

  //     const { clientSecret } = await res.json();
  //     if (!clientSecret) throw new Error("Client secret missing from response");

  //     setClientSecret(clientSecret);
  //     return clientSecret;
  //   } catch (err) {
  //     console.error("Error fetching payment intent:", err);
  //     Alert.alert("Error", "Could not fetch payment details.");
  //     return null;
  //   }
  // };

  const initializePaymentSheet = async () => {
    const secret = await fetchPaymentIntent(); // wait for client secret before proceeding
    if (!secret) return;

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Your Company",
      paymentIntentClientSecret: secret,
    });

    if (error) {
      console.error("initPaymentSheet error:", error);
      Alert.alert("Init Failed", error.message);
    } else {
      setIsPaymentSheetReady(true);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const openPaymentSheet = async () => {
    if (!isPaymentSheetReady) {
      Alert.alert("Not ready", "Payment sheet is not ready yet.");
      return;
    }

    const { error } = await presentPaymentSheet();

    if (error) {
      console.error("presentPaymentSheet error:", error);
      Alert.alert("Payment Failed", error.message);
    } else {
      Alert.alert("Success", "Your payment was successful!");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button
        title="Checkout"
        onPress={openPaymentSheet}
        disabled={!isPaymentSheetReady}
      />
    </View>
  );
}
