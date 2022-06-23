import { createSelector } from '@reduxjs/toolkit';
import { Game, GameState } from 'models/Game';
import { Player } from 'models/Player';
import { PLAYER, OPONENT } from 'constants/players';

export const selectGameState = (store: Game) => store.gameState;
export const selectPlayer = (store: Game) => store.player;
export const selectOponent = (store: Game) => store.oponent;

export const selectActivePlayer = createSelector(
  selectGameState,
  (gameState: GameState) => gameState.activePlayer
);

export const winnerSelector = createSelector(selectPlayer, selectOponent, (player: Player, oponent: Player) =>
  player.isDead() ? OPONENT : oponent.isDead() ? PLAYER : undefined
);
