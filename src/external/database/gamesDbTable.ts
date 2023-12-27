import firestore from '@react-native-firebase/firestore';
import {AppResponse} from '../../entities/appResponse';
import {Game} from '../../entities/game';
import timeService from '../../services/timeService';

export const gameRef = firestore().collection('games');

export const getGames = async (userId: string) => {
  try {
    let response = await gameRef.doc(userId).get();

    if (response.exists) {
      const games = response.data()?.games;

      if (games === undefined) {
        return {isSuccessfull: true, result: [] as Game[]} as AppResponse;
      }

      return {
        isSuccessfull: true,
        result: games as Game[],
      } as AppResponse;
    } else {
      await addNewDbGames(userId);

      return {isSuccessfull: true, result: [] as Game[]} as AppResponse;
    }
  } catch (error) {
    console.error(error);

    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

export const addNewDbGames = async (userId: string) => {
  try {
    const dataWithOnlineStatus = {
      games: [] as Game[],
      lastTimeUpdated: timeService.getCurrentDateString(),
    };

    await gameRef.doc(userId).set(dataWithOnlineStatus, {merge: true});
    return {isSuccessfull: true} as AppResponse;
  } catch (error) {
    console.log(error);

    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

export const updateDbStoredGames = async (
  userId: string,
  games: Game[],
) => {
  if (userId == undefined || userId === '' || userId == null) {
    console.log('Cannot save to remote database');

    return;
  }

  const dataWithOnlineStatus = {
    games: games,
    lastTimeUpdated: timeService.getCurrentDateString(),
  };

  try {
    await gameRef.doc(userId).update(dataWithOnlineStatus);

    return {isSuccessfull: true} as AppResponse;
  } catch (error) {
    console.log(error);
    
    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

const gamesDbTable = {
  getGames,
  addNewDbGames,
  updateDbStoredGames,
};

export default gamesDbTable;
