import React, { useEffect, useRef, useState } from "react";
import { Text, Dimensions, Platform, StyleSheet, View } from "react-native";
import { SignalingChannel } from "../../lib/SignalingChannel";

import {
  mediaDevices,
  MediaStream,
  RTCPeerConnection,
  RTCView,
  toURL,
} from "../../lib/WebRTC";
import { LIVE_URL } from "../../config";
import * as Random from "expo-random";
import { useCreateStreamMutation } from "../../generated/graphql";
import {
  useDeviceOrientation,
  useDimensions,
} from "@react-native-community/hooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Spinner, useTheme } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/core";

const STREAM_ID = Random.getRandomBytes(12).toString().replace(/,/g, "");

export default function Stream() {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [audiMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [createStream] = useCreateStreamMutation({
    variables: {
      uuid: STREAM_ID,
    },
  });
  const theme = useTheme();
  const navigation = useNavigation();
  const localStreamRef = useRef<MediaStream>();

  const peerConnection = useRef<RTCPeerConnection>();

  const startStreaming = async () => {
    try {
      if (!localStreamRef?.current) {
        return;
      }

      peerConnection.current = new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      });

      peerConnection.current?.addStream(localStreamRef.current);

      peerConnection.current.onsignalingstatechange = () =>
        console.log(peerConnection.current?.signalingState);

      peerConnection.current.onicecandidateerror = console.log;
      peerConnection.current.onicecandidate = (event) => {
        const candidate = event.candidate;
        if (candidate && signalingChannel.current?.isChannelOpen()) {
          signalingChannel.current?.sendJSON({
            command: "takeCandidate",
            streamId: STREAM_ID,
            label: candidate.sdpMLineIndex.toString(),
            id: candidate.sdpMid,
            candidate: candidate.candidate,
          });
        }
      };

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      await createStream();
      setLoading(false);
      setStarted(true);
    } catch (e) {
      console.log(e);
      setStarted(false);
    }
  };

  const signalingChannel = useRef<SignalingChannel>(
    new SignalingChannel(`ws://${LIVE_URL}:5080/WebRTCApp/websocket`, {
      onopen: () => {
        signalingChannel.current?.sendJSON({
          command: "publish",
          streamId: STREAM_ID,
        });
      },
      start: () => {
        signalingChannel.current?.sendJSON({
          command: "takeConfiguration",
          streamId: STREAM_ID,
          type: "offer",
          sdp: peerConnection?.current?.localDescription?.sdp,
        });
      },
      stop: () => {
        console.log("stop called");
      },
      takeCandidate: (data) => {
        console.log("onIceCandidate remote");
        peerConnection.current
          ?.addIceCandidate({
            candidate: data?.candidate || "",
            sdpMLineIndex: Number(data?.label) || 0,
            sdpMid: data?.id || "",
          })
          .catch((error) => {
            console.log(error);
          });
      },
      takeConfiguration: (data) => {
        console.log("got answer");
        const answer = data?.sdp || "";
        peerConnection.current?.setRemoteDescription({
          sdp: answer,
          type: "answer",
        });
      },
    })
  );

  useEffect(() => {
    const getStream = async () => {
      let sourceId;
      const sourceInfos = await mediaDevices.enumerateDevices();
      for (const info of sourceInfos) {
        if (
          info.kind == "videoinput" &&
          Platform.OS !== "web" &&
          info.facing == isFrontCamera
            ? "user"
            : "environment"
        ) {
          sourceId = info.deviceId;
        }
      }

      const media = await mediaDevices.getUserMedia({
        audio: true,
        video: {
          facingMode: "environment",
          width: { ideal: 4096 },
          height: { ideal: 2160 },
          optional: sourceId,
        },
      });

      if (media) {
        localStreamRef.current = media as MediaStream;
        setLocalStream(media as MediaStream);
      }
    };

    getStream();
  }, []);

  useEffect(() => {
    return () => {
      signalingChannel.current.close();
    };
  }, []);

  const { landscape } = useDeviceOrientation();
  const { top, left, right, bottom } = useSafeAreaInsets();
  if (!landscape) {
    return <Text>Go landscape pls</Text>;
  }
  return (
    <View style={StyleSheet.absoluteFill}>
      {!!localStream && (
        <RTCView
          streamURL={toURL(localStream)}
          style={{ flex: 1 }}
          mirror={isFrontCamera}
          objectFit="cover"
        />
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "stretch",
          position: "absolute",
          top: 0,
          left,
          right: 0,
          bottom: 0,
        }}
      >
        <View style={{ width: 64 }} />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            flexGrow: 1,
            alignItems: "center",
          }}
        >
          <Text>00:32</Text>
        </View>
        <View
          style={{
            width: 64,
            marginRight: right,
            paddingVertical: bottom,
          }}
        >
          <View
            style={{
              flex: 1,
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <MaterialCommunityIcons
              color={theme["color-basic-100"]}
              size={24}
              name="close"
              onPress={() => navigation.goBack()}
            />
            {loading ? (
              <Spinner status="danger" size="giant" />
            ) : (
              <MaterialCommunityIcons
                color={
                  started ? theme["color-danger-500"] : theme["color-basic-100"]
                }
                size={64}
                name="record-circle-outline"
                onPress={async () => {
                  if (!started) {
                    setLoading(true);
                    await startStreaming();
                    signalingChannel.current?.open();
                    return;
                  }

                  setStarted(false);
                  peerConnection.current?.close();
                  signalingChannel.current?.close();
                }}
              />
            )}
            <MaterialCommunityIcons
              color={theme["color-basic-100"]}
              size={24}
              name="signal-cellular-2"
            />
          </View>
        </View>
      </View>
      {/* <View style={styles.bottom}>
        <Button
          title={started ? "Stop" : "Start"}
          color="white"
          onPress={async () => {
            if (!started) {
              setStarted(true);
              await startStreaming();
              signalingChannel.current?.open();
              return;
            }

            setStarted(false);
            peerConnection.current?.close();
            signalingChannel.current?.close();
          }}
        />
        <Button
          title={audiMuted ? "UMA" : "MA"}
          color="white"
          onPress={() => {
            const localStreams =
              peerConnection.current?.getLocalStreams() || [];
            for (const stream of localStreams) {
              stream.getAudioTracks().forEach((each) => {
                each.enabled = audiMuted;
              });
            }
            setAudioMuted((m) => !m);
          }}
        />
        <Button
          title={videoMuted ? "UMV" : "MV"}
          color="white"
          onPress={() => {
            const localStreams =
              peerConnection.current?.getLocalStreams() || [];
            for (const stream of localStreams) {
              stream.getVideoTracks().forEach((each) => {
                each.enabled = videoMuted;
              });
            }
            setVideoMuted((m) => !m);
          }}
        />
        <Button
          title="SC"
          color="white"
          onPress={() => {
            const localStreams =
              peerConnection.current?.getLocalStreams() || [];
            for (const stream of localStreams) {
              stream.getVideoTracks().forEach((each) => {
                // @ts-ignore
                // easiest way is to switch camera this way
                each._switchCamera();
              });
            }
            setIsFrontCamera((c) => !c);
          }}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-evenly",
    marginBottom: 30,
  },
});
