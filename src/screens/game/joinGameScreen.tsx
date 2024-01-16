import React, { useEffect, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { UserAccount } from '../../entities/user';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigators/MainStackNavigator';
import { Background } from '../../components/Background/BackgroundImage';
import { Game } from '../../entities/game';
import { PlayerStatus } from '../../entities/playerStatus';
import gameService from '../../services/gameService';
import createStyles from './gameSetupStyles';
import { PaperArea } from '../../components/Background/PaperArea';
import { PaperAreaButton } from '../../components/ButtonWrapper/PaperAreaButton';
import { ShipsBoard } from '../../components/Game/ShipsBoard';
import { ActiveGameContext } from '../../hooks/useActiveGame';

type JoinGameScreenProps = NativeStackScreenProps<MainStackParamList, 'JoinGame'>;

export const JoinGameScreen = ({ navigation, route }: JoinGameScreenProps) => {
  const styles = createStyles();

  const { game } = route.params;

  const [activeGame, onChangeActiveGame] = useState(game);

  const updateGame = (value: Game) => {
    console.log("UPDATE GAME");
    onChangeActiveGame(value);
  }

  // const user = useCurrentUser() as UserAccount;

  // useEffect(() => {
  //   // store provided game to local storage


  //   // const joinGameAsync = async () => {
  //   //   try {
  //   //     await gameService.createNewGame(user, onChangeActiveGame);
  //   //   } catch (error) {
  //   //     console.error('Error creating a new game:', error);
  //   //   }
  //   // };

  //   // joinGameAsync();
  // }, [activeGame]);

  const onStartGame = () => {
    activeGame.playerA.status = PlayerStatus.Started;

    // store game to remote storage.
  }

  const values = useMemo(() => ({ game: activeGame, updateGame: updateGame }), [activeGame]);

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.empty} />
      <ActiveGameContext.Provider value={values}>
        <View style={styles.newGameContainer}>
          <PaperArea
            areaStyle={styles.areaStyle}
            componentStyle={styles.componentStyle}
          >
            <Text style={styles.shareText}>Share this number with another player</Text>
            <Text style={styles.activeGameIdText}>{activeGame.id}</Text>
          </PaperArea>
        </View>
        <View style={styles.gamePlayers}>
          <View>
            <Text style={styles.activePlayersText}>
              PlayerA: {activeGame.playerA?.id !== undefined ? "Joined" : "NotFound"}
            </Text>
          </View>
          <View>
            <Text style={styles.activePlayersText}>
              PlayerB: {activeGame.playerB?.id !== undefined ? "Joined" : "NotFound"}
            </Text>
          </View>
        </View>
        <View style={styles.shipBoardContainer}>
          <ShipsBoard />
        </View>
        <View style={styles.empty} />
        <PaperAreaButton
          areaStyle={styles.startButtonArea}
          buttonStyle={styles.startButton}
          textStyle={styles.startButtonText}
          text="Start game"
          onPress={onStartGame}
        />
        <View style={styles.empty} />
      </ActiveGameContext.Provider>
    </View>
  );
};

export default JoinGameScreen;

