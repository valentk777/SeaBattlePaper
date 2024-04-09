import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigators/MainStackNavigator';
import { Background } from '../../components/Background/BackgroundImage';
import { Game } from '../../entities/game';
import gameService from '../../services/gameService';
import { GameProgress } from '../../entities/gameProgress';
import Board from '../../components/Board/Board';
import { BoardItem } from '../../entities/boardItem';
import { PlayerPosition } from '../../entities/playerPosition';
import shipBoardService from '../../services/shipBoardService';
import BoardMyGameTile from '../../components/Board/BoardMyGameTile';
import BoardOpponentGameTile from '../../components/Board/BoardOpponentGameTile';
import { BoardItemStatus } from '../../entities/boardItemStatus';
import { ActiveGameHeader } from '../../navigators/ActiveGameHeader';
import constants from '../../constants/constants';
import { PlayerStatus } from '../../entities/playerStatus';

type PlayGameScreenProps = NativeStackScreenProps<MainStackParamList, 'PlayGame'>;

export const PlayGameScreen = ({ navigation, route }: PlayGameScreenProps) => {
  const styles = createStyles();

  const { gameId, player, playerPosition } = route.params;

  const [activeGame, setActiveGame] = useState({ id: gameId, status: GameProgress.Created } as Game);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [isMarkingMode, setIsMarkingMode] = useState(false);

  const [myBoard, setMyBoard] = useState(shipBoardService.generateNewShipBoard());
  const [opponentBoard, setOpponentBoard] = useState(shipBoardService.generateNewShipBoard());
  const [myMarkedShips, setMyMarkedShips] = useState(player.markedShips);

  useEffect(() => {
    const createNewGameAsync = async () => {
      try {
        setOpponentBoard(oldBoard => {
          return updateShipBoardStatus(oldBoard, player.ships);
        });

        setMyBoard(oldBoard => {
          return updateAttackedBoardStatus(oldBoard, player.attackedShips, myMarkedShips);
        });

        await gameService.getGameWithTracking(gameId, onRemoteGameUpdated);
      } catch (error) {
        console.error('Error creating a new game:', error);
      }
    };

    createNewGameAsync();
  }, []);

  const updateShipBoardStatus = (oldBoard, ships) => {
    return oldBoard.map((item) => ships.some(x => x == item.location) ? { ...item, isShip: true } : { ...item, isShip: false });
  }

  const updateAttackedBoardStatus = (oldBoard, attacked, marked) => {
    return oldBoard.map((item) => {
      if (attacked.some(x => x == item.location)) {
        return { ...item, status: BoardItemStatus.Attacked };
      }

      if (marked && marked.some(x => x == item.location)) {
        return { ...item, status: BoardItemStatus.Marked };
      }

      return { ...item, status: BoardItemStatus.NotSelected };
    });
  }

  const onRemoteGameUpdated = async (game: Game) => {
    console.log("Ka gavau");
    console.log(game);

    setActiveGame(() => game);
    setIsMyTurn(() => game.turn === playerPosition);

    if (game?.playerB === undefined) {
      console.log("Game is not started");

      return;
    }

    const opponent = playerPosition === PlayerPosition.PlayerA ? game.playerB : game.playerA;

    // this one could be done once.
    setMyBoard((oldBoard) => {
      return updateShipBoardStatus(oldBoard, opponent.ships);
    });

    setOpponentBoard((oldBoard) => {
      return updateAttackedBoardStatus(oldBoard, opponent.attackedShips, null);
    });

    // checkIfWon(game);
  };

  // Move to service
  const getCurrentGameProgress = (game: Game) => {
    if (game.playerA.ships.every(x => game.playerB.attackedShips.includes(x))) {
      return GameProgress.WonPlayerB;
    } else if (game.playerB.ships.every(x => game.playerA.attackedShips.includes(x))) {
      return GameProgress.WonPlayerA;
    }

    return game.status;
  }

  const onBoardTilePress = async (selectedBox: BoardItem) => {
    console.log("selectedBox");
    console.log(selectedBox);

    if (isMarkingMode) {
      // Alert.alert("edit mode");
      setMyMarkedShips((oldArray) => {
        return [...oldArray, selectedBox.location]
      });

      setMyBoard((oldBoard) => {
        return oldBoard.map((item) => item.location === selectedBox.location ? { ...item, status: BoardItemStatus.Marked } : item);
      });

      return;
    }

    setMyBoard(oldBoard => {
      return oldBoard.map((item) => item.location === selectedBox.location ? { ...item, status: BoardItemStatus.Attacked } : item);
    });

    // setIsMyTurn(() => selectedBox.isShip === true);

    await updateGame(selectedBox);
  };

  const updateGame = async (selectedBox: BoardItem) => {
    const gameStatus = getCurrentGameProgress(activeGame);

    const updatedGame = playerPosition === PlayerPosition.PlayerA
      ? {
        ...activeGame,
        status: gameStatus,
        turn: selectedBox.isShip === true ? PlayerPosition.PlayerA : PlayerPosition.PlayerB,
        playerA: {
          ...activeGame.playerA,
          attackedShips: [...activeGame.playerA.attackedShips, selectedBox.location],
          markedShips: myMarkedShips,
          //  status: gameStatus === GameProgress.WonPlayerA ? PlayerStatus.WON
        }
      } as Game
      : {
        ...activeGame,
        status: gameStatus,
        turn: selectedBox.isShip === true ? PlayerPosition.PlayerB : PlayerPosition.PlayerA,
        playerB: {
          ...activeGame.playerB,
          attackedShips: [...activeGame.playerB.attackedShips, selectedBox.location],
          markedShips: myMarkedShips
        }
      } as Game;

    await gameService.updateGame(updatedGame);
  }

  const renderEndGame = () => {
    const isGameEnded = activeGame?.status == GameProgress.WonPlayerA || activeGame?.status == GameProgress.WonPlayerB;
    const isYouWon = (playerPosition === PlayerPosition.PlayerA && GameProgress.WonPlayerA) || (playerPosition === PlayerPosition.PlayerB && GameProgress.WonPlayerB);

    if (isGameEnded && isYouWon) {
      return (
        <View style={styles.endGame}>
          <Text style={styles.endGameText}>YOU WON!</Text>
        </View>
      )
    } else if (isGameEnded && !isYouWon) {
      return (
        <View style={styles.endGame}>
          <Text style={styles.endGameText}>TRY NEXT TIME!</Text>
        </View>
      )
    } else {
      return null;
    }
  };

  const renderSpinningWheel = () => (
    <View style={styles.spinningWheelArea}>
      <ActivityIndicator size={200} color={styles.spinningWheel.color} />
      <Text style={styles.spinningWheelText}>Another player is not ready</Text>
      <Text style={styles.spinningWheelText}>Game ID: {gameId}</Text>
    </View>
  );

  const renderMainGame = () => (
    <View style={styles.mainGame} >
      <View style={styles.activeGameHeader} >
        <ActiveGameHeader game={activeGame} navigation={navigation} isYourTurn={isMyTurn} isMarkingMode={isMarkingMode} onMarkingMode={() => { setIsMarkingMode(false) }} />
      </View>
      {renderEndGame()}
      <View style={styles.competitorShipBoardContainer}>
        <Board board={opponentBoard} renderItem={(item) => (<BoardOpponentGameTile item={item} />)} disabled={!isMyTurn} />
      </View>
      <View style={styles.myShipBoardContainer}>
        <Board board={myBoard} renderItem={(item) => (<BoardMyGameTile item={item} onPress={async () => await onBoardTilePress(item)} />)} disabled={!isMyTurn} />
      </View>
    </View>
  );

  const renderScreenChange = () => {
    console.log(activeGame?.status);

    if (activeGame?.status === GameProgress.Created || activeGame?.status === GameProgress.PlayerMatched) {
      return (
        renderSpinningWheel()
      )
    } else if (activeGame?.status === GameProgress.Started || activeGame.status == GameProgress.WonPlayerA || activeGame.status == GameProgress.WonPlayerB) {
      return (
        renderMainGame()
      )
    }
  };

  return (
    <View style={styles.container}>
      <Background />
      {renderScreenChange()}
    </View>
  );
};

const createStyles = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      height: '100%',
    },
    mainGame: {
      height: '100%',
    },
    spinningWheelArea: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    spinningWheel: {
      color: theme.colors.tertiary,
    },
    spinningWheelText: {
      fontSize: 20,
      fontFamily: theme.fonts.bold,
      color: theme.colors.tertiary,
      textAlign: 'center'
    },
    competitorShipBoardContainer: {
      flex: 5,
      justifyContent: 'center',
      alignItems: 'center',
      pointerEvents: 'none',
    },
    myShipBoardContainer: {
      flex: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeGameHeader: {
      flex: 1,
      zIndex: 100
    },
    endGame: {
      height: constants.SCREEN_HEIGHT,
      width: constants.SCREEN_WIDTH,
      backgroundColor: 'rgba(0, 0, 0, 0.50)',
      position: 'absolute',
      justifyContent: 'center',
      zIndex: 1,
    },
    endGameText: {
      fontSize: 35,
      fontFamily: theme.fonts.bold,
      color: theme.colors.tertiary,
      alignSelf: 'center',
    },
  });

  return styles;
};

export default PlayGameScreen;

