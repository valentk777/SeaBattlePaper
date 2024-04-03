import React, { useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AuthStackNavigator from "./AuthStackNavigator"
import MainStackNavigator from "./MainStackNavigator";
import { useAuth } from "../hooks/useAuth";
import { Keyboard } from "react-native";

export type RootStackParamList = {
  AuthStack: {};
  MainStack: {};
};

const Root = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
  const { state } = useAuth();

  useEffect(() => {
    setAppState();
  }, [state])

  const setAppState = async () => {
    if (state.isAuthenticated) {
      Keyboard.dismiss();
    }
  }

  const renderScreenChange = () => {
    if (state?.isAuthenticated) {
      return (
        <Root.Screen name="MainStack" component={MainStackNavigator} />
      );
    } else {
      return (
        <Root.Screen name="AuthStack" component={AuthStackNavigator} />
      );
    }
  };

  return (
    <Root.Navigator
      screenOptions={{ headerShown: false }}
    >
      {renderScreenChange()}
    </Root.Navigator>
  )
}

export default RootNavigator
