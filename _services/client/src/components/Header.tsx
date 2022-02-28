import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { StatusBar, Box, HStack, Menu, Pressable, Text } from "native-base";

export default function Header({ route }: NativeStackHeaderProps) {
  return (
    <>
      <StatusBar backgroundColor="primary.500" barStyle="light-content" />
      <Box safeAreaTop bg="primary.500" />
      <HStack
        bg="primary.500"
        px="4"
        py="4"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <HStack alignItems="center">
          <Text color="white" fontSize="20" fontWeight="bold">
            {route.name}
          </Text>
        </HStack>
        {route.name === "Producer" ? (
          <Menu
            w="190"
            mr="4"
            mt="2"
            trigger={(triggerProps) => {
              return (
                <Pressable
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <Text>Mode</Text>
                </Pressable>
              );
            }}
          >
            <Menu.Item>Arial</Menu.Item>
            <Menu.Item>Nunito Sans</Menu.Item>
            <Menu.Item>Roboto</Menu.Item>
            <Menu.Item>Poppins</Menu.Item>
          </Menu>
        ) : null}
      </HStack>
    </>
  );
}
