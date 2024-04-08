import {Alert} from 'react-native';
import {Game} from '../entities/game';
import gamesDbTable from '../integrations/repositories/remote/gamesDbTable';
import {PlayerBoard} from '../entities/playerBoard';
import {PlayerPosition} from '../entities/playerPosition';

const getGame = async (gameId: string) => {
  const response = await gamesDbTable.getGame(gameId);

  if (response.isSuccessfull) {
    return response.result as Game;
  }

  console.error('error creating game', response.error);
  return {} as Game;
};

const storeNewGame = async (game: Game) => {
  const response = await gamesDbTable.addGame(game);

  if (response.isSuccessfull) {
    return response.result as Game;
  }

  console.error('error creating game', response.error);
  return {} as Game;
};

const updateGame = async (game: Game) => {
  const response = await gamesDbTable.updateGame(game);

  if (response.isSuccessfull) {
    return response.result as Game;
  }

  console.error('error updating game', response.error);
  return {} as Game;
};

const updatePlayer = async (
  gameId: string,
  player: PlayerBoard,
  playerPositionToUpdate: PlayerPosition,
) => {
  const response = await gamesDbTable.updatePlayer(
    gameId,
    player,
    playerPositionToUpdate,
  );

  if (response.isSuccessfull) {
    return response.result as Game;
  }

  console.error('error updating player', response.error);
  return {} as Game;
};

const getGameWithTracking = async (
  gameId: string,
  onRemoteGameUpdated: Function,
) => {
  const response = await gamesDbTable.getGameWithTracking(
    gameId,
    onRemoteGameUpdated,
  );

  if (response.isSuccessfull) {
    return response.result;
  }

  console.error('error getting game with tracking', response.error);

  return {} as Game;
};

const stopGameTracking = async (
  gameId: string,
  functionToStopTracking: any,
) => {
  const response = await gamesDbTable.stopGameTracking(
    gameId,
    functionToStopTracking,
  );

  if (response.isSuccessfull) {
    return response.result;
  }

  console.error('error stopping game with tracking');

  return {} as Game;
};

const remoteGameService = {
  getGame,
  storeNewGame,
  updateGame,
  updatePlayer,
  getGameWithTracking,
  stopGameTracking,
};

export default remoteGameService;
