import { Deck, Hand, MinionContainer, Entity } from "./index"
import { cloneDeep } from 'lodash';
import Battlefield from "app/components/battlefield";
import { getDeck } from 'constants/cards'

/*export type Player = {
    id: number
    battlefield: MinionContainer,
    health: number,
    money: number,
    deck: Deck,
    hand: Hand
}
*/
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
    opener: boolean
}

export class Player extends Entity {
    id: number
    battlefield: MinionContainer
    currentId: number
    currentMoney: number
    health: number
    money: number
    deck: Deck
    hand: Hand
    

    public constructor(playerProps: PlayerProps) {
        super()
        this.id = playerProps.opener ? 1 : 2
        this.battlefield = new MinionContainer([])
        this.currentId = this.id
        this.currentMoney = 1
        this.deck = new Deck(getDeck(playerProps.deck))
        this.hand = new Hand([])
        this.health = 30
        this.money = 1
    }
}