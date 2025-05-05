import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";

import { Alert, Linking } from "react-native";

import * as Network from "expo-network";

export const isNetworkAvailable = async (): Promise<boolean> => {
  const state = await Network.getNetworkStateAsync();
  return !!state.isConnected && !!state.isInternetReachable;
};

export const handleNoNetwork = () => {
  Alert.alert("No Internet", "Please check your network connection.");
};

export const getCurrentLocation =
  async (): Promise<Location.LocationObject | null> => {
    const { status: existingStatus } =
      await Location.getForegroundPermissionsAsync();

    if (existingStatus === "granted") {
      return await Location.getCurrentPositionAsync({});
    }

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      return await Location.getCurrentPositionAsync({});
    }

    // If denied, show user-friendly alert with option to open settings
    Alert.alert(
      "Permission Required",
      "This feature requires location access. Please enable it from settings.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Open Settings",
          onPress: () => Linking.openSettings(),
        },
      ]
    );

    return null;
  };

export const requestMediaLibraryPermission = async () => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  return status === "granted";
};
