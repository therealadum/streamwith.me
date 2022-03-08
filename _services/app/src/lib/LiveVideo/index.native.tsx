import React from "react";
import { StyleSheet } from "react-native";
import { Video } from "expo-av";

export default function LiveVideo(props: any) {
  return (
    <Video
      style={styles.video}
      source={{ uri: props.source }}
      shouldPlay
      useNativeControls
      resizeMode="contain"
      isLooping
      //   onPlaybackStatusUpdate={(status) => setStatus(() => status)}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
