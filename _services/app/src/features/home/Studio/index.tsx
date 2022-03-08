import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  Dimensions,
  Platform,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import OutputView from "../../../components/OutputView";
import { useDimensions } from "@react-native-community/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  Inter_700Bold,
  Inter_600SemiBold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import { Feather } from "@expo/vector-icons";

const ratio = {
  w: 16,
  h: 9,
};

export default function Studio() {
  const tailwind = useTailwind();
  const {
    window: { width, height },
  } = useDimensions();
  const calculatedHeight = (width * ratio.h) / ratio.w;
  return (
    <SafeAreaView style={[tailwind("bg-black flex-1")]}>
      <StatusBar animated style="light" />
      <View style={[{ height }]}>
        <View style={[{ height: calculatedHeight }, tailwind("z-10 relative")]}>
          <OutputView />
          <View style={tailwind("absolute top-0 left-0 right-0 z-20")}>
            <View style={tailwind("flex-row items-center justify-between")}>
              <Pressable style={tailwind("p-4")}>
                <Feather name="arrow-left" size={24} color="white" />
              </Pressable>
              <Pressable style={tailwind("p-4")}>
                <Feather name="more-horizontal" size={24} color="white" />
              </Pressable>
            </View>
          </View>
          <View style={tailwind("absolute bottom-0 left-0 right-0 z-20")}>
            <View style={tailwind("flex-row items-center justify-end")}>
              <View style={tailwind("p-4 pr-2 items-center justify-center")}>
                <Feather name="user" size={24} color="white" />
                <Text
                  style={[
                    tailwind("text-white text-sm"),
                    { fontFamily: "Inter_400Regular" },
                  ]}
                >
                  2.2k
                </Text>
              </View>
              <View style={tailwind("p-4 pl-2 items-center justify-center")}>
                <Feather name="heart" size={24} color="white" />
                <Text
                  style={[
                    tailwind("text-white text-sm"),
                    { fontFamily: "Inter_400Regular" },
                  ]}
                >
                  300
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={tailwind("flex-1 flex-row items-stretch")}>
          <View style={tailwind("flex-1 bg-gray-800 relative")}>
            <LinearGradient
              // Background Linear Gradient
              colors={["rgba(0,0,0,0.6)", "transparent"]}
              style={tailwind("absolute top-0 left-0 right-0 h-12 z-10")}
            />
            <Text
              style={[
                tailwind(
                  "text-white text-3xl z-20 p-4 absolute top-0 left-0 right-0"
                ),
                { fontFamily: "Inter_700Bold" },
              ]}
            >
              Scene A
            </Text>
            <ScrollView style={tailwind("flex-1 pt-16 px-4")}>
              <Text
                style={[
                  tailwind("text-white uppercase mt-4"),
                  { fontFamily: "Inter_600SemiBold" },
                ]}
              >
                Display mode
              </Text>
              <View style={tailwind("flex-row mt-4 items-stretch")}>
                <View style={tailwind("w-1/2 pr-2")}>
                  <Pressable>
                    <View
                      style={tailwind(
                        "border-4 rounded border-indigo-600 h-24 bg-indigo-300"
                      )}
                    ></View>
                    <Text
                      style={[
                        tailwind("text-indigo-200 mt-2"),
                        { fontFamily: "Inter_400Regular" },
                      ]}
                    >
                      Theatre
                    </Text>
                  </Pressable>
                </View>
                <View style={tailwind("w-1/2 pl-2")}>
                  <Pressable>
                    <View
                      style={tailwind(
                        "border-4 rounded border-indigo-300 h-24 bg-indigo-300"
                      )}
                    ></View>
                    <Text
                      style={[
                        tailwind("text-indigo-200 mt-2"),
                        { fontFamily: "Inter_400Regular" },
                      ]}
                    >
                      Picture-in-picture
                    </Text>
                  </Pressable>
                </View>
              </View>
              <Text
                style={[
                  tailwind("text-white uppercase mt-8"),
                  { fontFamily: "Inter_600SemiBold" },
                ]}
              >
                Sources
              </Text>
              <View style={tailwind("flex-row mt-4 items-stretch")}>
                <View style={tailwind("w-1/2 pr-2")}>
                  <Pressable>
                    <View
                      style={tailwind(
                        "border-4 rounded border-indigo-300 h-24 bg-indigo-300"
                      )}
                    ></View>
                    <Text
                      style={[
                        tailwind("text-indigo-200 mt-2"),
                        { fontFamily: "Inter_400Regular" },
                      ]}
                    >
                      Main
                    </Text>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={tailwind("w-20 bg-gray-900")}>
            <Pressable>
              <View style={tailwind("h-20 w-20 items-center justify-center")}>
                <Feather name="menu" size={32} color="white" />
              </View>
            </Pressable>
            <Pressable>
              <View
                style={tailwind(
                  "h-20 w-20 items-center justify-center bg-indigo-600"
                )}
              >
                <Text
                  style={[
                    tailwind("text-indigo-200 text-xl uppercase"),
                    { fontFamily: "Inter_400Regular" },
                  ]}
                >
                  SA
                </Text>
              </View>
            </Pressable>
            <Pressable>
              <View
                style={tailwind(
                  "h-20 w-20 items-center justify-center bg-indigo-700"
                )}
              >
                <Text
                  style={[
                    tailwind("text-indigo-200 text-xl uppercase"),
                    { fontFamily: "Inter_400Regular" },
                  ]}
                >
                  SB
                </Text>
              </View>
            </Pressable>
            <Pressable>
              <View
                style={tailwind(
                  "h-20 w-20 items-center justify-center bg-indigo-800"
                )}
              >
                <Text
                  style={[
                    tailwind("text-indigo-200 text-xl uppercase"),
                    { fontFamily: "Inter_400Regular" },
                  ]}
                >
                  SC
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
