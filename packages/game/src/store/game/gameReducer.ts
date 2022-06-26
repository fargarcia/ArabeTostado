import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from 'models/Game';
import {
  INIT_GAME_STATE,
  OPONENT_HAS_DISCONNECTED,
  RESET_STATE,
  SELECT_ENTITY,
  SWITCH_ACTIVE_PLAYER,
} from './constants';

const initGameStateAction = (gameState: any, { payload }: PayloadAction<boolean>) => {
  const newGameState = new GameState({ activePlayer: payload });
  return newGameState;
};

const switchActivePlayerAction = (gameState: any) => {
  const newGameState = new GameState(gameState);
  newGameState.switchActivePlayer();
  return newGameState;
};

const oponentHasDisconnectedAction = (gameState: any) => {
  const newGameState = new GameState(gameState);
  newGameState.oponentHasDisconnected();
  return newGameState;
};

const resetStateAction = () => ({});

export default createReducer(
  {},
  {
    [INIT_GAME_STATE]: initGameStateAction,
    [SWITCH_ACTIVE_PLAYER]: switchActivePlayerAction,
    [OPONENT_HAS_DISCONNECTED]: oponentHasDisconnectedAction,
    [RESET_STATE]: resetStateAction,
  }
);

export const GameActions = {
  initGameState: createAction<boolean>(INIT_GAME_STATE),
  oponenetHasDisconnected: createAction(OPONENT_HAS_DISCONNECTED),
  resetState: createAction(RESET_STATE),
  selectEntity: createAction<number | undefined>(SELECT_ENTITY),
  switchActivePlayer: createAction(SWITCH_ACTIVE_PLAYER),
};
