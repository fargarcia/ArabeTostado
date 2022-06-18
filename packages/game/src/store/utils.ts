import { PlayerActions, OponentActions } from "./player/playerReducer"
import { GameActions } from "./game/gameReducer"
import { createSelector } from "@reduxjs/toolkit"
import { GameState, Entity, Minion } from "models"

interface InitPlayerData {
    id: string
    deck: number[]
}

interface InitGameData {
    opener: number
    player: InitPlayerData
    oponent: InitPlayerData
}


export const selectEntity = (dispatch: any, id: number) => {
    dispatch(PlayerActions.selectEntity(id))
    dispatch(GameActions.selectEntity(id))
}

export const attackEntity = (dispatch: any, attacker: Minion, target: Minion, oponent: boolean = false) => {
    dispatch(GameActions.selectEntity())
    dispatch(PlayerActions.takeDamage({ id: attacker.id, damage: target.getAttack(), attacker: !oponent }))
    dispatch(OponentActions.takeDamage({ id: target.id, damage: attacker.getAttack(), attacker: oponent }))
}
