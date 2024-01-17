export interface BoardItem {
  location: string; // board location key
  isShip: boolean; // true if originally this this a part of ship
  isAttacked: boolean; // true if attacked by oponent
  // isVisible: boolean;
  isFixed: boolean; // is selectable. used for letters and numbers areas
  isMarked: boolean; // is marked for this user. if it not attacked, it can be anything. maybe user marked field for the future wihtout actual attack
  value: string; // value in rendering. maybe use dot on hit
  // selected: boolean;
}
