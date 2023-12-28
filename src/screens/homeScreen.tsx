import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { UserAccount } from '../entities/user';
import { useTheme } from '../hooks/useTheme';
import { AppTheme } from '../styles/themeModels';
import { useTranslation } from 'react-i18next';
import { useTranslations } from '../hooks/useTranslations';
import { MainStackParamList } from '../navigators/MainStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import gameService from '../services/gameService';
import { Game } from '../entities/game';
import { ProgressStatus } from '../entities/progressStatus';
import constants from '../constants/constants';

type HomeScreenProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [gameId, onChangeGameId] = useState('');

  const user = useCurrentUser() as UserAccount;
  const { signOut } = useAuth();
  const { t } = useTranslation('user-screen')
  const { changeLanguage, tTime } = useTranslations();

  const onCreateGamePress = () => {
    navigation.navigate('CreateGame');
  };

  const onJoinGamePress = async () => {

    const gameIdInt = parseInt(gameId, 10);

    if (gameId == '' || gameIdInt < 1000) {
      return;
    }

    const existingGame = await gameService.getGameIfPossible(user.id, gameId) as Game;

    if (existingGame.id != gameId) {
      return;
    }

    if (existingGame.status == ProgressStatus.Created || existingGame.status == ProgressStatus.PlayerMatched) {
      navigation.navigate('GameSetup');
      return;
    }

    if (existingGame.status == ProgressStatus.Started) {
      navigation.navigate('PlayGame');
      return;
    }

    // validate
    alert("Game id is not valid");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.title}>Sea Battle Paper</Text>
      </View>
      <View style={styles.options}>
        <View style={styles.hostOptions}>
          <TouchableOpacity style={styles.button} onPress={onCreateGamePress}>
            <Text style={styles.buttonText}>CREATE the Game</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orArea}>
          <Text style={styles.orText}>--- OR ---</Text>
        </View>
        <View style={styles.joinOptions}>
          <Text style={styles.buttonText}>JOIN the Game</Text>
          <TextInput
            style={styles.textbox}
            // placeholder={t("title-placeholder")}
            onChangeText={onChangeGameId}
            value={gameId}
            keyboardType="numeric"
          // placeholderTextColor={theme.colors.secondary}
          />
          <TouchableOpacity style={styles.button} onPress={async () => await onJoinGamePress()}>
            <Text style={styles.buttonText}>JOIN</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.empty} />
    </View >
  );
};

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      height: constants.screenHeight,
      backgroundColor: theme.colors.canvasInverted,
    },
    titleContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontFamily: theme.fonts.bold,
      color: theme.colors.primary,
      fontSize: 25,
    },
    options: {
      flex: 3,
      alignItems: 'center',
    },
    hostOptions: {
      flex: 2,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
      fontFamily: theme.fonts.medium,
      color: theme.colors.primary,
    },
    orArea: {
      flex: 1,
      justifyContent: "center",
    },
    orText: {
      fontFamily: theme.fonts.medium,
      color: theme.colors.primary,
      justifyContent: "center",
    },
    joinOptions: {
      flex: 2,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textbox: {
      justifyContent: "center",
      backgroundColor: theme.colors.canvas,
      margin: 10,
      width: '80%',
    },
    button: {
      backgroundColor: theme.colors.canvas,
      width: '80%',
      height: 45,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    empty: {
      flex: 4,
    }
  });

  return styles;
};

export default HomeScreen;

