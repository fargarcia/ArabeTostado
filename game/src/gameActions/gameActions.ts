export type GameAction = {
    type: string
    origin?: number
    target?: number
}

const ATTACK = 'attack'
const CAST_SPELL = 'castSpell'
const END_TURN = 'endTurn'
const HOVER_ENTITY = 'hoverEntity'
const PLAY_CARD = 'playCard'
const SELECT_ENTITY = 'selectEntity'
const SELECT_TARGET = 'selectTarget'


export const GAME_ACTIONS = {
    ATTACK,
    CAST_SPELL,
    END_TURN,
    HOVER_ENTITY,
    PLAY_CARD,
    SELECT_ENTITY,
    SELECT_TARGET
}

export const executeGameAction = (dispatch: any, action: GameAction, oponent?: boolean) => {
    switch (action.type) {
        case ATTACK:
        case CAST_SPELL:
        case END_TURN:
        case HOVER_ENTITY:
        case PLAY_CARD:
        case SELECT_ENTITY:
        case SELECT_TARGET:
        default:
    }
}
