import { Pressable, StyleSheet, Text, View } from "react-native";
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
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { GRAPHQL_HTTP_URL, GRAPHQL_WS_URL } from "./src/config";
import SignIn from "./src/features/authentication/SignIn";
import ForgotPassword from "./src/features/authentication/ForgotPassword";
import SignUp from "./src/features/authentication/SignUp";
import Feed from "./src/features/home/Feed";
import Watch from "./src/features/home/Watch";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Stream from "./src/features/home/Stream";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import Studio from "./src/features/home/Studio";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";

const httpLink = new HttpLink({
  uri: GRAPHQL_HTTP_URL,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: GRAPHQL_WS_URL,
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
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}>
            <TailwindProvider utilities={utilities}>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName="SignIn"
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <Stack.Screen name="SignIn" component={SignIn} />
                  <Stack.Screen name="SignUp" component={SignUp} />
                  <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                  />
                  <Stack.Screen
                    options={{
                      title: "Home",
                      headerShown: true,
                      headerLeft: () => <></>,
                    }}
                    name="Feed"
                    component={Feed}
                  />
                  <Stack.Screen
                    options={({ route, navigation }) => ({
                      title: "Watch",
                      headerShown: true,
                      headerRight: () => (
                        <Pressable
                          onPress={() => navigation.navigate("Stream")}
                        >
                          <Text>Stream</Text>
                        </Pressable>
                      ),
                    })}
                    name="Watch"
                    component={Watch}
                  />
                  <Stack.Screen name="Stream" component={Stream} />
                  <Stack.Screen name="Studio" component={Studio} />
                </Stack.Navigator>
              </NavigationContainer>
            </TailwindProvider>
          </ApplicationProvider>
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
