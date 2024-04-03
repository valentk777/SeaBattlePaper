import {firebase} from '@react-native-firebase/database'
import {AppResponse} from '../../entities/appResponse';
import timeService from '../../services/timeService';
import { Game } from '../../entities/game';
import { Alert } from 'react-native';

// https://rnfirebase.io/database/usage
const database = firebase.app().database('https://seabattlepaper-default-rtdb.europe-west1.firebasedatabase.app/');

export const getGame = async (gameId: string) => {
  try {
    const snapshot = await database.ref(`activeGames/${gameId}`).once('value');
    const activeGame = snapshot.val() as Game;

    Alert.alert('getGame: ', snapshot.val())

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








export const getAllActiveGames = async () => {
  try {
    const snapshot = await database.ref('activeGames').once('value');

    if (snapshot.exists()) {
      const activeGames = snapshot.val();

      Alert.alert('getAllActiveGames: ', activeGames);

      if (activeGames === undefined) {
        return {isSuccessfull: true, result: [] as Game[]} as AppResponse;
      }

      return {
        isSuccessfull: true,
        result: activeGames as Game[],
      } as AppResponse;
    } else {
      Alert.alert('not exist');
      return {isSuccessfull: true, result: [] as Game[]} as AppResponse;
    }
  } catch (error) {
    console.error(error);

    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

export const setGameWithTracking = async (gameId: string, setActiveGameOnChange: Function) => {
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

export const updateActiveGamePlayer = async (activeGame: Game, userId: string) => {
  if (activeGame === undefined) {
    return {isSuccessfull: false, error: "cannot update empty game"} as AppResponse;
  }

  try {
    if (activeGame?.playerA?.id === userId) {
      const databaseRef = database.ref(`activeGames/${activeGame.id}/playerA/`);
      await databaseRef.update(activeGame.playerA);
    } else if (activeGame?.playerB?.id === userId) {
      const databaseRef = database.ref(`activeGames/${activeGame.id}/playerB/`);
      await databaseRef.update(activeGame.playerB);
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

// export const removeActiveGame = async (
//   gameId: string
// ) => {
//   if (gameId == undefined || gameId === '' || gameId == null) {
//     Alert.alert('Cannot find a game in remote database');

//     return;
//   }

//   try {
//     await gameRef.doc(gameId).delete();

//     Alert.alert('Game successfully deleted');

//     return {isSuccessfull: true} as AppResponse;
//   } catch (error) {
//     Alert.alert(error);
    
//     return {isSuccessfull: false, error: error} as AppResponse;
//   }
// };

const gamesDbTable = {
  getGame,
  addGame,


  
  getAllActiveGames,
  setGameWithTracking,
  updateActiveGames,
  updateActiveGamePlayer,
};

export default gamesDbTable;
