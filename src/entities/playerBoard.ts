import {PlayerStatus} from './playerStatus';

export interface PlayerBoard {
  id: string; // board key. it will be gameid_userid
  status: PlayerStatus;
  ships: string[];
  attackedShips: string[];
  markedShips: string[];
}
