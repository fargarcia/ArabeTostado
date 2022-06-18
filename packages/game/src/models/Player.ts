import { Deck, Hand, MinionContainer } from "./index"
import { cloneDeep } from 'lodash';

export type Player = {
    id: number
    battlefield: MinionContainer,
    health: number,
    money: number,
    deck: Deck,
    hand: Hand
}

export const copyPlayer = (player: Player) => ({
    id: player.id,
    battlefield: player.battlefield.copy(),
    health: player.health,
    money: player.money,
    deck: player.deck.copy(),
    hand: player.hand.copy()
})