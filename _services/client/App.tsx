import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  split,
  HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import React from "react";
import StreamView from "./src/StreamView";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import WatchView from "./src/WatchView";
import Header from "./src/components/Header";
import HomeView from "./src/HomeView";
import ProducerView from "./src/ProducerView";
import { GRAPHQL_URL } from "./src/config";

const httpLink = new HttpLink({
  uri: `https://${GRAPHQL_URL}/graphql`,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${GRAPHQL_URL}/graphql`,
  })
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ header: Header }}
          >
            <Stack.Screen name="Home" component={HomeView} />
            <Stack.Screen
              name="Streamer"
              options={{ header: () => null }}
              component={StreamView}
            />
            <Stack.Screen name="Viewer" component={WatchView} />
            <Stack.Screen name="Producer" component={ProducerView} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </ApolloProvider>
  );
}
