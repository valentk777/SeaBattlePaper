import {PlayerBoard} from './playerBoard';
import {GameProgress} from './gameProgress';

export interface Game {
  id: string;
  // title: string;
  playerA: string; // board key. it will be gameid_userid
  playerB: string; // board key. it will be gameid_userid
  status: GameProgress;
  timeCreated: string;
  lastTimeUpdated: string;
}
