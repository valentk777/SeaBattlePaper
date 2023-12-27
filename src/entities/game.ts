import {ProgressStatus} from './progressStatus';

export interface Game {
  id: string;
  title: string;
  // image: string;
  timeCreated: string;
  lastTimeUpdated: string;
  // currentValue: number;
  // initialValue: number;
  // targetValue: number;
  // favorite: boolean;
  status: ProgressStatus;
}
