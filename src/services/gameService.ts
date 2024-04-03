import {Game} from '../entities/game';
import {GameProgress} from '../entities/gameProgress';
import timeService from './timeService';
import {PlayerBoard} from '../entities/playerBoard';
import {PlayerStatus} from '../entities/playerStatus';
import {Alert} from 'react-native';
import userService from './userService';
import {UserAccount} from '../entities/user';
import localStorageService, {storeData} from './localStorageService';
import remoteGameService from './remoteGameService';

const getGameKey = (userId: string, gameId: string) => {
  return `games/${userId}/${gameId}`;
};

const validateGame = async (candidateGame: Game, userId: string) => {
  if (candidateGame.status == GameProgress.Completed) {
    Alert.alert('Game already completed');
    return false;
  }

  if (candidateGame.playerA.id == userId) {
    Alert.alert('Host can re-join to active the game');

    return true;
  }

  if (candidateGame.playerB.id == userId) {
    Alert.alert('Player can re-join to active the game');

    return true;
  }

  if (candidateGame.playerB == undefined) {
    Alert.alert('Player can join as a second player');

    return true;
  }

  Alert.alert('game is not for current player');
  return false;
};

const createPlayerTemplate = (user: UserAccount) => {
  return {
    id: user.id,
    email: user.email,
    status: PlayerStatus.Joined,
    ships: [] as string[],
    attackedShips: [] as string[],
    markedShips: [] as string[],
  } as PlayerBoard;
};

const createGameTemplate = (user: UserAccount) => {
  return {
    playerA: createPlayerTemplate(user),
    timeCreated: timeService.getCurrentDateString(),
    status: GameProgress.Created,
  } as Game;
};

const publishGameWithStoring = async (game: Game) => {
  const updatedGame = await remoteGameService.storeNewGame(game);
  const user = await userService.getCurrentUser();

  if (user === null || user.id === '' || user.id === null) {
    return {} as Game;
  }

  if (updatedGame?.id) {
    const gameKey = getGameKey(user.id, updatedGame.id);
    await localStorageService.storeData(gameKey, updatedGame);

    return updatedGame;
  } else {
    Alert.alert('error creating game');
    return game;
  }
};

// const storeNewGame = async (game: Game) => {
//   try {
//     const user = await userService.getCurrentUser();

//     if (user === null || user.id === '' || user.id === null) {
//       console.error('Cannot store game because user does not exist');
//       return false;
//     }

//     localStorageService.storeData(getGameKey(user.id, game.id), game);

//     const response = await gamesDbTable.addActiveGame(game);

//     remoteGameService.updateDbStoredChallenges(user.id, challenges);
//     return true;
//   } catch (error) {
//     Alert.alert(`Issues saving game: Error: ${error}`);
//     return false;
//   }
// };

// const handleJoinToGame = async (game: Game) => {
//   const isHost = gameService.isHost(game, user.id);

//   if (!isHost) {
//     if (game?.playerB?.status != PlayerStatus.Joined) {
//       const playerB = gameService.createPlayerTemplate(user);

//       const updatedGame = { ...game, playerB: playerB, status: GameProgress.PlayerMatched } as Game;

//       await gameService.updateGameInLocalStorage(updatedGame);
//       await gameService.updateGameInRemote(updatedGame);
//     }
//   }

//   navigation.navigate('JoinGame', { game: game, isHost: isHost });
// }

// const getGameStorageKey = (userId: string, gameId: string) => {
//   return `${userId}/games/${gameId}`;
// };

// const isHost = (game: Game, userId: string) => {
//   return game?.playerA?.id === userId;
// }

// const updateGameInLocalStorage = async (game: Game) => {
//   const user = await userService.getCurrentUser();

//   if (user === null || user.id === '' || user.id === null) {
//     return {} as Game;
//   }

//   await storeData(getGameStorageKey(user.id, game.id), game);
// };

// const initGame = async (userId: string, gameId: string) => {
//   const response = await gamesDbTable.getGame(gameId);

//   if (response.isSuccessfull) {
//     await storeData(getGameStorageKey(userId, gameId), response.result);
//     return response.result;
//   }

//   Alert.alert('Cannot find local game. Create a new one');
// };

// const setGameWithTracking = async (
//   gameId: string,
//   setActiveGameOnChange: Function,
// ) => {
//   await gamesDbTable.setGameWithTracking(gameId, setActiveGameOnChange);
// };

// const getGameFromStorage = async (gameId: string) => {
//   try {
//     const user = await userService.getCurrentUser();

//     if (user === null || user.id === '' || user.id === null) {
//       return {} as Game;
//     }

//     const shipBoard = await getData(getGameStorageKey(user.id, gameId));

//     if (shipBoard === null) {
//       return await initGame(user.id, gameId);
//     }

//     return shipBoard as BoardItem[];
//   } catch (error) {
//     Alert.alert(`Issues getting all board item: Error: ${error}`);
//     return [] as BoardItem[];
//   }
// };

// const getUpdateGameOnPress = (game: Game, board: BoardItem[], userId: string) => {
//   try {
//     const updatedGame = JSON.parse(JSON.stringify(game));

//     if (updatedGame?.playerA?.id === userId) {
//       updatedGame.playerA.board = board;
//     }

//     if (updatedGame?.playerB?.id === userId) {
//         updatedGame.playerB.board = board;
//     }

//     return updatedGame;
//   } catch (error) {
//     Alert.alert(`Issues updating ship board: Error: ${error}`);
//     Alert.alert(error);
//     return game;
//   }
// };

// const updateGameOnBoardPress = async (
//   game: Game,
//   item: BoardItem,
//   userId: string,
// ) => {
//   try {
//     const updatedGame = getUpdateGameOnPress(game, item, userId);

//     const response = (await gamesDbTable.updateActiveGames(
//       updatedGame,
//     )) as AppResponse;

//     if (!response.isSuccessfull) {
//       Alert.alert('Cannot update game' + response.error);
//     }

//     return updatedGame;
//   } catch (error) {
//     Alert.alert(`Issues updating ship board: Error: ${error}`);
//     Alert.alert(error);
//     return game;
//   }
// };

// const updateGameInRemote = async (
//   game: Game,
// ) => {
//   try {
//     const response = (await gamesDbTable.updateActiveGames(
//       game,
//     )) as AppResponse;

//     if (!response.isSuccessfull) {
//       Alert.alert('Cannot update game' + response.error);
//     }
//   } catch (error) {
//     Alert.alert(`Issues updating ship board: Error: ${error}`);
//     Alert.alert(error);
//   }
// };

const gameService = {
  createPlayerTemplate,
  createGameTemplate,
  validateGame,
  publishGameWithStoring,




  // isHost,

  // publishGameWithStoring,
  // getRemoteGameById,
  // getGameFromStorage,
  // getUpdateGameOnPress,
  // setGameWithTracking,
  // updateGameOnBoardPress,
  // updateGameInLocalStorage,
  // updateGameInRemote,
};

export default gameService;
