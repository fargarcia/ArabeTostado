import { createAction, createReducer, current, PayloadAction } from "@reduxjs/toolkit";
import { PlayerActions } from "redux/player/playerReducer";

const selectEntity = createAction<number | undefined>('SELECT_ENTITY')

const selectEntityAction = (state: any, { payload }: PayloadAction<number>) => {
    return void (state.activeEntity = payload)

}
export default createReducer(
    {},
    {
        [selectEntity.type]: selectEntityAction
    }
);

export const GameActions = {
    selectEntity
}