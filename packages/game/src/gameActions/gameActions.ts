import { GameActions, PlayerActions, OponentActions } from "store"
import { Card, Entity, Minion, Player } from "models"
import { GAME_ACTIONS } from "shared/gameActions"
import { ENTITY_TYPES } from "constants/entities";
import { sendAction } from "socket"

interface InitPlayerData {
    id: string
    deck: number[]
}

interface GameActionPayload {
    origin?: any
    target?: any
    opener?: boolean
    player?: InitPlayerData
    oponent?: InitPlayerData
}


export type GameAction = {
    type: string
    payload?: GameActionPayload
}

const {
    ATTACK,
    CAST_SPELL,
    END_TURN,
    HOVER_ENTITY,
    PLAY_CARD,
    SELECT_ENTITY,
    SELECT_TARGET,
    INIT_GAME
} = GAME_ACTIONS

const {
    PLAYER,
    CARD,
    MINION,
    SPELL
} = ENTITY_TYPES

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const executeGameAction = async (dispatch: Function, action: GameAction, fromOponent?: boolean) => {
    let { origin, target, player, oponent, opener } = action.payload || {}
    if (!fromOponent) sendAction(action)
    switch (action.type) {
        case ATTACK:
            dispatch(GameActions.selectEntity())
            dispatch(PlayerActions.takeDamage(fromOponent ? target : origin))
            dispatch(OponentActions.takeDamage(fromOponent ? origin : target))
            return
        case CAST_SPELL:
        case END_TURN:
            dispatch(GameActions.selectEntity())
            dispatch((fromOponent ? OponentActions : PlayerActions).selectEntity())
            dispatch((fromOponent ? PlayerActions : OponentActions).startTurn())
            dispatch(GameActions.switchActivePlayer())
            return
        case HOVER_ENTITY:
        case PLAY_CARD:
            dispatch(GameActions.selectEntity())
            dispatch((fromOponent ? OponentActions : PlayerActions).playMinion({
                ...origin,
                index: target as number
            }))
            return
        case SELECT_ENTITY:
            target = target as number
            dispatch((fromOponent ? OponentActions : PlayerActions).selectEntity(target))
            dispatch(GameActions.selectEntity(target))
            return
        case SELECT_TARGET:
        case INIT_GAME:
            dispatch(PlayerActions.initPlayerState({ deck: player!.deck, opener: opener! }))
            dispatch(OponentActions.initPlayerState({ deck: oponent!.deck, opener: !opener }))
            for (let i = 0; i < 3; i++) {
                await delay(500)
                dispatch(PlayerActions.drawCard())
                dispatch(OponentActions.drawCard())
            }
            await delay(500)
            dispatch((opener ? OponentActions : PlayerActions).drawCard())
            dispatch(GameActions.initGameState(opener!))
            return
        default:
    }
}
