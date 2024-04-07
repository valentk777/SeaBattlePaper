import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
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
import { PaperArea } from '../../components/Background/PaperArea';

type PlayGameScreenProps = NativeStackScreenProps<MainStackParamList, 'PlayGame'>;

export const PlayGameScreen = ({ navigation, route }: PlayGameScreenProps) => {
  const styles = createStyles();

  const { gameId, playerBoard, playerPosition } = route.params;

  const [activeGame, setActiveGame] = useState({ id: gameId } as Game);
  const [isYourTurn, setIsYourTurn] = useState(activeGame.turn === playerPosition);
  const [isMarkerMode, setIsMarkerMode] = useState(false);

  const [myBoard, setMyBoard] = useState(shipBoardService.generateNewShipBoard());
  const [opponentBoard, setOpponentBoard] = useState(shipBoardService.generateNewShipBoard());

  const [myAttackedShips, setMyAttackedShips] = useState(playerBoard.attackedShips);
  const [myMarkedShips, setMyMarkedShips] = useState(playerBoard.markedShips);

  useEffect(() => {
    const createNewGameAsync = async () => {
      try {
        console.log("try to create game");

        setOpponentBoard(oldBoard => {
          return oldBoard.map((item) => playerBoard.ships.some(x => x == item.location) ? { ...item, isShip: true } : item);
        });

        setMyBoard(oldBoard => {
          return oldBoard.map((item) => {
            if (myAttackedShips.some(x => x == item.location)) {
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
    Alert.alert("Remote game updated")
    const opponent = playerPosition === PlayerPosition.PlayerA ? game?.playerB : game.playerA;

    // this one could be done once.
    setMyBoard(oldBoard => {
      return oldBoard.map((item) => opponent?.ships?.some(x => x == item.location) ? { ...item, isShip: true } : item);
    });

    setOpponentBoard(oldBoard => {
      return oldBoard.map((item) => opponent?.attackedShips?.some(x => x == item.location) ? { ...item, status: BoardItemStatus.Attacked } : item);
    });

    setActiveGame(game);
    setIsYourTurn(game.turn === playerPosition);
    checkIfWon(game);
  };

  // Move to service
  const checkIfWon = (game: Game) => {
    //TODO: stip the game if all ships defeated
  }

  const onBoardTilePress = async (selectedBox: BoardItem) => {
    if (isMarkerMode) {
      setMyMarkedShips(oldArray => {
        return [...oldArray, selectedBox.location]
      });

      setMyBoard(oldBoard => {
        return oldBoard.map((item) => item.location === selectedBox.location ? { ...item, status: BoardItemStatus.Marked } : item);
      });

      return;
    }

    setIsYourTurn(selectedBox.isShip);
    setMyAttackedShips(oldArray => { return [...oldArray, selectedBox.location] });

    setMyBoard(oldBoard => {
      return oldBoard.map((item) => item.location === selectedBox.location ? { ...item, status: BoardItemStatus.Attacked } : item);
    });

    await updateGame();
  };

  const updateGame = async () => {
    console.error(isYourTurn);

    if (playerPosition === PlayerPosition.PlayerA) {
      const updatedGame = {
        ...activeGame,
        turn: isYourTurn ? PlayerPosition.PlayerA : PlayerPosition.PlayerB,
        playerA: { ...activeGame.playerA, attackedShips: myAttackedShips }
      }

      await gameService.updateGame(updatedGame);
    } else {
      const updatedGame = {
        ...activeGame,
        turn: isYourTurn ? PlayerPosition.PlayerB : PlayerPosition.PlayerA,
        playerB: { ...activeGame.playerA, attackedShips: myAttackedShips }
      }

      await gameService.updateGame(updatedGame);
    }
  }

  const renderMainGame = () => (
    <View style={styles.mainGame} >
      <PaperArea
        areaStyle={styles.turnSection}
        componentStyle={styles.turnSectionComponentStyle}
      >
        {isYourTurn
          ? (<Text style={styles.turnText}>Your turn</Text>)
          : (<Text style={styles.turnText}>Another player turn</Text>)}
      </PaperArea>
      <View style={styles.competitorShipBoardContainer}>
        <Board board={opponentBoard} renderItem={(item) => (<BoardOpponentGameTile item={item} />)} disabled={!isYourTurn} />
      </View>
      <View style={styles.myShipBoardContainer}>
        <Board board={myBoard} renderItem={(item) => (<BoardMyGameTile item={item} onPress={async () => await onBoardTilePress(item)} />)} disabled={false} />
      </View>
    </View>
  );

  const renderSpinningWheel = () => (
    <View style={styles.spinningWheel}>
      <Text style={styles.spinningWheelText}>Another player is not ready</Text>
    </View>
  );

  const renderScreenChange = () => {
    if (activeGame?.status === GameProgress.Started) {
      return (
        renderMainGame()
      )
    } else {
      return (
        renderMainGame()
        // renderSpinningWheel()
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
      flex: 1,
    },
    mainGame: {
      flex: 1,
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
    turnSection: {
      flex: 0.9,
      width: '60%',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    turnSectionComponentStyle: {
      backgroundColor: theme.colors.canvas,
      height: 32
    },
    turnText: {
      fontSize: theme.sizes.medium,
      fontFamily: theme.fonts.medium,
      color: theme.colors.tertiary,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

  return styles;
};

export default PlayGameScreen;

