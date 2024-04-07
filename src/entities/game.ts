import {PlayerBoard} from './playerBoard';
import {GameProgress} from './gameProgress';
import { PlayerPosition } from './playerPosition';

export interface Game {
  id: string;
  // title: string;
  playerA: PlayerBoard;
  playerB: PlayerBoard;
  status: GameProgress;
  turn: PlayerPosition;
  timeCreated: string;
  lastTimeUpdated: string;
}
