import {
  Actionsheet,
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  Icon,
  Input,
  ScrollView,
  Stack,
  Text,
  useDisclose,
  Modal,
} from "native-base";
import React, { useRef, useState } from "react";
import { Dimensions, Platform, View } from "react-native";
import { WebView } from "./lib/WebView";
import { useNavigation } from "@react-navigation/core";
import {
  useSetStreamStateMutation,
  useStreamsQuery,
  useSubStreamsSubscription,
} from "./generated/graphql";
import { useEffect } from "react";
import { LIVE_URL } from "./config";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import OutputView from "./components/OutputView";

export default function ProducerView() {
  const nav = useNavigation<any>();
  const { data: queryData, loading: queryLoading } = useStreamsQuery();
  const { data: subData } = useSubStreamsSubscription();

  const { isOpen, onOpen, onClose } = useDisclose();

  const [streams, setStreams] = useState<any>();
  useEffect(() => {
    if (!queryLoading && !streams && queryData?.streams?.length) {
      setStreams(queryData.streams);
    }
  }, [queryLoading]);
  useEffect(() => {
    if (subData) {
      setStreams(subData.streams);
    }
  }, [subData?.streams?.length]);
  const streamTouples = new Array<any[]>();
  for (let i = 0; i < streams?.length; i += 2) {
    if (streams[i + 1]) {
      streamTouples.push([streams[i], streams[i + 1]]);
    } else {
      streamTouples.push([streams[i]]);
    }
  }
  const [focusedStream, setFocusedStream] = useState<any>();

  const [setStreamState] = useSetStreamStateMutation({
    variables: {
      streamStateInput: {
        mode: "THEATRE",
        metadata: [
          {
            key: "main",
            value: focusedStream,
          },
        ],
      },
    },
  });
  return (
    // <Stack direction="column" flex={1} bg="primary.100">
    //   {streams?.map((stream: any) => {
    //     return (
    //       <WebView
    //         key={stream.id}
    //         mediaPlaybackRequiresUserAction={
    //           Platform.OS !== "android" || Platform.Version >= 17
    //             ? false
    //             : undefined
    //         }
    //         allowsInlineMediaPlayback={true}
    //         userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
    //         source={{
    //           uri: `http://live.streamwith.me:5080/WebRTCApp/play.html?name=${stream.id}`,
    //         }}
    //         style={{ flex: 1 }}
    //       />
    //     );
    //   })}
    // </Stack>
    <>
      <View
        style={{ flex: 1, backgroundColor: "red", flexDirection: "column" }}
      >
        <View
          style={{
            width: Dimensions.get("window").width,
            height: (Dimensions.get("window").width * 9) / 16,
          }}
        >
          <OutputView />
        </View>
        <ScrollView
          flexGrow={1}
          bg="primary.200"
          showsVerticalScrollIndicator={false}
        >
          {streamTouples.map((streamTouple: any[], i) => {
            return (
              <View
                key={i}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {streamTouple.map((stream: any) => {
                  return (
                    <Pressable
                      onPress={() => {
                        setFocusedStream(stream.id);
                        onOpen();
                      }}
                      key={stream.id}
                    >
                      <WebView
                        mediaPlaybackRequiresUserAction={
                          Platform.OS !== "android" || Platform.Version >= 17
                            ? false
                            : undefined
                        }
                        allowsInlineMediaPlayback={true}
                        userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
                        source={{
                          uri: `http://live.streamwith.me:5080/WebRTCApp/play.html?name=${stream.id}`,
                        }}
                        pointerEvents="none"
                        style={{
                          width: Dimensions.get("window").width / 2,
                          height: (Dimensions.get("window").width * 9) / 32,
                        }}
                      />
                    </Pressable>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content>
          <WebView
            mediaPlaybackRequiresUserAction={
              Platform.OS !== "android" || Platform.Version >= 17
                ? false
                : undefined
            }
            allowsInlineMediaPlayback={true}
            userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
            source={{
              uri: `http://live.streamwith.me:5080/WebRTCApp/play.html?name=${focusedStream}`,
            }}
            pointerEvents="none"
            style={{
              width: (Dimensions.get("window").width * 4) / 5,
              height: (((Dimensions.get("window").width * 9) / 16) * 4) / 5,
            }}
          />
        </Modal.Content>
      </Modal>
      <Actionsheet isOpen={isOpen} onClose={onClose} disableOverlay>
        <Actionsheet.Content>
          <Actionsheet.Item
            startIcon={
              <Icon
                as={MaterialIcons}
                color="trueGray.400"
                mr="1"
                size="6"
                name="photo-size-select-actual"
              />
            }
            onPress={() => {
              setStreamState();
              onClose();
            }}
          >
            Set Main
          </Actionsheet.Item>
          <Actionsheet.Item onPress={onClose}>Cancel</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
