import { createAction, createReducer, current, PayloadAction } from "@reduxjs/toolkit";
import { GameState } from "models/Game";
import { PlayerActions } from "store/player/playerReducer";

const selectEntity = createAction<number | undefined>('SELECT_ENTITY')
const initGameState = createAction<number>('INIT_GAME_STATE')

const selectEntityAction = (state: any, { payload }: PayloadAction<number>) => {
    return void (state.activeEntity = payload)
}

const initGameStateAction = (state: any, { payload }: PayloadAction<number>) => ({
    activePlayer: payload,
    activeEntity: -1
})

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