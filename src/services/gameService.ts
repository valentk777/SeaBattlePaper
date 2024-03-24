import {Game} from '../entities/game';
import {AppResponse} from '../entities/appResponse';
import gamesDbTable from '../external/database/gamesDbTable';
import {getData, storeData} from './dataStorageService';
import {GameProgress} from '../entities/gameProgress';
import timeService from './timeService';
import {PlayerBoard} from '../entities/playerBoard';
import {PlayerStatus} from '../entities/playerStatus';
import shipBoardService from './shipBoardService';
import {Alert} from 'react-native';
import {BoardItem} from '../entities/boardItem';
import userService from './userService';
import {User, UserAccount} from '../entities/user';

const getGameStorageKey = (userId: string, gameId: string) => {
  return `${userId}/games/${gameId}`;
};

const isHost = (game: Game, userId: string) => {
  return game?.playerA?.id === userId;
}

const createNewPlayerTemplate = (user: UserAccount) => {
  return {
    id: user.id,
    email: user.email,
    status: PlayerStatus.Joined,
    ships: [] as string[],
    attackedShips: [] as string[],
    markedShips: [] as string[],
  } as PlayerBoard;
};

const createNewGameTemplate = (user: UserAccount) => {
  return {
    playerA: createNewPlayerTemplate(user),
    timeCreated: timeService.getCurrentDateString(),
    status: GameProgress.Created,
  } as Game;
};

const publishGameWithStoring = async (game: Game) => {
  const response = (await gamesDbTable.addActiveGame(game)) as AppResponse;

  const user = await userService.getCurrentUser();

  if (user === null || user.id === '' || user.id === null) {
    return {} as Game;
  }

  if (response.isSuccessfull) {
    const updatedGame = response.result as Game;

    await storeData(getGameStorageKey(user.id, updatedGame.id), updatedGame);

    return updatedGame;
  } else {
    console.log('error creating game');
    return game;
  }
};

const updateGameInLocalStorage = async (game: Game) => {
  const user = await userService.getCurrentUser();

  if (user === null || user.id === '' || user.id === null) {
    return {} as Game;
  }

  await storeData(getGameStorageKey(user.id, game.id), game);
};

// const initGame = async (userId: string, gameId: string) => {
//   const response = (await gamesDbTable.getGame(gameId)) as AppResponse;

//   if (response.isSuccessfull) {
//     await storeData(getGameStorageKey(userId, gameId), response.result);
//     return response.result;
//   }

//   alert('Cannot find local game. Create a new one');
// };

// const getGameKey = (length: number = 4) => {
//     // we will generate
//     // random 4 digits number + userId will create a unique game key.
//     // store to active games table and it will be okay

//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     let result = '';

//     for (let i = 0; i < length; i++) {
//       const randomIndex = Math.floor(Math.random() * characters.length);
//       result += characters.charAt(randomIndex);
//     }

//     return result;
// }

const setGameWithTracking = async (
  gameId: string,
  setActiveGameOnChange: Function,
) => {
  await gamesDbTable.setGameWithTracking(gameId, setActiveGameOnChange);
};

const validateGame = async (candidateGame: Game, userId: string) => {

  if (candidateGame.status == GameProgress.Completed) {
    console.log('Game already completed');
    return false;
  }

  if (candidateGame.playerA.id == userId) {
    console.log('Host can re-join to active the game');

    return true;
  }

  if (candidateGame.playerB.id == userId) {
    console.log('Player can re-join to active the game');

    return true;
  }

  if (candidateGame.playerB == undefined) {
    console.log('Player can join as a second player');

    return true;
  }

  console.log('game is not for current player');
  return false;
};


const getRemoteGameById = async (gameId: string) => {
  // const response = await getData(getGameStorageKey(userId, gameId)) as AppResponse;
  const response = (await gamesDbTable.getGame(gameId)) as AppResponse;

  if (response.isSuccessfull) {
    return response.result as Game;
  }

  console.log('error creating game');
  return {} as Game;
};

const getGameFromStorage = async (gameId: string) => {
  try {
    const user = await userService.getCurrentUser();

    if (user === null || user.id === '' || user.id === null) {
      return {} as Game;
    }

    const shipBoard = await getData(getGameStorageKey(user.id, gameId));

    if (shipBoard === null) {
      return await initGame(user.id, gameId);
    }

    return shipBoard as BoardItem[];
  } catch (error) {
    Alert.alert(`Issues getting all board item: Error: ${error}`);
    return [] as BoardItem[];
  }
};

// TODO: get board for game?
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

const getUpdateGameOnPress = (game: Game, board: BoardItem[], userId: string) => {
  try {
    const updatedGame = JSON.parse(JSON.stringify(game));

    if (updatedGame?.playerA?.id === userId) {
      updatedGame.playerA.board = board;
    }

    if (updatedGame?.playerB?.id === userId) {
        updatedGame.playerB.board = board;
    }

    return updatedGame;
  } catch (error) {
    Alert.alert(`Issues updating ship board: Error: ${error}`);
    console.log(error);
    return game;
  }
};

const updateGameOnBoardPress = async (
  game: Game,
  item: BoardItem,
  userId: string,
) => {
  try {
    const updatedGame = getUpdateGameOnPress(game, item, userId);

    const response = (await gamesDbTable.updateActiveGames(
      updatedGame,
    )) as AppResponse;

    if (!response.isSuccessfull) {
      alert('Cannot update game' + response.error);
    }

    return updatedGame;
  } catch (error) {
    Alert.alert(`Issues updating ship board: Error: ${error}`);
    console.log(error);
    return game;
  }
};

const updateGameInRemote = async (
  game: Game,
) => {
  try {
    const response = (await gamesDbTable.updateActiveGames(
      game,
    )) as AppResponse;

    if (!response.isSuccessfull) {
      alert('Cannot update game' + response.error);
    }
  } catch (error) {
    Alert.alert(`Issues updating ship board: Error: ${error}`);
    console.log(error);
  }
};

const gameService = {
  isHost,
  createNewPlayerTemplate,
  createNewGameTemplate,
  publishGameWithStoring,
  getRemoteGameById,
  validateGame,
  getGameFromStorage,
  getUpdateGameOnPress,
  setGameWithTracking,
  updateGameOnBoardPress,
  updateGameInLocalStorage,
  updateGameInRemote,
};

export default gameService;
