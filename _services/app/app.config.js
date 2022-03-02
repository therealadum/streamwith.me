export default {
  plugins: [
    [
      "@config-plugins/react-native-webrtc",
      {
        cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
        microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone",
      },
    ],
  ],
  ios: {
    bundleIdentifier: "me.streamwith",
  },
  android: {
    package: "me.streamwith",
  },
};
