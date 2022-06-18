import { Deck, Hand, MinionContainer } from "./index"
import { getDeck } from 'constants/cards'
import { Entity } from "./Entity";

export const copyPlayer = (player: Player) => ({
    id: player.id,
    battlefield: player.battlefield.copy(),
    health: player.health,
    money: player.money,
    deck: player.deck.copy(),
    hand: player.hand.copy()
})

interface PlayerProps {
    id: number
    deck: number[]
}

export class Player extends Entity {
    public id: number
    public battlefield: MinionContainer
    public currentId: number
    public currentMoney: number
    public health: number
    public money: number
    public deck: Deck
    public hand: Hand
    

    public constructor(playerProps: PlayerProps) {
        super()
        this.id = playerProps.id
        this.battlefield = new MinionContainer([])
        this.currentId = this.id
        this.currentMoney = 1
        this.deck = new Deck(getDeck(playerProps.deck))
        this.hand = new Hand([])
        this.health = 30
        this.money = 1
    }
}