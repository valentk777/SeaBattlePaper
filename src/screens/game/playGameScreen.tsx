import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
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

type PlayGameScreenProps = NativeStackScreenProps<MainStackParamList, 'PlayGame'>;

export const PlayGameScreen = ({ navigation, route }: PlayGameScreenProps) => {
  const styles = createStyles();

  const { gameId, player, playerPosition } = route.params;

  const [activeGame, setActiveGame] = useState({ id: gameId } as Game);
  const [isMyTurn, setIsMyTurn] = useState(activeGame.turn === playerPosition);
  const [isMarkingMode, setIsMarkingMode] = useState(false);

  const [myBoard, setMyBoard] = useState(shipBoardService.generateNewShipBoard());
  const [opponentBoard, setOpponentBoard] = useState(shipBoardService.generateNewShipBoard());
  const [myMarkedShips, setMyMarkedShips] = useState(player.markedShips);

  useEffect(() => {
    const createNewGameAsync = async () => {
      try {
        setOpponentBoard(oldBoard => {
          return oldBoard.map((item) => player.ships.some(x => x == item.location) ? { ...item, isShip: true } : item);
        });

        setMyBoard(oldBoard => {
          return oldBoard.map((item) => {
            if (player.attackedShips.some(x => x == item.location)) {
              return { ...item, status: BoardItemStatus.Attacked };
            }

            if (myMarkedShips.some(x => x == item.location)) {
              return { ...item, status: BoardItemStatus.Marked };
            }

            return item;
          });
        });

        await gameService.getGameWithTracking(gameId, onRemoteGameUpdated);
      } catch (error) {
        console.error('Error creating a new game:', error);
      }
    };

    createNewGameAsync();
  }, []);

  const onRemoteGameUpdated = async (game: Game) => {
    console.log("Ka gavau");
    console.log(game);

    if (game?.playerB === undefined) {
      console.log("Game is not started");

      return;
    }

    const opponent = playerPosition === PlayerPosition.PlayerA ? game.playerB : game.playerA;

    // this one could be done once.
    setMyBoard((oldBoard) => {
      return oldBoard.map((item) => opponent?.ships?.some(x => x == item.location) ? { ...item, isShip: true } : item);
    });

    setOpponentBoard((oldBoard) => {
      return oldBoard.map((item) => opponent?.attackedShips?.some(x => x == item.location) ? { ...item, status: BoardItemStatus.Attacked } : item);
    });

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    setActiveGame((oldGame) => game);
    setIsMyTurn((oldIsYourTurn) => game.turn === playerPosition);
    checkIfWon(game);
  };

  // Move to service
  const checkIfWon = (game: Game) => {
    //TODO: stip the game if all ships defeated
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

    setIsMyTurn((old) => selectedBox.isShip === true);

    await updateGame(selectedBox);
  };

  const updateGame = async (selectedBox: BoardItem) => {
    console.log("updateGame - before update");
    console.log(activeGame);

    if (playerPosition === PlayerPosition.PlayerA) {
      const updatedGame = {
        ...activeGame,
        turn: selectedBox.isShip === true ? PlayerPosition.PlayerA : PlayerPosition.PlayerB,
        playerA: { ...activeGame.playerA, attackedShips: [...activeGame.playerA.attackedShips, selectedBox.location] }
      }

      await gameService.updateGame(updatedGame);

      console.log("updateGame - after update");
      console.log(updatedGame);
    } else {
      const updatedGame = {
        ...activeGame,
        turn: selectedBox.isShip === true ? PlayerPosition.PlayerB : PlayerPosition.PlayerA,
        playerB: { ...activeGame.playerB, attackedShips: [...activeGame.playerB.attackedShips, selectedBox.location] }
      }

      await gameService.updateGame(updatedGame);

      console.log("updateGame - after update");
      console.log(updatedGame);
    }
  }

  const renderMainGame = () => (
    <View style={styles.mainGame} >
      <View style={styles.empty} >
        <ActiveGameHeader game={activeGame} navigation={navigation} isYourTurn={isMyTurn} isMarkingMode={isMarkingMode} onMarkingMode={() => { setIsMarkingMode(false) }} />
      </View>
      <View style={styles.competitorShipBoardContainer}>
        <Board board={opponentBoard} renderItem={(item) => (<BoardOpponentGameTile item={item} />)} disabled={!isMyTurn} />
      </View>
      <View style={styles.myShipBoardContainer}>
        <Board board={myBoard} renderItem={(item) => (<BoardMyGameTile item={item} onPress={async () => await onBoardTilePress(item)} />)} disabled={!isMyTurn} />
      </View>
    </View>
  );

  const renderSpinningWheel = () => (
    <View style={styles.spinningWheel}>
      <Text style={styles.spinningWheelText}>Another player is not ready</Text>
      <Text style={styles.spinningWheelText}>Game ID: {gameId}</Text>
    </View>
  );

  const renderScreenChange = () => {
    if (activeGame?.status === GameProgress.Started) {
      return (
        renderMainGame()
      )
    } else {
      return (
        renderSpinningWheel()
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
    spinningWheel: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
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
    empty: {
      flex: 1,
    },
  });

  return styles;
};

export default PlayGameScreen;

