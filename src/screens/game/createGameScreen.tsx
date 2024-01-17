import React, { useEffect, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { Game } from '../../entities/game';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigators/MainStackNavigator';
import { Background } from '../../components/Background/BackgroundImage';
import { ShipsBoard } from '../../components/Game/ShipsBoard';
import { PaperArea } from '../../components/Background/PaperArea';
import gameService from '../../services/gameService';
import { UserAccount } from '../../entities/user';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { ActiveGameContext } from '../../hooks/useActiveGame';
import { PaperAreaButton } from '../../components/ButtonWrapper/PaperAreaButton';
import createStyles from './gameSetupStyles';
import shipBoardService from '../../services/shipBoardService';
import { GameProgress } from '../../entities/gameProgress';
import { PlayerStatus } from '../../entities/playerStatus';
import { ShipBoardContext } from '../../hooks/useShipBoard';
import { BoardItem } from '../../entities/boardItem';

type CreateGameScreenProps = NativeStackScreenProps<MainStackParamList, 'CreateGame'>;

export const CreateGameScreen = ({ navigation }: CreateGameScreenProps) => {
  const styles = createStyles();

  const [activeGame, setActiveGame] = useState({ id: "" } as Game);
  const [currentBoard, setCurrentBoard] = useState(shipBoardService.generateNewShipBoard());
  const user = useCurrentUser() as UserAccount;

  useEffect(() => {
    const createNewGameAsync = async () => {
      try {
        const gameTemplate = gameService.createNewGameTemplate(user);
        const newGame = await gameService.publishGameWithStoring(gameTemplate);

        setActiveGame(newGame);
        // setCurrentBoard(shipBoardService.generateNewShipBoard())
      } catch (error) {
        console.error('Error creating a new game:', error);
      }
    };

    createNewGameAsync();
  }, []);

  const updateGame = async (item: BoardItem) => {
    const updatedGame = JSON.parse(JSON.stringify(activeGame)) as Game;

    if (item.isShip) {
      // remove from ship
      if (activeGame.playerA.ships.includes(item.location)) {
        updatedGame.playerA.ships = activeGame.playerA.ships.filter((selectedLocation) => selectedLocation !== item.location);
      }
    }
    else {
      // add to ship
      if (!activeGame.playerA.ships.includes(item.location)) {
        updatedGame.playerA.ships = [...activeGame.playerA.ships, item.location];
      }
    }

    await gameService.updateGameInLocalStorage(updatedGame);
    setActiveGame(updatedGame);
  };

  const updateBoard = (item: BoardItem) => {
    const newItem = { ...item, isShip: !item.isShip } as BoardItem;
    const index = currentBoard.findIndex(currentItem => currentItem.location === item.location)
    currentBoard[index] = newItem;

    setCurrentBoard(currentBoard);
  };

  const onPressBox = async (item: BoardItem) => {
    updateBoard(item);
    await updateGame(item);
  }

  const onStartGame = () => {
    const updatedGame = JSON.parse(JSON.stringify(activeGame));
    
    if (updatedGame?.playerA?.id === user.id) {
      updatedGame.playerA.status = PlayerStatus.Started;
    }

    if (updatedGame?.playerB?.id === user.id) {
      updatedGame.playerB.status = PlayerStatus.Started;
    }

    shipBoardService.publishPlayerBoardsetWithStoring(updatedGame, user.id);

    navigation.navigate('PlayGame', {gameId: activeGame.id, isHost: true });
  }

  // const values = useMemo(() => ({ game: activeGame, updateGame: updateGame }), [activeGame]);
  // const values = useMemo(() => ({ board: activeGame?.playerA?.board === undefined ? shipBoardService.generateNewShipBoard() : activeGame.playerA.board, updateBoard: updateBoard }), [activeGame]);

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.empty} />
      {/* <ActiveGameContext.Provider value={values}> */}
      {/* <ShipBoardContext.Provider value={values}> */}
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
        <ShipsBoard
          disabled={false}
          onPress={onPressBox}
          board={currentBoard}
        />
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
      {/* </ShipBoardContext.Provider> */}
      {/* </ActiveGameContext.Provider> */}
    </View>
  );
};

export default CreateGameScreen;

