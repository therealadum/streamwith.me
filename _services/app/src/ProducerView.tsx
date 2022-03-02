import {
  Button,
  Center,
  Container,
  Heading,
  Icon,
  Stack,
  Text,
  VStack,
} from "native-base";
import React, { useRef, useState } from "react";
import { View } from "react-native";
import { WebView } from "./lib/WebView";
import { useNavigation } from "@react-navigation/core";
import {
  useStreamsQuery,
  useSubStreamsSubscription,
} from "./generated/graphql";
import { useEffect } from "react";
import { LIVE_URL } from "./config";
import {
  RTCSessionDescriptionType,
  RTCView,
  toURL,
  RTCPeerConnection,
} from "./lib/WebRTC";
import { SignalingChannel } from "./lib/SignalingChannel";

export default function ProducerView() {
  const nav = useNavigation<any>();
  const { data: queryData, loading: queryLoading } = useStreamsQuery();
  const { data: subData } = useSubStreamsSubscription();

  const [streams, setStreams] = useState<any>([]);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  useEffect(() => {
    if (!queryLoading && streams.length === 0 && queryData?.streams?.length) {
      setStreams(queryData.streams);
    }
  }, [queryLoading]);
  useEffect(() => {
    if (subData) {
      setStreams(subData.streams);
    }
  }, [subData?.streams?.length]);

  const peerConnection = useRef<RTCPeerConnection>();

  const startStreaming = async (
    remoteDescription: RTCSessionDescriptionType
  ) => {
    peerConnection.current = new RTCPeerConnection({
      iceServers: [],
    });

    peerConnection.current.onaddstream = (event) => {
      console.log("on add stream");
      setRemoteStreams([...remoteStreams, event.stream]);
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
        streams &&
        streams.length &&
        signalingChannel.current?.isChannelOpen() &&
        peerConnection.current?.signalingState === "have-remote-offer"
      ) {
        console.log("sending local ice candidates");
        signalingChannel.current?.sendJSON({
          command: "takeCandidate",
          streamId: streams[0].id,
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
    new SignalingChannel(`ws://${LIVE_URL}:5080/WebRTCAppEE/websocket`, {
      onopen: () => {
        streams && streams.length
          ? signalingChannel.current?.sendJSON({
              command: "play",
              streamId: streams[0].id,
            })
          : null;
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

        streams && streams.length;
        signalingChannel.current?.sendJSON({
          command: "takeConfiguration",
          streamId: streams[0].id,
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
    <Container padding="4" flex={1}>
      <Stack direction="column" flex={1} bg="primary.100">
        {streams?.map((stream: any) => {
          return (
            <WebView
              key={stream.id}
              source={{
                uri: `http://live.streamwith.me:5080/WebRTCAppEE/play.html?name=${stream.id}`,
              }}
              style={{ flex: 1 }}
            />
          );
        })}
      </Stack>
    </Container>
  );
}
