import React, { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { SignalingChannel } from "./lib/SignalingChannel";

import {
  MediaStream,
  RTCPeerConnection,
  RTCSessionDescriptionType,
  RTCView,
  toURL,
} from "./lib/WebRTC";
import { LIVE_URL } from "./config";

const STREAM_ID = "1707141631522164879749071";

export default function WatchView() {
  const [remoteStream, setRemoteStream] = useState<MediaStream>();

  const peerConnection = useRef<RTCPeerConnection>();

  const startStreaming = async (
    remoteDescription: RTCSessionDescriptionType
  ) => {
    peerConnection.current = new RTCPeerConnection({
      iceServers: [],
    });

    peerConnection.current.onaddstream = (event) => {
      console.log("on add stream");
      setRemoteStream(event.stream);
    };

    peerConnection.current.onremovestream = () => console.log("stream removed");

    peerConnection.current.onconnectionstatechange = (event) =>
      console.log(
        "state change connection: ",
        peerConnection.current?.connectionState
      );

    peerConnection.current.onsignalingstatechange = () =>
      console.log(peerConnection.current?.signalingState);

    peerConnection.current.onicecandidateerror = console.log;

    peerConnection.current.onicecandidate = (event) => {
      const candidate = event.candidate;
      if (
        candidate &&
        signalingChannel.current?.isChannelOpen() &&
        peerConnection.current?.signalingState === "have-remote-offer"
      ) {
        console.log("sending local ice candidates");
        signalingChannel.current?.sendJSON({
          command: "takeCandidate",
          streamId: STREAM_ID,
          label: candidate.sdpMLineIndex.toString(),
          id: candidate.sdpMid,
          candidate: candidate.candidate,
        });
      }
    };

    await peerConnection.current?.setRemoteDescription(remoteDescription);

    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);
  };

  const signalingChannel = useRef<SignalingChannel>(
    new SignalingChannel(`ws://${LIVE_URL}:5080/WebRTCApp/websocket`, {
      onopen: () => {
        signalingChannel.current?.sendJSON({
          command: "play",
          streamId: STREAM_ID,
        });
      },
      start: async () => {},
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
          .catch((error) => console.log(error));
      },
      takeConfiguration: async (data) => {
        console.log("got offer: ", data?.type);
        const offer = data?.sdp || "";

        await startStreaming({
          sdp: offer,
          type: data?.type || "",
        });

        signalingChannel.current?.sendJSON({
          command: "takeConfiguration",
          streamId: STREAM_ID,
          type: "answer",
          sdp: peerConnection?.current?.localDescription?.sdp,
        });
      },
    })
  );

  useEffect(() => {
    return () => {
      signalingChannel.current.close();
    };
  }, []);

  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Button title="Play" onPress={() => signalingChannel.current.open()} />
        <Button title="Stop" onPress={() => signalingChannel.current.close()} />
      </View>
      <View style={{ backgroundColor: "red", flex: 1 }}>
        <Text>Video</Text>
        {!!remoteStream && (
          <RTCView
            streamURL={toURL(remoteStream)}
            style={{
              backgroundColor: "blue",
              flex: 1,
              width: 300,
              height: 300,
            }}
            mirror={false}
            objectFit="cover"
          />
        )}
      </View>
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
