import React, { createNativeStackNavigator } from "@react-navigation/native-stack"
import UserScreen from "../screens/userScreen";
import CreateGameScreen from "../screens/game/createGameScreen";
import GameSetupScreen from "../screens/game/gameSetupScreen";
import PlayGameScreen from "../screens/game/playGameScreen";
import HomeScreen from "../screens/homeScreen";
import { View, useWindowDimensions } from "react-native";

export type MainStackParamList = {
  Home: { };
  CreateGame: { };
  GameSetup: { };
  PlayGame: { };
  User: { }; 
};

const MainStack = createNativeStackNavigator<MainStackParamList>()

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        // headerShown: false,
      }}
      initialRouteName="Home">
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
      />
      <MainStack.Screen
        name="CreateGame"
        component={CreateGameScreen}
      />
      <MainStack.Screen
        name="GameSetup"
        component={GameSetupScreen}
      />
      <MainStack.Screen
        name="PlayGame"
        component={PlayGameScreen}
      />
      <MainStack.Screen
        name="User"
        component={UserScreen}
      />
    </MainStack.Navigator>
  )
}

export default MainStackNavigator
