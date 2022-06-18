import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { Card, Deck, Player, Hand, Game, MinionContainer, Minion } from "../../models";
import { createSlice, current } from "@reduxjs/toolkit";
import { cloneDeep, min } from 'lodash';
import { copyPlayer } from "../../models";
import { getDeck } from 'constants/cards'

const initPlayerStateAction = (state: any, { payload }: PayloadAction<number[]>) => ({
    id: 0,
    money: 1,
    health: 30,
    battlefield: new MinionContainer([]),
    deck: new Deck(getDeck(payload)),
    hand: new Hand([])
})

const drawCardAction = (state: any) => {
    const player = copyPlayer(state)
    player.hand.addCard(player.deck.draw())
    return player
};

const selectEntityAction = (state: any, { payload }: PayloadAction<number>) => {
    const player = copyPlayer(state)
    player.battlefield.unselect()
    player.hand.unselect()
    const entity = player.battlefield.findById(payload) || player.hand.findById(payload)
    entity?.select()
    return player
};

const takeDamageAction = (state: any, { payload }: any) => {
    const player = copyPlayer(state)
    const minion: Minion = player.battlefield.findById(payload.id)!
    minion.takeDamage(payload.damage, payload.attacker)
    if (minion.isDead()) player.battlefield.removeMinion(minion)
    player.battlefield.unselect()
    player.hand.unselect()
    return player
};

const playMinionAction = (state: any, { payload }: PayloadAction<any>) => {
    const player = copyPlayer(state)
    player.battlefield.addOnPostion(payload.card.entity as Minion, payload.index)
    player.hand.removeCard(payload.card)
    return player
}

export default (player: string) => createReducer(
    {},
    {
        [`${player}_INIT_STATE`]: initPlayerStateAction,
        [`${player}_DRAW_CARD`]: drawCardAction,
        [`${player}_SELECT_ENTITY`]: selectEntityAction,
        [`${player}_TAKE_DAMAGE`]: takeDamageAction,
        [`${player}_PLAY_MINION`]: playMinionAction
    }
);

const Actions = (player: string) => ({
    initPlayerState: createAction<number[]>(`${player}_INIT_STATE`),
    drawCard: createAction(`${player}_DRAW_CARD`),
    selectEntity: createAction<number>(`${player}_SELECT_ENTITY`),
    takeDamage: createAction<any>(`${player}_TAKE_DAMAGE`),
    playMinion: createAction<any>(`${player}_PLAY_MINION`)
})

export const PlayerActions = Actions('PLAYER')
export const OponentActions = Actions('OPONENT')
