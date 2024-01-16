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

const getGameStorageKey = (userId: string, gameId: string) => {
  return `${userId}/games/${gameId}`;
};

const initGame = async (userId: string, gameId: string) => {
  const response = (await gamesDbTable.getGame(gameId)) as AppResponse;

  if (response.isSuccessfull) {
    await storeData(getGameStorageKey(userId, gameId), response.result);
    return response.result;
  }

  alert('Cannot find local game. Create a new one');
};

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

const createNewGame = async (
  userId: string,
  setActiveGameOnChange: Function,
) => {
  const newGame = {
    playerA: {
      id: userId,
      status: PlayerStatus.Joined,
      board: shipBoardService.generateNewShipBoard(),
    } as PlayerBoard,
    timeCreated: timeService.getCurrentDateString(),
    status: GameProgress.Created,
  } as Game;

  const response = (await gamesDbTable.addActiveGame(newGame)) as AppResponse;

  if (response.isSuccessfull) {
    // const response = (await gamesDbTable.getGame(gameId)) as AppResponse;

    // const updatedGame = {id : response.result.id, ...newGame.playerA} as Game

    // newGame.id = ;

    await gamesDbTable.setActiveGameOnChangeFuncion(
      response.result.id,
      setActiveGameOnChange,
    );
    // await storeData(getGameStorageKey(userId, newGame.id), newGame);
  } else {
    console.log('error creating game');
  }
};

const getGameIfPossible = async (userId: string, gameId: string) => {
  // const response = await getData(getGameStorageKey(userId, gameId)) as AppResponse;
  const response = (await gamesDbTable.getGame(gameId)) as AppResponse;

  if (response.isSuccessfull) {
    const candidateGame = response.result as Game;

    if (candidateGame.status == GameProgress.Completed) {
      console.log('Game already completed');
      return {};
    }

    if (candidateGame.playerA.id == userId) {
      console.log('Host can re-join to active the game');

      return candidateGame;
    }

    if (candidateGame.playerB.id == userId) {
      console.log('Player can re-join to active the game');

      return candidateGame;
    }

    if (candidateGame.playerB == undefined) {
      console.log('Player joined as a second player');

      return candidateGame;
    }

    console.log('game is not for current player');
    return {};
  } else {
    console.log('error creating game');
    return {};
  }
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

const tryJoinToGame = async (userId: string, game: Game) => {
  if (game.playerA == userId) {
    console.log('Host can re-join to active the game');
    // TODO: think about player object and update actual player status here. it would be useful if player disconects from game.
    return true;
  }

  if (game.playerB == userId) {
    console.log('Player can re-join to active the game');
    // TODO: think about player object and update actual player status here. it would be useful if player disconects from game.
    return true;
  }

  if (game.playerB == undefined) {
    console.log('Player joined as a second player');

    game.playerB = userId;

    const response = (await gamesDbTable.updateActiveGames(
      game,
    )) as AppResponse;

    if (!response.isSuccessfull) {
      console.log('Cannot join to the game' + response.error);
    }

    return response.isSuccessfull;
  }

  return false;
};

const updateGameOnBoardPress = async (
  game: Game,
  item: BoardItem,
  userId: string,
) => {
  try {
    if (game?.playerA?.id === userId) {
      game.playerA.board.map(currentItem =>
        currentItem.location === item.location ? item : currentItem,
      );
    }

    if (game?.playerB?.id === userId) {
      game.playerB.board.map(currentItem =>
        currentItem.location === item.location ? item : currentItem,
      );
    }

    const response = (await gamesDbTable.updateActiveGames(
      game,
    )) as AppResponse;

    if (!response.isSuccessfull) {
      alert('Cannot update game' + response.error);
    }

    return game;
  } catch (error) {
    Alert.alert(`Issues updating ship board: Error: ${error}`);
    return game;
  }
};

const gameService = {
  createNewGame,
  getGameIfPossible,
  // tryJoinToGame,
  // updateGameOnChange,
  updateGameOnBoardPress,
};

export default gameService;
