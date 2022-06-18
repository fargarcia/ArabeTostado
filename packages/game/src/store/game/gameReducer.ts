import { createAction, createReducer, current, PayloadAction } from "@reduxjs/toolkit";
import { GameState } from "models/Game";
import { PlayerActions } from "store/player/playerReducer";

const selectEntity = createAction<number | undefined>('SELECT_ENTITY')
const initGameState = createAction<boolean>('INIT_GAME_STATE')

const selectEntityAction = (state: any, { payload }: PayloadAction<number>) => {
    return void (state.activeEntity = payload)
}

const initGameStateAction = (state: any, { payload }: PayloadAction<boolean>) => new GameState(payload)

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