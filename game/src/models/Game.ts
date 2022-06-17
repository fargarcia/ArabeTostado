import { Player } from "./index"

export interface GameState {
    activePlayer: number,
    activeEntity: number
}

export type Game = {
    state: GameState,
    player: Player,
    oponent: Player
}