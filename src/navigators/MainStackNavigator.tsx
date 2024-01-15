import React, { createNativeStackNavigator } from "@react-navigation/native-stack"
import UserScreen from "../screens/userScreen";
import CreateGameScreen from "../screens/game/createGameScreen";
import GameSetupScreen from "../screens/game/gameSetupScreen";
import PlayGameScreen from "../screens/game/playGameScreen";
import HomeScreen from "../screens/homeScreen";
import { StyleSheet } from 'react-native';
import { AppTheme } from '../styles/themeModels';
import { useTheme } from "../hooks/useTheme";
import { LogOutButton } from "../components/LogOutButton";

export type MainStackParamList = {
  Home: {};
  CreateGame: {};
  GameSetup: {};
  PlayGame: {};
  User: {};
};

const MainStack = createNativeStackNavigator<MainStackParamList>()

const MainStackNavigator = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        // headerShown: false,
      }}
    >
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '',
          headerTransparent: true,
          headerStyle: { backgroundColor: 'rgba(0, 0, 0, 0.0)' },
          headerRight: () => (<LogOutButton />),
        }}
      />
      <MainStack.Screen
        name="CreateGame"
        component={CreateGameScreen}
        options={{
          title: 'Create new game',
        }}
      />
      <MainStack.Screen
        name="GameSetup"
        component={GameSetupScreen}
        options={{ title: '' }}
      />
      <MainStack.Screen
        name="PlayGame"
        component={PlayGameScreen}
        options={{ title: '' }}
      />
      <MainStack.Screen
        name="User"
        component={UserScreen}
        options={{ title: '' }}
      />
    </MainStack.Navigator>
  )
}

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    header: {
      backgroundColor: theme.colors.secondary,
    },
    headerTitle: {
      fontFamily: theme.fonts.bold,
      fontSize: 25,
      color: theme.colors.tertiary,
    }
  });

  return styles;
};

export default MainStackNavigator
