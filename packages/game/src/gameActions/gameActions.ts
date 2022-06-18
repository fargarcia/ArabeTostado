import { GameActions, PlayerActions, OponentActions } from "store"
import { Minion } from "models"
import { GAME_ACTIONS } from "shared/gameActions"

export type GameAction = {
    type: string
    payload: object
}

const ATTACK = 'attack'
const CAST_SPELL = 'castSpell'
const END_TURN = 'endTurn'
const HOVER_ENTITY = 'hoverEntity'
const PLAY_CARD = 'playCard'
const SELECT_ENTITY = 'selectEntity'
const SELECT_TARGET = 'selectTarget'
const INIT_GAME = 'initGame'

interface InitPlayerData {
    id: string
    deck: number[]
}

interface InitGameData {
    opener: boolean
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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export const executeGameAction = async (dispatch: any, action: GameAction) => {
    switch (action.type) {
        case ATTACK:
        case CAST_SPELL:
        case END_TURN:
        case HOVER_ENTITY:
        case PLAY_CARD:
        case SELECT_ENTITY:
        case SELECT_TARGET:
        case INIT_GAME:
            const gameData = action.payload as InitGameData
            dispatch(PlayerActions.initPlayerState({deck: gameData.player.deck, opener: gameData.opener}))
            dispatch(OponentActions.initPlayerState({deck: gameData.oponent.deck, opener: !gameData.opener}))
            for (let i = 0; i < 3; i++) {
                await delay(500)
                dispatch(PlayerActions.drawCard())
                dispatch(OponentActions.drawCard())
            }
            await delay(500)
            dispatch((!gameData.opener ? PlayerActions : OponentActions).drawCard())
            dispatch(GameActions.initGameState(gameData.opener))
            return
        default:
    }
}
