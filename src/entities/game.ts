import {PlayerBoard} from './playerBoard';
import {GameProgress} from './gameProgress';

export interface Game {
  id: string;
  // title: string;
  playerA: PlayerBoard;
  playerB: PlayerBoard;
  status: GameProgress;
  timeCreated: string;
  lastTimeUpdated: string;
}
