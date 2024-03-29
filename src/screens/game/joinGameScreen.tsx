// import React, { useEffect, useMemo, useState } from 'react';
// import { View, Text } from 'react-native';
// import { useCurrentUser } from '../../hooks/useCurrentUser';
// import { UserAccount } from '../../entities/user';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { MainStackParamList } from '../../navigators/MainStackNavigator';
// import { Background } from '../../components/Background/BackgroundImage';
// import { Game } from '../../entities/game';
// import { PlayerStatus } from '../../entities/playerStatus';
// import gameService from '../../services/gameService';
// import createStyles from './gameSetupStyles';
// import { PaperArea } from '../../components/Background/PaperArea';
// import { PaperAreaButton } from '../../components/ButtonWrapper/PaperAreaButton';
// import Board from '../../components/Game/Board';
// import { ActiveGameContext } from '../../hooks/useActiveGame';
// import shipBoardService from '../../services/shipBoardService';
// import { BoardItem } from '../../entities/boardItem';
// import { ShipBoardContext } from '../../hooks/useShipBoard';

// type JoinGameScreenProps = NativeStackScreenProps<MainStackParamList, 'JoinGame'>;

// export const JoinGameScreen = ({ navigation, route }: JoinGameScreenProps) => {
//   const styles = createStyles();

//   const { game } = route.params;

//   const [activeGame, setActiveGame] = useState(game);
//   const user = useCurrentUser() as UserAccount;

//   // const updateGame = async (game: Game) => {
//   //   await gameService.updateGameInLocalStorage(game);
//   //   setActiveGame(game);
//   // };

//   const updateBoard = async (board: BoardItem[]) => {
//     const updatedGame = gameService.getUpdateGameOnPress(activeGame, board, user.id) as Game;

//     await gameService.updateGameInLocalStorage(updatedGame);
//     setActiveGame(updatedGame);
//   };

//   useEffect(() => {
//     const updatedGame = JSON.parse(JSON.stringify(activeGame));

//     if (updatedGame?.playerA?.id !== undefined && updatedGame?.playerB?.id) {

//     }


//     const joinNewGameAsync = async () => {
//       try {
//         if (game?.playerA?.id === user.id) {
//           console.log("host joined");
//         }
//         else if (game?.playerB?.id === user.id) {
//           console.log('rejoin');
//         }



//         // const gameTemplate = gameService.createNewGameTemplate(user);
//         // const newGame = await gameService.publishGameWithStoring(gameTemplate);

//         // setActiveGame(newGame);
//       } catch (error) {
//         console.error('Error creating a new game:', error);
//       }
//     };

//     joinNewGameAsync();
//   }, []);

//   // const user = useCurrentUser() as UserAccount;

//   // useEffect(() => {
//   //   // store provided game to local storage


//   //   // const joinGameAsync = async () => {
//   //   //   try {
//   //   //     await gameService.createNewGame(user, onChangeActiveGame);
//   //   //   } catch (error) {
//   //   //     console.error('Error creating a new game:', error);
//   //   //   }
//   //   // };

//   //   // joinGameAsync();
//   // }, [activeGame]);

//   const onStartGame = () => {
//     const updatedGame = JSON.parse(JSON.stringify(activeGame));
    
//     if (updatedGame?.playerA?.id === user.id) {
//       updatedGame.playerA.status = PlayerStatus.Started;
//     }

//     if (updatedGame?.playerB?.id === user.id) {
//       updatedGame.playerB.status = PlayerStatus.Started;
//     }

//     shipBoardService.publishPlayerBoardsetWithStoring(updatedGame, user.id);

//     navigation.navigate('PlayGame', {gameId: activeGame.id });
//   }

//   // const values = useMemo(() => ({ game: activeGame, updateGame: updateGame }), [activeGame]);
//   const values = useMemo(() => ({ board: activeGame?.playerA?.board === undefined ? shipBoardService.generateNewShipBoard() : activeGame.playerA.board, updateBoard: updateBoard }), [activeGame]);

//   return (
//     <View style={styles.container}>
//       <Background />
//       <View style={styles.empty} />
//       {/* <ActiveGameContext.Provider value={values}> */}
//       <ShipBoardContext.Provider value={values}>
//         <View style={styles.newGameContainer}>
//           <PaperArea
//             areaStyle={styles.areaStyle}
//             componentStyle={styles.componentStyle}
//           >
//             <Text style={styles.shareText}>Share this number with another player</Text>
//             <Text style={styles.activeGameIdText}>{activeGame.id}</Text>
//           </PaperArea>
//         </View>
//         <View style={styles.gamePlayers}>
//           <View>
//             <Text style={styles.activePlayersText}>
//               PlayerA: {activeGame.playerA?.id !== undefined ? "Joined" : "NotFound"}
//             </Text>
//           </View>
//           <View>
//             <Text style={styles.activePlayersText}>
//               PlayerB: {activeGame.playerB?.id !== undefined ? "Joined" : "NotFound"}
//             </Text>
//           </View>
//         </View>
//         <View style={styles.shipBoardContainer}>
//           <Board  disabled={false}/>
//         </View>
//         <View style={styles.empty} />
//         <PaperAreaButton
//           areaStyle={styles.startButtonArea}
//           buttonStyle={styles.startButton}
//           textStyle={styles.startButtonText}
//           text="Start game"
//           onPress={onStartGame}
//         />
//         <View style={styles.empty} />
//         </ShipBoardContext.Provider>
//       {/* </ActiveGameContext.Provider> */}
//     </View>
//   );
// };

// export default JoinGameScreen;

