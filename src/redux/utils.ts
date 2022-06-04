import { PlayerActions, OponentActions } from "./player/playerReducer"
import { GameActions } from "./game/gameReducer"
import { createSelector } from "@reduxjs/toolkit"
import { Player, GameState, Entity, Minion } from "models"


export const selectEntity = (dispatch: any, id: number) => {
    dispatch(PlayerActions.selectEntity(id))
    dispatch(GameActions.selectEntity(id))
}

export const attackEntity = (dispatch: any, attacker: Minion, target: Minion) => {
    dispatch(PlayerActions.takeDamage({ id: attacker.id, damage: target.getAttack() }))
    dispatch(OponentActions.takeDamage({ id: target.id, damage: attacker.getAttack() }))
}

