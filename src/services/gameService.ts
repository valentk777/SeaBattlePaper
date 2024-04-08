import {Game} from '../entities/game';
import {GameProgress} from '../entities/gameProgress';
import timeService from './timeService';
import {PlayerBoard} from '../entities/playerBoard';
import {PlayerStatus} from '../entities/playerStatus';
import {Alert} from 'react-native';
import userService from './userService';
import {UserAccount} from '../entities/user';
import localRepository from '../integrations/repositories/localRepository';
import remoteGameService from './remoteGameService';
import {PlayerPosition} from '../entities/playerPosition';

const getGameKey = (userId: string, gameId: string) => {
  return `games/${userId}/${gameId}`;
};

const getPlayerKey = (
  userId: string,
  gameId: string,
  playerPosition: PlayerPosition,
) => {
  if (playerPosition === PlayerPosition.PlayerA) {
    return `games/${userId}/${gameId}/playerA`;
  } else if (playerPosition === PlayerPosition.PlayerB) {
    return `games/${userId}/${gameId}/playerB`;
  }

  Alert.alert('cannot store information for this player!');

  return '';
};

const validateGame = async (candidateGame: Game, userId: string) => {
  if (candidateGame.status == GameProgress.Completed) {
    Alert.alert('Game already completed');

    return false;
  }

  console.log(candidateGame);

  if (candidateGame.playerA?.id == userId) {
    console.log('Host can re-join to active the game');

    return true;
  }

  if (candidateGame.playerB?.id == userId) {
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

const createPlayerTemplate = (user: UserAccount) => {
  return {
    id: user.id,
    email: user.email,
    status: PlayerStatus.Joined,
    isActive: true,
    ships: [''],
    attackedShips: [''],
    markedShips: [''],
  } as PlayerBoard;
};

const createGameTemplate = (user: UserAccount) => {
  return {
    playerA: createPlayerTemplate(user),
    timeCreated: timeService.getCurrentDateString(),
    status: GameProgress.Created,
    turn: PlayerPosition.PlayerA, // Make it random?
  } as Game;
};

const createNewGameWithStoring = async (game: Game) => {
  const updatedGame = await remoteGameService.storeNewGame(game);
  const user = await userService.getCurrentUser();

  if (user === null || user.id === '' || user.id === null) {
    return {} as Game;
  }

  if (updatedGame?.id) {
    const gameKey = getGameKey(user.id, updatedGame.id);
    await localRepository.storeData(gameKey, updatedGame);

    return updatedGame;
  } else {
    console.log('error creating game');
    return game;
  }
};

const getPlayerPosition = (game: Game, userId: string) => {
  if (userId == undefined) {
    console.error('Cannot find position, because user is undefined');
  }

  if (game?.playerA?.id === userId) {
    return PlayerPosition.PlayerA;
  } else if (game?.playerB?.id === userId) {
    return PlayerPosition.PlayerB;
  }

  Alert.alert('Player position unknown');

  return PlayerPosition.PlayerB;
};

const updateGame = async (game: Game) => {
  const user = await userService.getCurrentUser();

  if (user === null || user.id === '' || user.id === null) {
    return {} as Game;
  }

  await localRepository.storeData(getGameKey(user.id, game.id), game);
  await remoteGameService.updateGame(game);
};

const updatePlayer = async (
  gameId: string,
  player: PlayerBoard,
  playerPositionToUpdate: PlayerPosition,
) => {
  try {
    await remoteGameService.updatePlayer(
      gameId,
      player,
      playerPositionToUpdate,
    );
    await localRepository.storeData(
      getPlayerKey(player.id, gameId, playerPositionToUpdate),
      player,
    );
  } catch (error) {
    console.error(error);
  }
};

const getGameWithTracking = async (
  gameId: string,
  onRemoteGameUpdated: Function,
) => {
  return await remoteGameService.getGameWithTracking(
    gameId,
    onRemoteGameUpdated,
  );
};

const stopGameTracking = async (
  gameId: string,
  functionToStopTracking: any,
) => {
  return await remoteGameService.stopGameTracking(
    gameId,
    functionToStopTracking,
  );
};

const getPlayerOrDefault = (game: Game, user: UserAccount) => {
  if (user == undefined) {
    console.error('Cannot find position, because user is undefined');
  }

  if (game?.playerA?.id === user.id) {
    return game.playerA;
  } else if (game?.playerB?.id === user.id) {
    return game.playerB;
  }

  return null;
};

// const storeNewGame = async (game: Game) => {
//   try {
//     const user = await userService.getCurrentUser();

//     if (user === null || user.id === '' || user.id === null) {
//       console.error('Cannot store game because user does not exist');
//       return false;
//     }

//     localRepository.storeData(getGameKey(user.id, game.id), game);

//     const response = await gamesDbTable.addActiveGame(game);

//     remoteGameService.updateDbStoredChallenges(user.id, challenges);
//     return true;
//   } catch (error) {
//     console.log(`Issues saving game: Error: ${error}`);
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

// const initGame = async (userId: string, gameId: string) => {
//   const response = await gamesDbTable.getGame(gameId);

//   if (response.isSuccessfull) {
//     await storeData(getGameStorageKey(userId, gameId), response.result);
//     return response.result;
//   }

//   console.log('Cannot find local game. Create a new one');
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
//     console.log(`Issues getting all board item: Error: ${error}`);
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
//     console.log(`Issues updating ship board: Error: ${error}`);
//     console.log(error);
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

//     const response = (await gamesDbTable.updateGame(
//       updatedGame,
//     )) as AppResponse;

//     if (!response.isSuccessfull) {
//       console.log('Cannot update game' + response.error);
//     }

//     return updatedGame;
//   } catch (error) {
//     console.log(`Issues updating ship board: Error: ${error}`);
//     console.log(error);
//     return game;
//   }
// };

// const updateGameInRemote = async (
//   game: Game,
// ) => {
//   try {
//     const response = (await gamesDbTable.updateGame(
//       game,
//     )) as AppResponse;

//     if (!response.isSuccessfull) {
//       console.log('Cannot update game' + response.error);
//     }
//   } catch (error) {
//     console.log(`Issues updating ship board: Error: ${error}`);
//     console.log(error);
//   }
// };

const gameService = {
  createPlayerTemplate,
  createGameTemplate,
  validateGame,
  createNewGameWithStoring,
  getPlayerPosition,
  updateGame,
  updatePlayer,
  getGameWithTracking,
  stopGameTracking,
  getPlayerOrDefault,

  // createNewGameWithStoring,
  // getRemoteGameById,
  // getGameFromStorage,
  // getUpdateGameOnPress,
  // setGameWithTracking,
  // updateGameOnBoardPress,
  // updateGameInLocalStorage,
  // updateGameInRemote,
};

export default gameService;
