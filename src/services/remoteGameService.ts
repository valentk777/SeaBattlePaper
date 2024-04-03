import {Alert} from 'react-native';
import {Game} from '../entities/game';
import gamesDbTable from '../external/database/gamesDbTable';

const getGame = async (gameId: string) => {
  const response = await gamesDbTable.getGame(gameId);

  if (response.isSuccessfull) {
    return response.result as Game;
  }

  Alert.alert('error creating game');
  return {} as Game;
};

const storeNewGame = async (game: Game) => {
  const response = await gamesDbTable.addGame(game);

  if (response.isSuccessfull) {
    return response.result as Game;
  }

  Alert.alert('error creating game');
  return {} as Game;
};

const remoteGameService = {
  getGame,
  storeNewGame,
};

export default remoteGameService;
