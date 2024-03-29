import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { MainStackParamList } from '../../navigators/MainStackNavigator';
import Board from '../../components/Board/Board';
import { BoardItem } from '../../entities/boardItem';
import shipBoardService from '../../services/shipBoardService';
import createStyles from './gameSetupStyles';
import { Game } from '../../entities/game';
import gameService from '../../services/gameService';
import { UserAccount } from '../../entities/user';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { Background } from '../../components/Background/BackgroundImage';
import { PaperAreaButton } from '../../components/ButtonWrapper/PaperAreaButton';

type CreateGameScreenProps = NativeStackScreenProps<MainStackParamList, 'CreateGame'>;


export const CreateGameScreen = ({ navigation }: CreateGameScreenProps) => {
  const styles = createStyles();

  const user = useCurrentUser() as UserAccount;
  const [activeGame, setActiveGame] = useState({ id: "" } as Game);
  const [currentBoard, setCurrentBoard] = useState(shipBoardService.generateNewShipBoard());

    useEffect(() => {
    console.log("RE-RENDERING --- CreateGameScreen");

    const createNewGameAsync = async () => {
      try {
        const gameTemplate = gameService.createNewGameTemplate(user);
        const newGame = await gameService.publishGameWithStoring(gameTemplate);

        setActiveGame(newGame);
        setCurrentBoard(shipBoardService.generateNewShipBoard())
      } catch (error) {
        console.error('Error creating a new game:', error);
      }
    };

    createNewGameAsync();
  }, []);


  const handlePress = (selectedBox: BoardItem) => {
    console.log(`board updated: key ${selectedBox.key}`);

    setCurrentBoard(currentBoard.map(item => 
      item.key === selectedBox.key ? { ...item, isShip: !item.isShip, fontSize: 24 } : item
    ));
  };

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.empty} />


      {/* <ActiveGameContext.Provider value={values}> */}
      {/* <View style={styles.newGameContainer}>
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
      </View> */}
      <View style={styles.shipBoardContainer}>
        {/* <ShipBoardContext.Provider value={values}> */}
          <Board board={currentBoard} onPress={handlePress} disabled={false}/>
        {/* </ShipBoardContext.Provider> */}
      </View>
      <View style={styles.empty} />
      {/* <PaperAreaButton
        areaStyle={styles.startButtonArea}
        buttonStyle={styles.startButton}
        textStyle={styles.startButtonText}
        text="Start game"
        onPress={onStartGame}
      /> */}
      <View style={styles.empty} />
      {/* </ActiveGameContext.Provider> */}
    </View>
  );
};

export default CreateGameScreen;









// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { View, Text } from 'react-native';
// import { Game } from '../../entities/game';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { MainStackParamList } from '../../navigators/MainStackNavigator';
// import { Background } from '../../components/Background/BackgroundImage';
// import ShipsBoard from '../../components/Game/ShipsBoard';
// import { PaperArea } from '../../components/Background/PaperArea';
// import gameService from '../../services/gameService';
// import { UserAccount } from '../../entities/user';
// import { useCurrentUser } from '../../hooks/useCurrentUser';
// import { PaperAreaButton } from '../../components/ButtonWrapper/PaperAreaButton';
// 
// import shipBoardService from '../../services/shipBoardService';
// import { PlayerStatus } from '../../entities/playerStatus';
// import { BoardItem } from '../../entities/boardItem';
// import { ActiveGameContext } from '../../hooks/useActiveGame';
// import { ShipBoardContext } from '../../hooks/useShipBoard';




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

//   //   await gameService.updateGameInLocalStorage(updatedGame);
//   //   setActiveGame(updatedGame);
//   // };



//   // const onPressBox = async (boardItemLocation: string) => {
//   //   // todo refactor
//   //   // const itemToUpdateIndex = currentBoard.findIndex(currentItem => currentItem.key === boardItemLocation);

//   //   updateBoard(boardItemLocation);
//   //   // await updateGame(currentBoard[itemToUpdateIndex]);
//   // }

//   const onStartGame = () => {
//     const updatedGame = JSON.parse(JSON.stringify(activeGame));

//     if (updatedGame?.playerA?.id === user.id) {
//       updatedGame.playerA.status = PlayerStatus.Started;
//     }

//     if (updatedGame?.playerB?.id === user.id) {
//       updatedGame.playerB.status = PlayerStatus.Started;
//     }

//     shipBoardService.publishPlayerBoardsetWithStoring(updatedGame, user.id);

//     navigation.navigate('PlayGame', { gameId: activeGame.id, isHost: true });
//   }

//   // const values = useMemo(() => ({ game: activeGame, updateGame: updateGame }), [activeGame]);
//   // const values = useMemo(() => ({ board: currentBoard, updateBoard: updateBoard }), [currentBoard]);


// export default CreateGameScreen;

