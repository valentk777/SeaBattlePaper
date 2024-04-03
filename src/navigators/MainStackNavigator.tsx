import React, { createNativeStackNavigator } from "@react-navigation/native-stack"
import CreateGameScreen from "../screens/game/createGameScreen";
import HomeScreen from "../screens/homeScreen";
import { StyleSheet } from 'react-native';
import { AppTheme } from '../styles/themeModels';
import { useTheme } from "../hooks/useTheme";
import { LogOutButton } from "../components/LogOutButton";
import { BackButton } from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import { Game } from "../entities/game";

export type MainStackParamList = {
  Home: {};
  CreateGame: {};
  JoinGame: { game: Game, isHost: boolean };
  PlayGame: { gameId: string, isHost: boolean };
  User: {};
};

const MainStack = createNativeStackNavigator<MainStackParamList>()

const MainStackNavigator = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const navigation = useNavigation();

  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
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
          title: '',
          headerTransparent: true,
          headerStyle: { backgroundColor: 'rgba(0, 0, 0, 0.0)' },
          headerLeft: () => (<BackButton onPress={() => navigation.goBack()} />),
        }}
      />
      {/* <MainStack.Screen
        name="JoinGame"
        component={JoinGameScreen}
        options={{
          title: '',
          headerTransparent: true,
          headerStyle: { backgroundColor: 'rgba(0, 0, 0, 0.0)' },
          headerLeft: () => (<BackButton onPress={() => navigation.goBack()} />),
        }}
      />
      <MainStack.Screen
        name="PlayGame"
        component={PlayGameScreen}
        options={{
          title: '',
          headerTransparent: true,
          headerStyle: { backgroundColor: 'rgba(0, 0, 0, 0.0)' },
          headerLeft: () => (<BackButton onPress={() => navigation.navigate("Home")} />),
        }}
      /> */}
      {/* <MainStack.Screen
        name="User"
        component={UserScreen}
        options={{
          title: '',
          headerTransparent: true,
          headerStyle: { backgroundColor: 'rgba(0, 0, 0, 0.0)' },
          headerLeft: () => (<BackButton onPress={() => navigation.goBack()} />),
          headerRight: () => (<LogOutButton />),
        }}
      /> */}
    </MainStack.Navigator>
  )
}

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    header: {
      backgroundColor: theme.colors.secondary,
    },
    headerTitle: {
      fontFamily: theme.fonts.semiBold,
      fontSize: 20,
      color: theme.colors.tertiary,
    }
  });

  return styles;
};

export default MainStackNavigator
