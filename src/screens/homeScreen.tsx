import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { MainStackParamList } from '../navigators/MainStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import gameService from '../services/gameService';
import { Game } from '../entities/game';
import { GameProgress } from '../entities/gameProgress';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import createStyles from './homeScreenStyles';
import { Background } from '../components/Background/BackgroundImage';
import { PaperAreaButton } from '../components/ButtonWrapper/PaperAreaButton';
import { PaperArea } from '../components/Background/PaperArea';
import remoteGameService from '../services/remoteGameService';

type HomeScreenProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

const CELL_COUNT = 4;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const styles = createStyles();

  const [gameId, setGameId] = useState('');
  const user = useCurrentUser();

  const ref = useBlurOnFulfill({ value: gameId, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: gameId, setValue: setGameId });

  const onStartNewGamePress = () => {
    navigation.navigate('CreateGame');
  };

  const onJoinGamePress = async () => {
    // const gameIdInt = parseInt(gameId, 10);

    // if (gameId == '' || gameIdInt < 1000) {
    //   return;
    // }

    // const candidateGame: Game = await remoteGameService.getGame(gameId);

    // if (candidateGame === undefined || candidateGame.id != gameId) {
    //   Alert.alert("Game does not exist or game id is not match");
    //   return;
    // }

    // const isGameValid = await gameService.validateGame(candidateGame, user.id);

    // if (!isGameValid) {
    //   Alert.alert("cannot join to game. game is not valid");
    //   return;
    // }

    // if (candidateGame.status == GameProgress.Started) {
    //   await gameService.handlePlayGame(candidateGame);

    //   navigation.navigate('PlayGame', { gameId: game.id, isHost: gameService.isHost(game, user.id) });

    //   return;
    // }

    // if (candidateGame.status == GameProgress.Created || candidateGame.status == GameProgress.PlayerMatched) {
    //   await gameService.handleJoinToGame(candidateGame);

    //   navigation.navigate('JoinGame', { game: candidateGame, isHost: isHost });

    // }
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
          <PaperAreaButton
            areaStyle={styles.areaStyle}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.buttonText}
            onPress={onStartNewGamePress}
            text={'START NEW GAME'}
          />
        </View>
        <View style={styles.orArea}>
          <Text style={styles.orText}>--- OR ---</Text>
        </View>
        <View style={styles.joinOptions}>
          <CodeField
            ref={ref}
            {...props}
            value={gameId}
            onChangeText={setGameId}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <PaperArea
                key={index}
                areaStyle={styles.inputArea}
                componentStyle={styles.inputComponent}
              >
                <Text
                  key={index}
                  style={[styles.inputText, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </PaperArea>
            )}
          />
          <PaperAreaButton
            areaStyle={styles.areaStyle}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.buttonText}
            onPress={async () => await onJoinGamePress()}
            text={'JOIN'}
          />
        </View>
      </View>
      <View style={styles.empty} />
    </View >
  );
};

export default HomeScreen;