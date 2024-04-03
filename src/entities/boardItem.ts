import { BoardItemStatus } from "./boardItemStatus";

export interface BoardItem {
  location: string; // board location
  isShip: boolean; // true if originally this is a part of ship
  status: BoardItemStatus; // this is a board item status based on user actions
}
