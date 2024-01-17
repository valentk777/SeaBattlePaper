import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { UserAccount } from '../entities/user';
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
import { PlayerStatus } from '../entities/playerStatus';

type HomeScreenProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const styles = createStyles();
  const CELL_COUNT = 4;

  const [gameId, onChangeGameId] = useState('');
  const ref = useBlurOnFulfill({ value: gameId, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: gameId,
    setValue: onChangeGameId,
  });

  const user = useCurrentUser() as UserAccount;

  const handlePlayGame = (game: Game) => {
    // TODO: store game to local storage + update game status
    navigation.navigate('PlayGame', {gameId: game.id, isHost: gameService.isHost(game, user.id)});
  }

  const handleJoinToGame = async (game: Game) => {
    const isHost = gameService.isHost(game, user.id);

    if (!isHost) {
      if (game?.playerB?.status != PlayerStatus.Joined) {
        const playerB = gameService.createNewPlayerTemplate(user);

        const updatedGame = { ...game, playerB: playerB, status: GameProgress.PlayerMatched } as Game;

        await gameService.updateGameInLocalStorage(updatedGame);
        await gameService.updateGameInRemote(updatedGame);
      }
    }

    navigation.navigate('JoinGame', {game: game, isHost:  isHost});
  }

  const onCreateGamePress = () => {
    navigation.navigate('CreateGame');
  };

  const onJoinGamePress = async () => {

    const gameIdInt = parseInt(gameId, 10);

    if (gameId == '' || gameIdInt < 1000) {
      return;
    }

    const candidateGame: Game = await gameService.getRemoteGameById(gameId) as Game;

    if (candidateGame === undefined || candidateGame.id != gameId) {
      console.log("Game does not exist or game id is not match");
      alert("Game does not exist");
      return;
    }

    const isGameValid = gameService.validateGame(candidateGame, user.id);

    if (!isGameValid) {
      console.log("cannot join to game. game is not valid");
      alert("Game does not exist");
      return;
    }

    if (candidateGame.status == GameProgress.Started) {
      handlePlayGame(candidateGame);
      return;
    }

    if (candidateGame.status == GameProgress.Created || candidateGame.status == GameProgress.PlayerMatched) {
      await handleJoinToGame(candidateGame);
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
          <PaperAreaButton
            areaStyle={styles.areaStyle}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.buttonText}
            onPress={onCreateGamePress}
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
            onChangeText={onChangeGameId}
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