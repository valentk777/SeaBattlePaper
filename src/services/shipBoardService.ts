import {Alert} from 'react-native';
import {BoardItem} from '../entities/boardItem';
import {getData, storeData} from './dataStorageService';
import { Game } from '../entities/game';
import gamesDbTable from '../external/database/gamesDbTable';

const getGameStorageKey = (userId: string, gameId: string) => {
  return `${userId}/games/${gameId}`;
};

const generateLetters = () => {
  const customArray = [] as string [];

  for (let letterCode = 65; letterCode <= 74; letterCode++) {
    customArray.push(String.fromCharCode(letterCode));
  }

  return customArray;
}

const generateNumbers = () => {
  const customArray = [] as string [];

  for (let tens = 1; tens <= 10; tens++) {
    customArray.push(tens.toString());
  }

  return customArray;
}

const generateNewShipBoardLocations = () => {
  const customArray = [] as string [];

  for (let tens = 1; tens <= 10; tens++) {
    for (let ones = 0; ones <= 9; ones++) {
      customArray.push(`${tens}${ones.toString()}`);
    }
  }

  return customArray;
};

const generateNewShipBoard = () => {
  // raides ir skaicius sonuose generuoti paciame map'e o ne cia.
    // const shipMap = new Map();

  // for (let tens = 1; tens <= 10; tens++) {


// pakeisti boolean i enum'us. attacked, ship, marked. display_type
  // }


  const customArray = [
    {
      location: '0',
      isShip: false,
      isAttacked: false,
      isFixed: true,
      isMarked: false,
      value: '',
    } as BoardItem,
  ];

  // Add letters A to J
  for (let letterCode = 65; letterCode <= 74; letterCode++) {
    customArray.push({
      location: String.fromCharCode(letterCode),
      isShip: false,
      isAttacked: false,
      isFixed: true,
      isMarked: false,
      value: String.fromCharCode(letterCode),
    } as BoardItem);
  }

  // Add numbers in the specified pattern
  for (let tens = 1; tens <= 10; tens++) {
    customArray.push({
      location: tens.toString(),
      isShip: false,
      isAttacked: false,
      isFixed: true,
      isMarked: false,
      value: tens.toString(),
    } as BoardItem);

    for (let ones = 0; ones <= 9; ones++) {
      customArray.push({
        location: `${tens}${ones.toString()}`,
        isShip: false,
        isAttacked: false,
        isFixed: false,
        isMarked: false,
        value: '',
      } as BoardItem);
    }
  }

  return customArray;
};

const getCurrentPlayerBoard = (game: Game, userId: string) => {
  if (game?.playerA?.id === userId) {
    return game.playerA.board;
  }

  if (game?.playerB?.id === userId) {
    return game.playerB.board;
  }

  return generateNewShipBoard();
}

const getCompetitorPlayerBoard = (game: Game, userId: string) => {
  if (game?.playerA?.id === userId) {
    if (game?.playerB?.board === undefined) {
      return generateNewShipBoard();
    }

    return game.playerB.board;
  }

  if (game?.playerB?.id === userId) {
    if (game?.playerA?.board === undefined) {
      return generateNewShipBoard();
    }

    return game.playerA.board;
  }

  return generateNewShipBoard();
}

const updateShipBoardItem = (shipBoard: BoardItem[], item: BoardItem) => {
  return shipBoard.map(currentItem =>
    currentItem.location === item.location ? item : currentItem,
  );
};

const publishPlayerBoardsetWithStoring = async (game: Game, userId: string) => {
  try {
    await gamesDbTable.updateActiveGamePlayer(game, userId);

    if (game?.playerA?.id === userId) {
      await storeData(
        `${getGameStorageKey(userId, game.id)}/playerA`,
        game.playerA,
      );
    } else if (game?.playerB?.id === userId) {
      await storeData(
        `${getGameStorageKey(userId, game.id)}/playerB`,
        game.playerA,
      );
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const shipBoardService = {
  generateLetters,
  generateNumbers,



  generateNewShipBoard,
  getCurrentPlayerBoard,
  getCompetitorPlayerBoard,
  updateShipBoardItem,
  publishPlayerBoardsetWithStoring,
  generateNewShipBoardLocations,
};

export default shipBoardService;
