// components/VideoPlayer.tsx
import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";

interface VideoPlayerProps {
  uri: string;
  shouldPlay?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  uri,
  shouldPlay = false,
}) => {
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri }}
        useNativeControls
        shouldPlay={shouldPlay}
        style={styles.video}
        resizeMode={ResizeMode.STRETCH}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    height: 250,
    width: "100%",
  },
  video: {
    height: "100%",
    width: "100%",
  },
});

export default VideoPlayer;
