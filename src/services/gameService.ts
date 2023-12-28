import { Game } from '../entities/game';
import { AppResponse } from '../entities/appResponse';
import activeGamesDbTable from '../external/database/activeGamesDbTable';
import {getData, storeData} from './dataStorageService';
import { ProgressStatus } from '../entities/progressStatus';
import timeService from './timeService';

// const initActiveGameTable = async (userId: string) => {
//     const response = await activeGamesDbTable.addActiveGame(userId);
//     let challenges = [] as Challenge[];
  
//     if (response.isSuccessfull) {
//       challenges = response.result as Challenge[];
//     }
  
//     await storeData('challenges', challenges);
  
//     return challenges;
//   };


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

const createNewGame = async (userId: string, setActiveGameOnChange: Function) => {
    const newGame = {
      playerA : userId, 
      timeCreated : timeService.getCurrentDateString(),
      status: ProgressStatus.Created,
    } as Game;

    const response = await activeGamesDbTable.addActiveGame(newGame);

    if (response.isSuccessfull) {
      await activeGamesDbTable.getActiveGame(response.result.id, setActiveGameOnChange);
    } else {
      console.log("error creating game");
    }
}

const getGameIfPossible = async (userId: string, gameId: string) => {
    const response = await activeGamesDbTable.getGame(gameId) as AppResponse;

    if (response.isSuccessfull) {
      const candidateGame = response.result as Game;

      if (candidateGame.status == ProgressStatus.Completed) {
        console.log("Game already completed");
        return {};
      }

      if (candidateGame.status == ProgressStatus.Started) {
        console.log("player can join to empty game");

        return candidateGame;
      }

      if (candidateGame.playerA == userId || candidateGame.playerB == userId) {
        console.log("game is for current player");

        return candidateGame;
      }

      console.log("game is not for current player");
      return {};
    } else {
      console.log("error creating game");
      return {};
    }
}

const gameService = {
    // getGameKey,
    createNewGame,
    getGameIfPossible,
  };
  
  export default gameService;
  