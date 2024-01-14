import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { UserAccount } from '../entities/user';
import { useTheme } from '../hooks/useTheme';
import { MainStackParamList } from '../navigators/MainStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import gameService from '../services/gameService';
import { Game } from '../entities/game';
import { ProgressStatus } from '../entities/progressStatus';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import createStyles from './homeScreenStyles';
import { Background } from '../components/Background/BackgroundImage';

type HomeScreenProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const CELL_COUNT = 4;

  const [gameId, onChangeGameId] = useState('');
  const ref = useBlurOnFulfill({ value: gameId, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: gameId,
    setValue: onChangeGameId,
  });

  const user = useCurrentUser() as UserAccount;

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

    const isJoinToGameSuccessful = await gameService.tryJoinToGame(user.id, existingGame);

    if (!isJoinToGameSuccessful) {
      alert("Cannot join to the game");
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
  };

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.title}>Sea Battle Paper</Text>
      </View>
      <View style={styles.options}>
        <View style={styles.hostOptions}>
          <TouchableOpacity style={styles.button} onPress={onCreateGamePress}>
            <Text style={styles.buttonText}>START NEW GAME</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orArea}>
          <Text style={styles.orText}>--- OR ---</Text>
        </View>
        <View style={styles.joinOptions}>
          <CodeField
            ref={ref}
            {...props}
            value={gameId}
            onChangeText={onChangeGameId}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
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

export default HomeScreen;