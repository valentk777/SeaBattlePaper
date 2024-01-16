import {Alert} from 'react-native';
import {BoardItem} from '../entities/boardItem';
import {getData, storeData} from './dataStorageService';
import { Game } from '../entities/game';

const generateNewShipBoard = () => {
  const customArray = [
    {
      location: '0',
      selected: false,
      fixed: true,
      value: '',
    } as BoardItem,
  ];

  // Add letters A to J
  for (let letterCode = 65; letterCode <= 74; letterCode++) {
    customArray.push({
      location: String.fromCharCode(letterCode),
      selected: false,
      fixed: true,
      value: String.fromCharCode(letterCode),
    } as BoardItem);
  }

  // Add numbers in the specified pattern
  for (let tens = 1; tens <= 9; tens++) {
    customArray.push({
      location: tens.toString(),
      selected: false,
      fixed: true,
      value: tens.toString(),
    } as BoardItem);

    for (let ones = 0; ones <= 9; ones++) {
      customArray.push({
        location: `${tens}${ones.toString()}`,
        selected: false,
        fixed: false,
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

const updateShipBoardItem = (shipBoard: BoardItem[], item: BoardItem) => {
  return shipBoard.map(currentItem =>
    currentItem.location === item.location ? item : currentItem,
  );
};


const shipBoardService = {
  generateNewShipBoard,
  getCurrentPlayerBoard,
  updateShipBoardItem,
};

export default shipBoardService;
