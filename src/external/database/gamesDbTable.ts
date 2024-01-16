import {firebase} from '@react-native-firebase/database'
import {AppResponse} from '../../entities/appResponse';
import timeService from '../../services/timeService';
import { Game } from '../../entities/game';

// https://rnfirebase.io/database/usage
const database = firebase.app().database('https://seabattlepaper-default-rtdb.europe-west1.firebasedatabase.app/');

export const getGame = async (gameId: string) => {
  try {
    const snapshot = await database.ref(`activeGames/${gameId}`).once('value');
    const activeGame = snapshot.val() as Game;

    console.log('getGame: ', activeGame);

    if (activeGame === undefined) {
      return {isSuccessfull: true, result: {} as Game} as AppResponse;
    }

    return {
      isSuccessfull: true,
      result: activeGame as Game,
    } as AppResponse;
  } catch (error) {
    console.error(error);

    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

export const getAllActiveGames = async () => {
  try {
    const snapshot = await database.ref('activeGames').once('value');

    if (snapshot.exists()) {
      const activeGames = snapshot.val();

      console.log('getAllActiveGames: ', activeGames);

      if (activeGames === undefined) {
        return {isSuccessfull: true, result: [] as Game[]} as AppResponse;
      }

      return {
        isSuccessfull: true,
        result: activeGames as Game[],
      } as AppResponse;
    } else {
      console.log('not exist');
      return {isSuccessfull: true, result: [] as Game[]} as AppResponse;
    }
  } catch (error) {
    console.error(error);

    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

export const setActiveGameOnChangeFuncion = async (gameId: string, setActiveGameOnChange: Function) => {
  try {
    database.ref(`activeGames/${gameId}`).on('value', (snapshot: any) => {
      const activeGame = snapshot.val();

      if (activeGame === undefined) {
        setActiveGameOnChange({} as Game);
        return;
      }

      setActiveGameOnChange(activeGame as Game);
    });
  } catch (error) {
    console.error(error);

    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

export const addActiveGame = async (activeGame: Game) => {
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

export const updateActiveGames = async (activeGame: Game) => {
  if (activeGame === undefined) {
    return {isSuccessfull: false, error: "cannot update empty game"} as AppResponse;
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
  getAllActiveGames,
  setActiveGameOnChangeFuncion,
  addActiveGame,
  updateActiveGames,
};

export default gamesDbTable;
