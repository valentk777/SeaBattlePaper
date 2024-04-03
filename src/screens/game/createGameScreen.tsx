import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { MainStackParamList } from '../../navigators/MainStackNavigator';
import { BoardItem } from '../../entities/boardItem';
import shipBoardService from '../../services/shipBoardService';
import createStyles from './gameSetupStyles';
import { Game } from '../../entities/game';
import gameService from '../../services/gameService';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { Background } from '../../components/Background/BackgroundImage';
import { PaperAreaButton } from '../../components/ButtonWrapper/PaperAreaButton';
import Board from '../../components/Board/Board';
import { PaperArea } from '../../components/Background/PaperArea';

type CreateGameScreenProps = NativeStackScreenProps<MainStackParamList, 'CreateGame'>;

export const CreateGameScreen = ({ navigation }: CreateGameScreenProps) => {
  const styles = createStyles();

  const user = useCurrentUser();
  const [activeGame, setActiveGame] = useState({ id: "" } as Game);
  const [currentBoard, setCurrentBoard] = useState(shipBoardService.generateNewShipBoard());

  useEffect(() => {
    const createNewGameAsync = async () => {
      try {
        const gameTemplate = gameService.createGameTemplate(user);
        const newGame = await gameService.publishGameWithStoring(gameTemplate);

        setActiveGame(newGame);
      } catch (error) {
        console.error('Error creating a new game:', error);
      }
    };

    createNewGameAsync();
  }, []);

  const onBoardTilePress = useCallback((selectedBox: BoardItem) => {
    setCurrentBoard((currentBoard) => {
      return currentBoard.map((item) => {
        if (item.location === selectedBox.location) {
          return { ...item, isShip: !item.isShip };
        } else {
          return item;
        }
      });
    });
  }, [currentBoard]);

  const onStartGamePress = () => {
    // const updatedGame = JSON.parse(JSON.stringify(activeGame));

    // if (updatedGame?.playerA?.id === user.id) {
    //   updatedGame.playerA.status = PlayerStatus.Started;
    // }

    // if (updatedGame?.playerB?.id === user.id) {
    //   updatedGame.playerB.status = PlayerStatus.Started;
    // }

    // shipBoardService.publishPlayerBoardsetWithStoring(updatedGame, user.id);

    // navigation.navigate('PlayGame', { gameId: activeGame.id, isHost: true });
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
        <Board board={currentBoard} onPress={onBoardTilePress} disabled={false} />
      </View>
      <View style={styles.empty} />
      <PaperAreaButton
        areaStyle={styles.startButtonArea}
        buttonStyle={styles.startButton}
        textStyle={styles.startButtonText}
        text="Start game"
        onPress={onStartGamePress}
      />
      <View style={styles.empty} />
    </View>
  );
};

export default CreateGameScreen;








//   // const updateGame = async (item: BoardItem) => {
//   //   const updatedGame = JSON.parse(JSON.stringify(activeGame)) as Game;

//   //   if (item.isShip) {
//   //     // remove from ship
//   //     if (activeGame.playerA.ships.includes(item.key)) {
//   //       updatedGame.playerA.ships = activeGame.playerA.ships.filter((selectedLocation) => selectedLocation !== item.key);
//   //     }
//   //   }
//   //   else {
//   //     // add to ship
//   //     if (!activeGame.playerA.ships.includes(item.key)) {
//   //       updatedGame.playerA.ships = [...activeGame.playerA.ships, item.key];
//   //     }
//   //   }


//   // };



//   // const onPressBox = async (boardItemLocation: string) => {
//   //   // todo refactor
//   //   // const itemToUpdateIndex = currentBoard.findIndex(currentItem => currentItem.key === boardItemLocation);

//   //   updateBoard(boardItemLocation);
//   //   // await updateGame(currentBoard[itemToUpdateIndex]);
//   // }



//   // const values = useMemo(() => ({ game: activeGame, updateGame: updateGame }), [activeGame]);
//   // const values = useMemo(() => ({ board: currentBoard, updateBoard: updateBoard }), [currentBoard]);


// export default CreateGameScreen;

