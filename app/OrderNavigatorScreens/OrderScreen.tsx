import React, { useState } from "react";
import { View, Text, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function OrderScreen() {
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const requestLibraryPermissions = async () => {
    const mediaLib = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (mediaLib.status !== "granted") {
      Alert.alert("Permissions required", "Please enable gallery permissions.");
      return false;
    }
    return true;
  };

  const requestCameraPermissions = async () => {
    const camera = await ImagePicker.requestCameraPermissionsAsync();

    if (camera.status !== "granted") {
      Alert.alert("Permissions required", "Please enable camera permissions.");
      return false;
    }
    return true;
  };

  const pickMedia = async () => {
    const hasPermission = await requestLibraryPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedMedia(result.assets[0]);
    }
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedMedia(result.assets[0]);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Order Screen</Text>

      <Button title="Pick from Gallery" onPress={pickMedia} />
      <Button title="Take Photo / Video" onPress={takePhoto} />

      {selectedMedia && (
        <View style={{ marginTop: 20 }}>
          {selectedMedia.type === "image" ? (
            <Image
              source={{ uri: selectedMedia.uri }}
              style={{ width: 200, height: 200 }}
            />
          ) : (
            <Text>Video selected: {selectedMedia.uri}</Text>
          )}
        </View>
      )}
    </View>
  );
}
