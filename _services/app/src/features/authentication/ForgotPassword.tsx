import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon, Input, Text } from "@ui-kitten/components";
import ImageOverlay from "../../components/ImageOverlay";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";
import { useNavigation } from "@react-navigation/core";
// @ts-ignore
import imageBackground from "../../../assets/rainbow-spinner.webp";

export default (): React.ReactElement => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState<string>();

  const onResetPasswordButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  return (
    <KeyboardAvoidingView>
      <ImageOverlay style={styles.container} source={imageBackground}>
        <Text style={styles.forgotPasswordLabel} category="h4" status="control">
          Forgot Password
        </Text>
        <Text style={styles.enterEmailLabel} status="control">
          Please enter your email address
        </Text>
        <View style={styles.formContainer}>
          <Input
            status="control"
            placeholder="Email"
            accessoryRight={<Icon name="email" />}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <Button size="giant" onPress={onResetPasswordButtonPress}>
          RESET PASSWORD
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  formContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 24,
  },
  forgotPasswordLabel: {
    zIndex: 1,
    alignSelf: "center",
    marginTop: 24,
  },
  enterEmailLabel: {
    zIndex: 1,
    alignSelf: "center",
    marginTop: 64,
  },
});
