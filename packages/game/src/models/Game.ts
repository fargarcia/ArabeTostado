import { Player } from "./index"

export type Game = {
    state: GameState,
    player: Player,
    oponent: Player
}

interface Props {
    activeEntity?: number
    activePlayer?: boolean
    gameState?: GameState
}

export class GameState {
    public _activePlayer: boolean
    public _activeEntity: number

    public constructor(props: Props) {
        this._activePlayer = props.gameState?.activePlayer || props.activePlayer!
        this._activeEntity = props.gameState?.activeEntity || 0
    }

    get activePlayer() { return this._activePlayer }
    get activeEntity() { return this._activeEntity }

    public setActiveEntity = (activeEntity: number) => this._activeEntity = activeEntity
    public switchActivePlayer = () => this._activePlayer = !this._activePlayer
}