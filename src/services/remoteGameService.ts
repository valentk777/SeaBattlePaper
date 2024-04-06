import {Alert} from 'react-native';
import {Game} from '../entities/game';
import gamesDbTable from '../external/database/gamesDbTable';
import { PlayerBoard } from '../entities/playerBoard';
import { PlayerPosition } from '../entities/playerPosition';

const getGame = async (gameId: string) => {
  const response = await gamesDbTable.getGame(gameId);

  if (response.isSuccessfull) {
    return response.result as Game;
  }

  console.log('error creating game');
  return {} as Game;
};

const storeNewGame = async (game: Game) => {
  const response = await gamesDbTable.addGame(game);

  if (response.isSuccessfull) {
    return response.result as Game;
  }

  console.log('error creating game');
  return {} as Game;
};

const updateGame = async (game: Game) => {
  const response = await gamesDbTable.updateGame(game);

  if (response.isSuccessfull) {
    return response.result as Game;
  }

  console.log('error updating game');
  return {} as Game;
};

const updatePlayer = async (gameId: string, player: PlayerBoard, playerPositionToUpdate: PlayerPosition) => {
  const response = await gamesDbTable.updatePlayer(gameId, player, playerPositionToUpdate);

  if (response.isSuccessfull) {
    return response.result as Game;
  }

  console.log('error updating player');
  return {} as Game;
};


const remoteGameService = {
  getGame,
  storeNewGame,
  updateGame,
  updatePlayer,
};

export default remoteGameService;
