import {BoardItem} from '../entities/boardItem';
import {Game} from '../entities/game';
import gamesDbTable from '../integrations/repositories/remote/gamesDbTable';
import {BoardItemStatus} from '../entities/boardItemStatus';

const generateLetters = () => {
  const customArray = [] as string[];

  for (let letterCode = 65; letterCode <= 74; letterCode++) {
    customArray.push(String.fromCharCode(letterCode));
  }

  return customArray;
};

const generateNumbers = () => {
  const customArray = [] as string[];

  for (let tens = 1; tens <= 10; tens++) {
    customArray.push(tens.toString());
  }

  return customArray;
};

const generateNewShipBoard = () => {
  const customArray = [] as BoardItem[];

  for (let tens = 1; tens <= 10; tens++) {
    for (let ones = 0; ones <= 9; ones++) {
      customArray.push({
        location: `${tens}${ones.toString()}`,
        isShip: false,
        status: BoardItemStatus.NotSelected,
      } as BoardItem);
    }
  }

  return customArray;
};

// const generateNewShipBoardLocations = () => {
//   const customArray = [] as string [];

//   for (let tens = 1; tens <= 10; tens++) {
//     for (let ones = 0; ones <= 9; ones++) {
//       customArray.push(`${tens}${ones.toString()}`);
//     }
//   }

//   return customArray;
// };

// const getGameStorageKey = (userId: string, gameId: string) => {
//   return `${userId}/games/${gameId}`;
// };

// const getCurrentPlayerBoard = (game: Game, userId: string) => {
//   if (game?.playerA?.id === userId) {
//     return game.playerA.board;
//   }

//   if (game?.playerB?.id === userId) {
//     return game.playerB.board;
//   }

//   return generateNewShipBoard();
// }

// const getCompetitorPlayerBoard = (game: Game, userId: string) => {
//   if (game?.playerA?.id === userId) {
//     if (game?.playerB?.board === undefined) {
//       return generateNewShipBoard();
//     }

//     return game.playerB.board;
//   }

//   if (game?.playerB?.id === userId) {
//     if (game?.playerA?.board === undefined) {
//       return generateNewShipBoard();
//     }

//     return game.playerA.board;
//   }

//   return generateNewShipBoard();
// }

// const updateBoardSetupTile = (shipBoard: BoardItem[], item: BoardItem) => {
//   return shipBoard.map(currentItem =>
//     currentItem.location === item.location ? item : currentItem,
//   );
// };

const shipBoardService = {
  generateLetters,
  generateNumbers,
  generateNewShipBoard,

  // getCurrentPlayerBoard,
  // getCompetitorPlayerBoard,
  // updateBoardSetupTile,
  // publishPlayerBoardsetWithStoring,
  // generateNewShipBoardLocations,
};

export default shipBoardService;
