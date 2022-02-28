import React from "react";
import { View } from "react-native";
// @ts-ignore
import { NodePlayerView } from "react-native-nodemediaclient";

export default function WatchView() {
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <NodePlayerView
        style={{ flex: 1, transform: [{ rotate: "90deg" }] }}
        inputUrl={"rtmp://192.168.1.40/live/final"}
        scaleMode={"ScaleAspectFit"}
        bufferTime={300}
        maxBufferTime={1000}
        autoplay={true}
        audioEnable={true}
      />
    </View>
  );
}
