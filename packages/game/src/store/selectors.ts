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

export const winnerSelector = createSelector(
  selectGameState,
  selectPlayer,
  selectOponent,
  (gameState: GameState, player: Player, oponent: Player) =>
    gameState.oponentDisconnected || oponent.isDead() ? PLAYER : player.isDead() ? OPONENT : undefined
);
