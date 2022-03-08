import React, { ReactElement } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import {
  Button,
  CheckBox,
  Input,
  StyleService,
  useStyleSheet,
  Text,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/core";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";
import ImageOverlay from "../../components/ImageOverlay";
// @ts-ignore
import imageBackground from "../../../assets/rainbow-spinner.webp";

export default (): React.ReactElement => {
  const navigation = useNavigation<any>();
  const [userName, setUserName] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate("SignIn");
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (props): ReactElement => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const renderCheckboxLabel = React.useCallback(
    (evaProps) => (
      <Text {...evaProps} style={styles.termsCheckBoxText}>
        I read and agree to Terms & Conditions
      </Text>
    ),
    []
  );

  return (
    <KeyboardAvoidingView>
      <ImageOverlay style={{ flex: 1 }} source={imageBackground}>
        <View style={styles.headerContainer}>
          <Text category="h1" status="control">
            Hello
          </Text>
          <Text style={styles.signInLabel} category="s1" status="control">
            Create an account
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Input
            status="control"
            autoCapitalize="none"
            placeholder="User Name"
            accessoryRight={<Icon name="person" />}
            value={userName}
            onChangeText={setUserName}
          />
          <Input
            style={styles.formInput}
            status="control"
            autoCapitalize="none"
            placeholder="Email"
            accessoryRight={<Icon name="email" />}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.formInput}
            status="control"
            autoCapitalize="none"
            secureTextEntry={!passwordVisible}
            placeholder="Password"
            accessoryRight={renderPasswordIcon}
            value={password}
            onChangeText={setPassword}
          />
          <CheckBox
            style={styles.termsCheckBox}
            checked={termsAccepted}
            onChange={(checked: boolean) => setTermsAccepted(checked)}
          >
            {renderCheckboxLabel}
          </CheckBox>
        </View>
        <Button
          style={styles.signUpButton}
          size="giant"
          onPress={onSignUpButtonPress}
        >
          SIGN UP
        </Button>
        <Button
          style={styles.signInButton}
          appearance="ghost"
          status="control"
          onPress={onSignInButtonPress}
        >
          Already have an account? Sign In
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-1",
  },
  signInLabel: {
    marginTop: 16,
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 216,
  },
  profileAvatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
    alignSelf: "center",
    backgroundColor: "background-basic-color-1",
    tintColor: "text-hint-color",
  },
  editAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  formInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
  },
  termsCheckBoxText: {
    color: "text-control-color",
    marginLeft: 10,
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
