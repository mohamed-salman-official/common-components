import React, { useState } from "react";
import { View, Text, Button, Image } from "react-native";
import VideoPlayer from "@/Components/VideoPlayerManager";
import { MediaPickerManager } from "@/Components/MediaPickerManager";
import AudioPlayer from "@/Components/AudioPlayerManager";
import VideoScreen from "@/Components/ExpoVedioPlayerManager";

export default function OrderScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);

  const handlePickImage = async () => {
    const image = await MediaPickerManager.pickImageFromLibrary();
    if (image) {
      console.log("Image URI:", image.uri);
      setImageUri(image.uri);
    }
  };

  const handleCaptureImage = async () => {
    const camera = await MediaPickerManager.pickImageFromCamera();
    if (camera) {
      console.log("Captured Image URI:", camera.uri);
      setImageUri(camera.uri);
    }
  };

  const handlePickVideo = async () => {
    const result = await MediaPickerManager.pickVideo();
    if (result) {
      console.log("Picked video URI:", result.uri);
      setVideoUri(result.uri);
    }
  };

  const handlePickAudio = async () => {
    const result = await MediaPickerManager.pickAudio();
    if (result) {
      console.log("Picked audio URI:", result.uri);
      setAudioUri(result.uri);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Images</Text>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          resizeMode="stretch"
          style={{ height: 250, width: "100%" }}
        />
      )}
      <Button title="Pick from Gallery" onPress={handlePickImage} />
      <Button title="Take Photo / Video" onPress={handleCaptureImage} />

      <Text style={{ fontSize: 20, marginTop: 20 }}>Media Player</Text>
      {videoUri && <VideoPlayer uri={videoUri} />}
      <Button title="Pick Video File" onPress={handlePickVideo} />

      <Text style={{ fontSize: 20, marginTop: 20 }}>Audio Player</Text>
      {audioUri && <AudioPlayer uri={audioUri} />}
      <Button title="Pick Audio File" onPress={handlePickAudio} />
      <View
        style={{
          marginTop: 20,
          height: 250,
          width: "100%",
          backgroundColor: "black",
        }}
      >
        <Text style={{ fontSize: 20, marginTop: 10, color: "white" }}>
          Expo Video Player
        </Text>

        <VideoScreen />
      </View>
    </View>
  );
}
