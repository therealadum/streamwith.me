import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

const KeyboardAvoidingComponent = ({ children }: any) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingComponent;
