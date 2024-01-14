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
      console.log("cia");
  
      console.log(response);
  
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

      if (candidateGame.playerA == userId) {
        console.log("Host can re-join to active the game");

        return candidateGame;
      }

      if (candidateGame.playerB == userId) {
        console.log("Player can re-join to active the game");

        return candidateGame;
      }

      if (candidateGame.playerB == undefined) {
        console.log("Player joined as a second player");

        return candidateGame;
      }

      console.log("game is not for current player");
      return {};
    } else {
      console.log("error creating game");
      return {};
    }
}

const tryJoinToGame = async (userId: string, game: Game) => {
  if (game.playerA == userId) {
    console.log("Host can re-join to active the game");
    // TODO: think about player object and update actual player status here. it would be useful if player disconects from game.
    return true;
  }

  if (game.playerB == userId) {
    console.log("Player can re-join to active the game");
    // TODO: think about player object and update actual player status here. it would be useful if player disconects from game.
    return true;
  }

  if (game.playerB == undefined) {
    console.log("Player joined as a second player");

    game.playerB = userId;

    const response = await activeGamesDbTable.updateActiveGames(game) as AppResponse;

    if (!response.isSuccessfull){
      console.log("Cannot join to the game" + response.error);
    }

    return response.isSuccessfull;
  }

  return false;
}

const gameService = {
    // getGameKey,
    createNewGame,
    getGameIfPossible,
    tryJoinToGame,
  };
  
  export default gameService;
  