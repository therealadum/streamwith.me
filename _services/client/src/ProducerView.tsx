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
import React, { useState } from "react";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import {
  useStreamsQuery,
  useSubStreamsSubscription,
} from "./generated/graphql";
import { useEffect } from "react";
// @ts-ignore
import { NodePlayerView } from "react-native-nodemediaclient";
import { LIVE_URL } from "./config";

export default function ProducerView() {
  const nav = useNavigation<any>();
  const { data: queryData, loading: queryLoading } = useStreamsQuery();
  const { data: subData } = useSubStreamsSubscription();

  const [streams, setStreams] = useState<any>([]);
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
  return (
    <Container padding="4" flex={1}>
      <Stack direction="column" flex={1} bg="primary.100">
        {streams?.map((stream: any) => {
          return (
            <Center key={stream.id} w="80" h="80" bg="primary.200">
              <NodePlayerView
                style={{ flex: 1 }}
                inputUrl={`rtmp://${LIVE_URL}/live/${stream.id}`}
                scaleMode={"ScaleAspectFit"}
                bufferTime={300}
                maxBufferTime={1000}
                autoplay={true}
                audioEnable={true}
              />
            </Center>
          );
        })}
      </Stack>
    </Container>
  );
}
