import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AuthStackParamList } from '../../navigators/AuthStackNavigator';
import { useAuth } from '../../hooks/useAuth';
import { LoginUser } from '../../entities/user';
import { icons } from '../../assets';
import { SignInButton } from '../../components/ButtonWrapper/SignInButton';
import { Background } from '../../components/Background/BackgroundImage';
import { PaperArea } from '../../components/Background/PaperArea';
import { PaperAreaButton } from '../../components/ButtonWrapper/PaperAreaButton';
import createStyles from './signInAndRegisterStyles';

type SingInScreenProps = NativeStackScreenProps<AuthStackParamList, 'SingInScreen'>;

export const SingInScreen = ({ navigation }: SingInScreenProps) => {
  const { theme } = useTheme();
  const styles = createStyles();

  const window = useWindowDimensions();

  const { emailSignIn, signInAnonymously, loginOrSignUpWithGoogle } = useAuth()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = () => {
    navigation.navigate("RegisterScreen", {});
  }

  const handleLoginButton = () => {
    if (password === null || password === "") {
      Alert.alert("Password cannot be empty");
      return;
    }

    const userCandidate = {} as LoginUser;
    userCandidate.email = email.toLowerCase().trim();
    userCandidate.password = password;

    if (userCandidate.email === null || userCandidate.email === "") {
      Alert.alert("Email cannot be empty");
      return;
    }

    emailSignIn(userCandidate);
  }
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const renderHeaderContainer = () => (
    <Animated.View style={[styles.headerContainer, { opacity: fadeAnim }]}>
      <Text style={styles.titleTextStyle}>Welcome Back!</Text>
    </Animated.View>
  );

  const renderInputContainer = () => (
    <View style={styles.textInputContainer}>
      <PaperArea
        areaStyle={styles.paperArea}
        componentStyle={{ backgroundColor: theme.colors.canvas }}
      >
        <View style={styles.inputArea}>
          <Text style={styles.inputText}>
            Email
          </Text>
          <TextInput
            placeholder="Enter your email..."
            placeholderTextColor={theme.colors.canvasInverted}
            style={styles.textInputStyle}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputArea}>
          <Text style={styles.inputText}>
            Password
          </Text>
          <TextInput
            placeholder="Enter your password..."
            placeholderTextColor={theme.colors.canvasInverted}
            style={styles.textInputStyle}
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.LoginButtonContainer}>
          <PaperAreaButton
            areaStyle={styles.LoginButtonAreaStyle}
            buttonStyle={styles.LoginButtonStyle}
            textStyle={styles.LoginButtonTextStyle}
            onPress={handleLoginButton} text={'Sign In'} />
        </View>
      </PaperArea>
    </View>
  );

  const renderExternalOptionsContainer = () => (
    <View style={styles.externalOptionsContainer}>
      <View style={styles.orTextArea}>
        <View style={styles.horizontalLine} />
        <View>
          <Text style={styles.orTextStyle}>OR</Text>
        </View>
        <View style={styles.horizontalLine} />
      </View>
      <SignInButton text="Continue with Google" onSignPress={loginOrSignUpWithGoogle} icon={icons['google-button.png']} />
      <SignInButton text="Continue without Login" onSignPress={signInAnonymously} icon={icons['user.png']} />
    </View>
  );

  const renderQuestionContainer = () => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>
        Don't Have An Account ?
      </Text>
      <TouchableOpacity
        style={styles.questionButtonStyle}
        onPress={handleRegistration}
      >
        <Text style={styles.questionButtonText}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ ...styles.container, height: window.height }}>
      <Background />
      <View style={styles.mainContainer}>
        {renderHeaderContainer()}
        {renderInputContainer()}
        {renderExternalOptionsContainer()}
        {renderQuestionContainer()}
      </View>
    </View >
  );
};

export default SingInScreen;
