import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { MainStackParamList } from '../../navigators/MainStackNavigator';
import { BoardItem } from '../../entities/boardItem';
import shipBoardService from '../../services/shipBoardService';
import createStyles from './gameSetupStyles';
import { Background } from '../../components/Background/BackgroundImage';
import { PaperAreaButton } from '../../components/ButtonWrapper/PaperAreaButton';
import Board from '../../components/Board/Board';
import { PaperArea } from '../../components/Background/PaperArea';
import { PlayerStatus } from '../../entities/playerStatus';
import gameService from '../../services/gameService';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { PlayerPosition } from '../../entities/playerPosition';

type CreateGameScreenProps = NativeStackScreenProps<MainStackParamList, 'CreateGame'>;

export const CreateGameScreen = ({ navigation, route }: CreateGameScreenProps) => {
  const styles = createStyles();

  const { game } = route.params;

  const user = useCurrentUser();
  const playerPosition = gameService.getPlayerPosition(game, user.id)
  const [currentBoard, setCurrentBoard] = useState(shipBoardService.generateNewShipBoard());
  const [ships, setShips] = useState(playerPosition === PlayerPosition.PlayerA ? game.playerA.ships : game.playerB.ships);

  useEffect(() => {
    const loadGameBoard = async () => {
      setCurrentBoard(oldBoard => {
        return oldBoard.map((item) => ships.some(x => x == item.location) ? { ...item, isShip: true } : item);
      });
    };

    loadGameBoard();
  }, []);

  const onBoardTilePress = (selectedBox: BoardItem) => {

    if (selectedBox.isShip === false) {
      setShips(oldArray => [...oldArray, selectedBox.location]);
    } else {
      setShips(oldArray => oldArray.filter(x => x !== selectedBox.location));
    }

    setCurrentBoard(oldBoard => {
      return oldBoard.map((item) => {
        if (item.location === selectedBox.location) {
          return { ...item, isShip: !item.isShip };
        } else {
          return item;
        }
      });
    });
  };

  const onStartGamePress = async () => {

    if (playerPosition === PlayerPosition.PlayerA) {
      await gameService.updatePlayer(game.id, { ...game.playerA, ships: ships, status: PlayerStatus.Started }, playerPosition);
    } else {
      await gameService.updatePlayer(game.id, { ...game.playerB, ships: ships, status: PlayerStatus.Started }, playerPosition);
    }

    // navigation.navigate('PlayGame', {  });
  }

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.empty} />
      <View style={styles.newGameContainer}>
        <PaperArea
          areaStyle={styles.areaStyle}
          componentStyle={styles.componentStyle}
        >
          <Text style={styles.shareText}>Share this number with another player</Text>
          <Text style={styles.activeGameIdText}>{game.id}</Text>
        </PaperArea>
      </View>
      <View style={styles.gamePlayers}>
        <View>
          <Text style={styles.activePlayersText}>
            PlayerA: {game.playerA?.id !== undefined ? "Joined" : "NotFound"}
          </Text>
        </View>
        <View>
          <Text style={styles.activePlayersText}>
            PlayerB: {game?.playerB?.id !== undefined ? "Joined" : "NotFound"}
          </Text>
        </View>
      </View>
      <View style={styles.shipBoardContainer}>
        <Board board={currentBoard} onPress={onBoardTilePress} disabled={false} />
      </View>
      <View style={styles.empty} />
      <PaperAreaButton
        areaStyle={styles.startButtonArea}
        buttonStyle={styles.startButton}
        textStyle={styles.startButtonText}
        text="Start game"
        onPress={async () => await onStartGamePress()}
      />
      <View style={styles.empty} />
    </View>
  );
};

export default CreateGameScreen;