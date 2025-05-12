import React from "react";
import RootNavigator from "./RootNavigator";
import { StripeProvider } from "@stripe/stripe-react-native";
import { STRIPE_PUBLISHABLE_KEY } from "@/Utils/Constant";

export default function RootLayout() {
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <RootNavigator />
    </StripeProvider>
  );
}
