import { Game, Player, Hand, Deck, GameState, Card, CardContainer, MinionContainer } from "../models";
import { playableMinions, playableMinionsCards, samples } from 'constants/cards'

const player: Player = {
    id: 0,
    money: 50,
    health: 30,
    battlefield: new MinionContainer(samples.sampleMinions0),
    deck: new Deck(samples.sampleCards1),
    hand: new Hand(samples.sampleCards2)
}

const oponent: Player = {
    id: 1,
    money: 50,
    health: 30,
    battlefield: new MinionContainer(samples.sampleMinions3),
    deck: new Deck(samples.sampleCards4),
    hand: new Hand(samples.sampleCards5)
}

const state: GameState = {
    activePlayer: 0,
    activeEntity: -1
}

const initialState: Game = {
    state,
    player,
    oponent
}

export default initialState