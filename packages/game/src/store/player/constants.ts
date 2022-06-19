
export const ACTIONS = (player: string) => ({
    PLAYER_INIT_STATE: `${player}_INIT_STATE`,
    PLAYER_DRAW_CARD: `${player}_DRAW_CARD`,
    PLAYER_SELECT_ENTITY: `${player}_SELECT_ENTITY`,
    PLAYER_PLAY_MINION: `${player}_PLAY_MINION`,
    PLAYER_START_TURN: `${player}_START_TURN`,
    PLAYER_TAKE_DAMAGE: `${player}_TAKE_DAMAGE`,
})

export const PLAYER = 'player'
export const OPONENT = 'oponent'

export interface InitPlayerState {
    deck: number[]
    opener: boolean
}

export interface TakeDamageAction {
    attacker: boolean
    id: number
    damageTaken: number
}

export interface PlayMinion {
    id: number
    cost: number
    index: number
}