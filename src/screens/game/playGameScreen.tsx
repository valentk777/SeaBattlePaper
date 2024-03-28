// import React, { useEffect, useMemo, useState } from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import { useAuth } from '../../hooks/useAuth';
// import { useCurrentUser } from '../../hooks/useCurrentUser';
// import { UserAccount } from '../../entities/user';
// import { useTheme } from '../../hooks/useTheme';
// import { useTranslation } from 'react-i18next';
// import { useTranslations } from '../../hooks/useTranslations';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { MainStackParamList } from '../../navigators/MainStackNavigator';
// import { Background } from '../../components/Background/BackgroundImage';
// import { Game } from '../../entities/game';
// import { PlayerStatus } from '../../entities/playerStatus';
// import gameService from '../../services/gameService';
// import { PaperArea } from '../../components/Background/PaperArea';
// import { PaperAreaButton } from '../../components/ButtonWrapper/PaperAreaButton';
// import ShipsBoard from '../../components/Game/ShipsBoard';
// import { ActiveGameContext } from '../../hooks/useActiveGame';
// import { GameProgress } from '../../entities/gameProgress';
// import AuthStackNavigator from '../../navigators/AuthStackNavigator';

// type PlayGameScreenProps = NativeStackScreenProps<MainStackParamList, 'PlayGame'>;

// export const PlayGameScreen = ({ navigation, route }: PlayGameScreenProps) => {
//   const styles = createStyles();

//   const { gameId } = route.params;
//   const [activeGame, setActiveGame] = useState({ id: gameId } as Game);
//   const user = useCurrentUser() as UserAccount;

//   const updateGame = async (game: Game) => {
//     await gameService.updateGameInLocalStorage(game);
//     setActiveGame(game);
//   };

//   useEffect(() => {
//     const createNewGameAsync = async () => {
//       try {
//         await gameService.setGameWithTracking(gameId, updateGame);
//       } catch (error) {
//         console.error('Error creating a new game:', error);
//       }
//     };

//     createNewGameAsync();
//   }, []);

//   const values = useMemo(() => ({ game: activeGame, updateGame: updateGame }), [activeGame]);

//   const renderMainGame = () => (
//     <View style={styles.mainGame} >
//       <View style={styles.empty} />
//       {/* <View style={styles.newGameContainer}>
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
//         </View> */}
//       <View style={styles.competitorShipBoardContainer}>
//         <ShipsBoard disabled={true} />
//       </View>
//       <View style={styles.myShipBoardContainer}>
//         <ShipsBoard disabled={false} />
//       </View>
//       {/* <View style={styles.empty} /> */}
//       {/* <PaperAreaButton
//           areaStyle={styles.startButtonArea}
//           buttonStyle={styles.startButton}
//           textStyle={styles.startButtonText}
//           text="Start game"
//           onPress={onStartGame}
//         /> */}
//       {/* */}
//     </View>
//   );

//   const renderSpinningWheel = () => (
//     <View style={styles.spinningWheel}>
//       <Text style={styles.spinningWheelText}>Another player is not ready</Text>
//     </View>
//   );

//   const renderScreenChange = () => {
//     if (activeGame?.status === GameProgress.Started) {
//       return (
//         renderSpinningWheel()
//       )
//     } else {
//       return (
//         renderMainGame()
//       )
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Background />
//       <ActiveGameContext.Provider value={values}>
//         {renderScreenChange()}
//       </ActiveGameContext.Provider>
//     </View>
//   );
// };

// const createStyles = () => {
//   const { theme } = useTheme();

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//     },
//     mainGame: {
//       flex: 1,
//     },
//     spinningWheel: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center'
//     },
//     spinningWheelText: {
//       fontSize: 20,
//       fontFamily: theme.fonts.bold,
//       color: theme.colors.tertiary,
//       textAlign: 'center'
//     },
//     competitorShipBoardContainer: {
//       flex: 5,
//       justifyContent: 'center',
//       alignItems: 'center',
//       pointerEvents: 'none',
//     },
//     myShipBoardContainer: {
//       flex: 5,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     empty: {
//       flex: 1,
//     },
//   });

//   return styles;
// };

// export default PlayGameScreen;

