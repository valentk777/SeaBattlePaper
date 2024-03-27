import {PlayerStatus} from './playerStatus';

export interface PlayerBoard {
  id: string; // gameid_userid
  status: PlayerStatus;
  ships: string[];
  attackedShips: string[];
  markedShips: string[];
  // board: BoardItem[];
}
