import React, { useEffect, useState } from "react";
import { Platform, Text, StyleSheet } from "react-native";
import {
  StreamState,
  useStreamsQuery,
  useStreamStateQuery,
  useSubStreamsSubscription,
  useSubStreamStateSubscription,
} from "../generated/graphql";
import { WebView } from "../lib/WebView";
import { LIVE_URL } from "../config";
import LiveVideo from "../lib/LiveVideo";
import { Video } from "expo-av";

export default function OutputView() {
  const {
    data: queryData,
    loading: queryLoading,
    error,
  } = useStreamStateQuery();
  const { data: subData, error: err } = useSubStreamStateSubscription();
  const [streamState, setStreamState] = useState<StreamState>();

  useEffect(() => {
    if (!queryLoading && !streamState && queryData?.streamState) {
      setStreamState(queryData.streamState);
    }
  }, [queryLoading]);
  useEffect(() => {
    if (subData && subData.streamState) {
      setStreamState(subData.streamState);
    }
  }, [subData?.streamState?.metadata, subData?.streamState?.mode]);

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <Video
      ref={video}
      style={styles.video}
      source={{
        uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      }}
      shouldPlay
      useNativeControls
      resizeMode="contain"
      isLooping
      isMuted
    />
  );

  // return streamState &&
  //   streamState?.metadata &&
  //   streamState?.metadata[0]?.value ? (
  //   <LiveVideo
  //     ref={video}
  //     style={styles.video}
  //     source={`http://${LIVE_URL}:5080/WebRTCApp/streams/${streamState?.metadata[0]?.value}.m3u8`}
  //     shouldPlay
  //     useNativeControls
  //     resizeMode="contain"
  //     isLooping
  //   />
  // ) : // <WebView
  //   mediaPlaybackRequiresUserAction={
  //     Platform.OS !== "android" || Platform.Version >= 17 ? false : undefined
  //   }
  //   pointerEvents="none"
  //   allowsInlineMediaPlayback={true}
  //   userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
  //   source={{
  //     uri: `http://live.streamwith.me:5080/WebRTCApp/play.html?name=${streamState?.metadata[0]?.value}`,
  //   }}
  //   style={{ flex: 1 }}
  // />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
