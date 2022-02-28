import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { PermissionsAndroid, Dimensions } from "react-native";
// @ts-ignore
import { NodeCameraView } from "react-native-nodemediaclient";
import { v4 } from "uuid";
import { Container, ZStack, Button, Icon, Center, Fab } from "native-base";
import { Feather } from "@expo/vector-icons";
import { useCreateStreamMutation } from "./generated/graphql";
import { LIVE_URL } from "./config";

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
  } catch (err) {
    console.warn(err);
  }
};

export default function StreamView() {
  const vb = useRef();
  const nav = useNavigation<any>();
  const [isStreaming, setIsStreaming] = useState(false);
  const [createStream] = useCreateStreamMutation({
    variables: {
      uuid: v4(),
    },
  });

  return (
    <Container
      background="black"
      flexGrow={1}
      h={Dimensions.get("window").height}
      w={Dimensions.get("window").width}
    >
      <ZStack>
        <NodeCameraView
          style={{
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
          }}
          ref={(r: any) => {
            vb.current = r;
          }}
          outputUrl={`rtmp://${LIVE_URL}/live/${v4()}`}
          camera={{ cameraId: 1, cameraFrontMirror: true }}
          audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
          video={{
            preset: 12,
            bitrate: 400000,
            profile: 1,
            fps: 15,
            videoFrontMirror: false,
          }}
          autopreview={true}
        />
        <Fab
          style={{ transform: [{ rotate: "90deg" }] }}
          shadow={2}
          left="50%"
          bottom="4"
          size="16"
          color="primary.500"
          ml="-8"
          icon={
            isStreaming ? (
              <Icon color="white" as={Feather} name="pause" size="md" />
            ) : (
              <Icon color="white" as={Feather} name="play" size="md" />
            )
          }
          onPress={() => {
            if (!isStreaming && vb.current) {
              // @ts-ignore
              vb.current.start();
              createStream();
              setIsStreaming(true);
            } else if (isStreaming && vb.current) {
              // @ts-ignore
              vb.current.stop();
              setIsStreaming(false);
              nav.navigate("Home");
            }
          }}
        />
      </ZStack>

      {/* <Button title="request permissions" onPress={requestCameraPermission} />
      <Button
        onPress={() => {
          if (vb.current) {
            // @ts-ignore
            vb.current.start();
          }
        }}
        title="start stream"
        color="#841584"
      />
      <Button
        onPress={() => {
          if (vb.current) {
            // @ts-ignore
            vb.current.stop();
          }
        }}
        title="stop stream"
        color="#841584"
      />
      <Button title="go to view" onPress={() => nav.navigate("WatchView")} /> */}
    </Container>
  );
}
