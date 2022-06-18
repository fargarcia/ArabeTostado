import { GameActions, PlayerActions, OponentActions } from "store"
import { Minion, Player } from "models"
import { GAME_ACTIONS } from "shared/gameActions"

interface GameActionPayload {
    origin?: Minion
    target?: Minion | Player
}

export type GameAction = {
    type: string
    payload: GameActionPayload
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
    const { origin, target} = action.payload

    switch (action.type) {
        case ATTACK:
            dispatch(GameActions.selectEntity())
            dispatch(PlayerActions.takeDamage({ id: origin!.id, damage: (typeof target === Minion)?target.getAttack():0, attacker: !oponent }))
            dispatch(OponentActions.takeDamage({ id: target.id, damage: origin!.getAttack(), attacker: oponent }))
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
