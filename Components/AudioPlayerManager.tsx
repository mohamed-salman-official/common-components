import React, { useEffect, useRef, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Audio, AVPlaybackStatus } from "expo-av";
import Slider from "@react-native-community/slider";

interface AudioPlayerProps {
  uri: string;
  autoPlay?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ uri, autoPlay = false }) => {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekPosition, setSeekPosition] = useState(0);

  useEffect(() => {
    loadAudio();

    return () => {
      unloadAudio();
    };
  }, [uri]);

  const loadAudio = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: autoPlay },
        onPlaybackStatusUpdate
      );
      soundRef.current = sound;
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  const unloadAudio = async () => {
    try {
      await soundRef.current?.unloadAsync();
    } catch (error) {
      console.error("Error unloading audio:", error);
    }
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      console.error("Playback error:", status.error);
      return;
    }

    if (!isSeeking) {
      setPosition(status.positionMillis ?? 0);
    }

    setDuration(status.durationMillis ?? 0);
    setIsPlaying(status.isPlaying);
  };

  const togglePlayPause = async () => {
    if (!soundRef.current) return;

    const status = await soundRef.current.getStatusAsync();
    if (!status.isLoaded) return;

    if (status.isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
  };

  const onSeekSliderValueChange = (value: number) => {
    setIsSeeking(true);
    setSeekPosition(value);
  };

  const onSeekSliderComplete = async (value: number) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(value);
    }
    setPosition(value);
    setIsSeeking(false);
  };

  const formatMillis = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={isSeeking ? seekPosition : position}
        onValueChange={onSeekSliderValueChange}
        onSlidingComplete={onSeekSliderComplete}
        minimumTrackTintColor="#1FB28A"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1FB28A"
      />
      <View style={styles.timeContainer}>
        <Text>{formatMillis(position)}</Text>
        <Text>{formatMillis(duration)}</Text>
      </View>
      <Button title={isPlaying ? "Pause" : "Play"} onPress={togglePlayPause} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    alignItems: "center",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  timeContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default AudioPlayer;
