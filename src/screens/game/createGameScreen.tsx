import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
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
import { PlayerPosition } from '../../entities/playerPosition';
import BoardSetupTile from '../../components/Board/BoardSetupTile';
import { Game } from '../../entities/game';
import { GameProgress } from '../../entities/gameProgress';

type CreateGameScreenProps = NativeStackScreenProps<MainStackParamList, 'CreateGame'>;

export const CreateGameScreen = ({ navigation, route }: CreateGameScreenProps) => {
  const styles = createStyles();

  const { game, player, playerPosition } = route.params;
  console.log("CreateGameScreen initial game", game);
  console.log("CreateGameScreen initial player", player);
  console.log("CreateGameScreen initial playerPosition", playerPosition);

  const [activeGame, setActiveGame] = useState(game);
  const [currentBoard, setCurrentBoard] = useState(shipBoardService.generateNewShipBoard());
  const [ships, setShips] = useState(player.ships);
  // const [callbackFunction, setCallbackFunction] = useState(() => {} );

  useEffect(() => {
    const loadGameBoard = async () => {
      setCurrentBoard(oldBoard => {
        return oldBoard.map((item) => ships.some(x => x == item.location) ? { ...item, isShip: true } : item);
      });

      await gameService.getGameWithTracking(game.id, onRemoteGameUpdated);
    };

    loadGameBoard();
  }, []);
  
  const onRemoteGameUpdated = async (game: Game) => {
    // Alert.alert("Game updated");
    setActiveGame(game);
  };

  const onBoardTilePress = (selectedBox: BoardItem) => {
    if (selectedBox.isShip === false) {
      setShips(oldArray => [...oldArray, selectedBox.location]);
    } else {
      setShips(oldArray => oldArray.filter(x => x !== selectedBox.location));
    }

    setCurrentBoard(oldBoard => {
      return oldBoard.map((item) => item.location === selectedBox.location ? { ...item, isShip: !item.isShip } : item);
    });
  };

  const onStartGamePress = async () => {
    const playerBoard = { ...player, ships: ships, status: PlayerStatus.Started };
    const updatedGame = playerPosition === PlayerPosition.PlayerA
    ? { ...activeGame, playerA: playerBoard, status: activeGame?.playerB?.status === PlayerStatus.Started ? GameProgress.Started : activeGame.status } 
    : { ...activeGame, playerB: playerBoard, status: activeGame?.playerA?.status === PlayerStatus.Started ? GameProgress.Started : activeGame.status } 
    
    await gameService.updateGame(updatedGame);
    // await gameService.stopGameTracking(game.id, callbackFunction);

    navigation.navigate('PlayGame', { gameId: game.id, player: playerBoard, playerPosition: playerPosition  });
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
            PlayerA: {activeGame.playerA?.isActive === true ? "Active" : "Inactive"}
          </Text>
        </View>
        <View>
          <Text style={styles.activePlayersText}>
            PlayerB: {activeGame?.playerB?.isActive === true ? "Active" : "Inactive"}
          </Text>
        </View>
      </View>
      <View style={styles.shipBoardContainer}>
        <Board board={currentBoard} renderItem={(item) => (<BoardSetupTile item={item} onPress={() => onBoardTilePress(item)} />)} disabled={false} />
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