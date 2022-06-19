import { Deck, Hand, MinionContainer } from "./index"
import { getDeck } from 'constants/cards'
import { Entity } from "./Entity";
import { Entities } from "constants/entities";

interface Props {
    battlefield?: MinionContainer
    cards?: number[]
    currentId?: number
    currentMoney?: number
    deck?: Deck
    health?: number
    id?: number
    money?: number
    hand?: Hand
    player?: Player
}

export class Player extends Entity {
    private _battlefield: MinionContainer
    private _currentId: number
    private _currentMoney: number
    private _health: number
    private _money: number
    private _deck: Deck
    private _hand: Hand

    constructor(props: Props) {
        super()
        const { player, id, cards } = props
        this._id = player?.id || id!
        this._battlefield = new MinionContainer(player?.battlefield || [])
        this._currentId = player?.currentId || this.id
        this._currentMoney = player?.currentMoney || 1
        this._deck = new Deck(player?.deck || getDeck(cards!))
        this._hand = new Hand(player?.hand || [])
        this._health = player?.health || 30
        this._money = player?.money || 1
        this._type = Entities.PLAYER
    }

    get attack() { return 0 }
    get battlefield() { return this._battlefield }
    get currentId() { return this._currentId }
    get currentMoney() { return this._currentMoney }
    get deck() { return this._deck }
    get hand() { return this._hand }
    get health() { return this._health }
    get money() { return this._money }


}