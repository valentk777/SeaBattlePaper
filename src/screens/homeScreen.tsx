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
import { PlayerPosition } from '../entities/playerPosition';

type HomeScreenProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

const CELL_COUNT = 4;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const styles = createStyles();

  const [gameId, setGameId] = useState('');
  // const [activeGame, setActiveGame] = useState({ id: "" } as Game);
  const user = useCurrentUser();

  const ref = useBlurOnFulfill({ value: gameId, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: gameId, setValue: setGameId });

  const onStartNewGamePress = async () => {
    try {
      const gameTemplate = gameService.createGameTemplate(user);
      const newGame = await gameService.createNewGameWithStoring(gameTemplate);

      navigation.navigate('CreateGame', { game: newGame });
    } catch (error) {
      console.error('Error creating a new game:', error);
    }
  };

  const onJoinGamePress = async () => {
    const gameIdInt = parseInt(gameId, 10);

    if (gameId == '' || gameIdInt < 1000) {
      return;
    }

    const candidateGame: Game = await remoteGameService.getGame(gameId);

    if (candidateGame === undefined || candidateGame.id != gameId) {
      console.log("Game does not exist or game id is not match");

      return;
    }

    const isGameValid = await gameService.validateGame(candidateGame, user.id);

    if (!isGameValid) {
      console.log("cannot join to game. game is not valid");

      return;
    }

    const playerPosition = gameService.getPlayerPosition(candidateGame, user.id)

    if (candidateGame.status == GameProgress.Started) {
      // await gameService.handlePlayGame(candidateGame);

      // navigation.navigate('PlayGame', { gameId: game.id, isHost: gameService.isHost(game, user.id) });

      // return;
    }
    else if (candidateGame.status == GameProgress.Created || candidateGame.status == GameProgress.PlayerMatched) {
      if (playerPosition == PlayerPosition.PlayerA) {
        // host rejoin game
        navigation.navigate('CreateGame', { game: candidateGame });
      }
      else if (candidateGame.playerB?.id === user.id) {
        // second player rejoin the game
        // await gameService.createNewGameWithStoring(candidateGame);

        //TODO: maybe it is better to calculate the player board here and then pass as parameter?
        navigation.navigate('CreateGame', { game: candidateGame });
      } else {
        // new second player
        const playerB = gameService.createPlayerTemplate(user);
        const updatedGame = { ...candidateGame, playerB: playerB, status: GameProgress.PlayerMatched } as Game;

        await gameService.updateGame(updatedGame);

        navigation.navigate('CreateGame', { game: updatedGame });
      }
    } else {
      console.log("Game already ended");
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
          <PaperAreaButton
            areaStyle={styles.areaStyle}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.buttonText}
            onPress={async () => await onStartNewGamePress()}
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