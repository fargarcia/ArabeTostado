import { Player } from "./index"

export type Game = {
    state: GameState,
    player: Player,
    oponent: Player
}

export class GameState {
    public activePlayer: number
    public activeEntity: number

    public constructor(activePlayer: boolean) {
        this.activePlayer = activePlayer ? 1 : 2
        this.activeEntity = 0
    }
}