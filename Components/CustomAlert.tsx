// components/CustomAlert.tsx

import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export type AlertOptions = {
  message: string;
  onConfirm?: () => void;
  onClose?: () => void;
  confirmText?: string;
  cancelText?: string;
};

export type CustomAlertRef = {
  show: (options: AlertOptions) => void;
};

// This global reference will be used by the AlertManager
export let alertRef: CustomAlertRef | null = null;

const CustomAlert = forwardRef<CustomAlertRef>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<AlertOptions>({
    message: "",
  });

  const show = (opts: AlertOptions) => {
    setOptions(opts);
    setVisible(true);
  };

  useImperativeHandle(ref, () => ({
    show,
  }));

  // Assign global reference
  alertRef = { show };

  const handleClose = () => {
    setVisible(false);
    options.onClose?.();
  };

  const handleConfirm = () => {
    setVisible(false);
    options.onConfirm?.();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.message}>{options.message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleClose} style={styles.cancel}>
              <Text style={styles.buttonText}>
                {options.cancelText || "Cancel"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm} style={styles.confirm}>
              <Text style={styles.buttonText}>
                {options.confirmText || "OK"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default CustomAlert;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 280,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cancel: {
    backgroundColor: "#888",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  confirm: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
});
