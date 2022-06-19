import { createSelector } from "@reduxjs/toolkit"
import { Entity } from "models/Entity"
import { Game, GameState } from "models/Game"
import { Player } from "models/Player"

export const selectGameState = (store: Game) => store.gameState
export const selectPlayer = (store: Game) => store.player
export const selectOponent = (store: Game) => store.oponent
export const selectActiveEntity = createSelector(
    selectGameState,
    selectPlayer,
    selectOponent,
    (gameState: GameState, player: Player, oponent: Player) =>
        (gameState.activePlayer ? player : oponent).battlefield.findById(gameState.activeEntity) ||
        (gameState.activePlayer ? player : oponent).hand.findById(gameState.activeEntity) ||
        new Entity()

)
export const selectActivePlayer = createSelector(
    selectGameState, (gameState: GameState) => gameState.activePlayer
)
