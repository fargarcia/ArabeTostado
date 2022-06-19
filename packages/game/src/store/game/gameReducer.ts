import { createAction, createReducer, current, PayloadAction } from "@reduxjs/toolkit";
import { GameState } from "models/Game";
import { PlayerActions } from "store/player/playerReducer";

const selectEntity = createAction<number | undefined>('SELECT_ENTITY')
const initGameState = createAction<boolean>('INIT_GAME_STATE')

const selectEntityAction = (state: any, { payload }: PayloadAction<number>) => {
    const newGameState = new GameState(state)
    newGameState.setActiveEntity(payload)
    return newGameState
}

const initGameStateAction = (state: any, { payload }: PayloadAction<boolean>) => {
    const newGameState = new GameState({ activePlayer: payload })
    return newGameState
}

export default createReducer(
    {},
    {
        [selectEntity.type]: selectEntityAction,
        [initGameState.type]: initGameStateAction
    }
);

export const GameActions = {
    selectEntity,
    initGameState
}