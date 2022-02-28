import {
  Button,
  Center,
  Container,
  Heading,
  Icon,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export default function HomeView() {
  const nav = useNavigation<any>();
  return (
    <Container padding="4">
      <Heading>
        Welcome to streamwith.me, a
        <Text color="primary.500"> live streaming platform </Text>
        for your community.
      </Heading>
      <Text mt="4" fontWeight="medium">
        Please select an option that suits you.
      </Text>
      <VStack mt="4" space={4} alignItems="center">
        <Button
          onPress={() => nav.navigate("Viewer")}
          w="48"
          leftIcon={<Icon as={Feather} name="user" size="sm" />}
        >
          Viewer
        </Button>
        <Button
          onPress={() => nav.navigate("Streamer")}
          w="48"
          leftIcon={<Icon as={Feather} name="video" size="sm" />}
        >
          Streamer
        </Button>
        <Button
          onPress={() => nav.navigate("Producer")}
          w="48"
          leftIcon={<Icon as={Feather} name="film" size="sm" />}
        >
          Producer
        </Button>
      </VStack>
    </Container>
  );
}
