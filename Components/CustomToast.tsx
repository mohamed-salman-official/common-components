// components/Toast.tsx

import React, { useState, useEffect } from "react";
import { Animated, Text, StyleSheet, View } from "react-native";

let toastInstance: ((message: string) => void) | null = null;

export const showToast = (message: string) => {
  if (toastInstance) {
    toastInstance(message);
  } else {
    console.warn("Toast not initialized");
  }
};

const Toast = () => {
  const [message, setMessage] = useState("");
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    toastInstance = (msg: string) => {
      setMessage(msg);
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    };
  }, []);

  if (!message) return null;

  return (
    <Animated.View style={[styles.toastContainer, { opacity }]}>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    zIndex: 9999,
  },
  toastText: {
    color: "#fff",
    fontSize: 14,
  },
});
