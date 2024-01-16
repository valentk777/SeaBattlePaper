import React, { createContext } from 'react'
import { Game } from '../entities/game';

interface ActiveGameContextProvider {
  game: Game;
  updateGame: (newGame: Game) => void;
}

export const ActiveGameContext = createContext<ActiveGameContextProvider>({
    game: {} as Game,
    updateGame: (newGame: Game) => { },
});
