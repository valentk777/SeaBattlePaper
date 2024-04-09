import {firebase} from '@react-native-firebase/database';
import {AppResponse} from '../../../entities/appResponse';
import timeService from '../../../services/timeService';
import {Game} from '../../../entities/game';
import {Alert} from 'react-native';
import {PlayerBoard} from '../../../entities/playerBoard';
import {PlayerPosition} from '../../../entities/playerPosition';

// https://rnfirebase.io/database/usage
const database = firebase
  .app()
  .database(
    'https://seabattlepaper-default-rtdb.europe-west1.firebasedatabase.app/',
  );

export const getGame = async (gameId: string) => {
  try {
    const snapshot = await database.ref(`activeGames/${gameId}`).once('value');
    const activeGame = snapshot.val() as Game;

    if (activeGame === undefined) {
      return {isSuccessfull: true, result: {} as Game} as AppResponse;
    }

    return {
      isSuccessfull: true,
      result: activeGame,
    } as AppResponse;
  } catch (error) {
    console.error(error);

    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

export const addGame = async (activeGame: Game) => {
  try {
    const gameKeyRef = database.ref(`lastActiveGameKey`);

    const lastActiveGameIdResult = await gameKeyRef.transaction(
      lastActiveGameId => lastActiveGameId + 1,
    );

    if (lastActiveGameIdResult.snapshot.val() === undefined) {
      return {isSuccessfull: false, error: 'cannot create id'} as AppResponse;
    }

    const newId = lastActiveGameIdResult.snapshot.val();

    activeGame.id = newId;
    activeGame.lastTimeUpdated = timeService.getCurrentDateString();

    const activeGamesRef = database.ref(`activeGames/${activeGame.id}`);

    await activeGamesRef.set(activeGame);

    return {isSuccessfull: true, result: activeGame} as AppResponse;
  } catch (error) {
    console.error(error);

    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

export const updateGame = async (activeGame: Game) => {
  if (activeGame === undefined) {
    return {
      isSuccessfull: false,
      error: 'cannot update empty game',
    } as AppResponse;
  }

  try {
    const databaseRef = database.ref(`activeGames/${activeGame.id}`);

    activeGame.lastTimeUpdated = timeService.getCurrentDateString();

    await databaseRef.update(activeGame);

    return {
      isSuccessfull: true,
      result: activeGame,
    } as AppResponse;
  } catch (error) {
    console.error(error);

    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

export const updatePlayer = async (
  gameId: string,
  player: PlayerBoard,
  playerPositionToUpdate: PlayerPosition,
) => {
  if (gameId === undefined) {
    return {
      isSuccessfull: false,
      error: 'cannot update unknown game',
    } as AppResponse;
  }

  if (player === undefined) {
    return {
      isSuccessfull: false,
      error: 'cannot update empty player information',
    } as AppResponse;
  }

  if (playerPositionToUpdate === undefined) {
    return {
      isSuccessfull: false,
      error: 'cannot update unknown player',
    } as AppResponse;
  }

  try {
    const databaseKey = playerPositionToUpdate === PlayerPosition.PlayerA ? `activeGames/${gameId}/playerA/` : `activeGames/${gameId}/playerB/`;
    const databaseRef = database.ref(databaseKey)
    await databaseRef.update(player);

    return {
      isSuccessfull: true,
      result: player,
    } as AppResponse;
  } catch (error) {
    console.error(error);

    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

export const getGameWithTracking = async (
  gameId: string,
  onRemoteGameUpdated: Function,
) => {
  try {
    const onValueChange = database.ref(`activeGames/${gameId}`).on('value', (snapshot: any) => {
      const activeGame = snapshot.val();

      if (activeGame === undefined) {
        console.log('Remote game undefined');

        onRemoteGameUpdated({id: gameId} as Game);
      }

      onRemoteGameUpdated(activeGame as Game);
    });

    return {isSuccessfull: true, result: onValueChange } as AppResponse;
  } catch (error) {
    console.error(error);

    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

export const stopGameTracking = async (
  gameId: string,
  functionToStopTracking: any,
) => {
  try {
    database.ref(`activeGames/${gameId}`).off('value', functionToStopTracking);

    return {isSuccessfull: true } as AppResponse;
  } catch (error) {
    console.error(error);

    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

// export const getAllActiveGames = async () => {
//   try {
//     const snapshot = await database.ref('activeGames').once('value');

//     if (snapshot.exists()) {
//       const activeGames = snapshot.val();

//       console.log('getAllActiveGames: ', activeGames);

//       if (activeGames === undefined) {
//         return {isSuccessfull: true, result: [] as Game[]} as AppResponse;
//       }

//       return {
//         isSuccessfull: true,
//         result: activeGames as Game[],
//       } as AppResponse;
//     } else {
//       console.log('not exist');
//       return {isSuccessfull: true, result: [] as Game[]} as AppResponse;
//     }
//   } catch (error) {
//     console.error(error);

//     return {isSuccessfull: false, error: error} as AppResponse;
//   }
// };

// export const removeActiveGame = async (
//   gameId: string
// ) => {
//   if (gameId == undefined || gameId === '' || gameId == null) {
//     console.log('Cannot find a game in remote database');

//     return;
//   }

//   try {
//     await gameRef.doc(gameId).delete();

//     console.log('Game successfully deleted');

//     return {isSuccessfull: true} as AppResponse;
//   } catch (error) {
//     console.log(error);

//     return {isSuccessfull: false, error: error} as AppResponse;
//   }
// };

const gamesDbTable = {
  getGame,
  addGame,
  updateGame,
  updatePlayer,
  getGameWithTracking,
  stopGameTracking,

  // getAllActiveGames,
};

export default gamesDbTable;
