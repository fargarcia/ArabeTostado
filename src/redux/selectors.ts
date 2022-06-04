import { createSelector } from "@reduxjs/toolkit"
import { Entity } from "models/Entity"
import { GameState } from "models/Game"
import { Player } from "models/Player"

const selectGameState = (store: any) => store.state
const selectPlayer = (store: any) => store.player
const selectOponent = (store: any) => store.oponent

export const selectActiveEntity = createSelector(
    selectGameState,
    selectPlayer,
    (state: GameState, player: Player) =>
        player.battlefield.findById(state.activeEntity) || player.hand.findById(state.activeEntity) || new Entity()
)