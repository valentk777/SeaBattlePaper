import {PlayerStatus} from './playerStatus';

export interface PlayerBoard {
  id: string;
  status: PlayerStatus;
  ships: string[];
  attackedShips: string[];
  markedShips: string[];
  // board: BoardItem[];
}
