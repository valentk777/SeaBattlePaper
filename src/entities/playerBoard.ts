import {BoardItem} from './boardItem';
import {PlayerStatus} from './playerStatus';

export interface PlayerBoard {
  id: string;
  // playerName: string;
  status: PlayerStatus;
  board: BoardItem[];
}
