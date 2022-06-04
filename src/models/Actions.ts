export type Action = {
    type: string
    origin?: number
    target?: number
}

const ATTACK = 'attack'
const CAST_SPELL = 'castSpell'
const END_TURN = 'endTurn'
const PLAY_CARD = 'playCard'

export const ACTIONS = [ATTACK, CAST_SPELL, END_TURN, PLAY_CARD]