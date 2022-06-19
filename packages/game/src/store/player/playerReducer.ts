import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { Player, Minion } from "models";

interface InitPlayerState {
    deck: number[]
    opener: boolean
}

const initPlayerStateAction = (state: any, { payload }: PayloadAction<InitPlayerState>) => {
    const newPlayer = new Player({
        id: payload.opener ? 1 : 2,
        cards: payload.deck
    })
    return newPlayer
}

const drawCardAction = (state: any) => {
    const player = new Player({ player: state })
    player.hand.addCard(player.deck.draw())
    return player
};

const selectEntityAction = (state: any, { payload }: PayloadAction<number>) => {
    const player = new Player({ player: state })
    player.battlefield.unselect()
    player.hand.unselect()
    const entity = player.battlefield.findById(payload) || player.hand.findById(payload)
    entity?.select()
    return player
};

const takeDamageAction = (state: any, { payload }: any) => {
    const player = new Player({ player: state })
    const minion: Minion = player.battlefield.findById(payload.id)!
    minion.takeDamage(payload.damageTaken, payload.attacker)
    if (minion.isDead()) player.battlefield.removeMinion(minion)
    player.battlefield.unselect()
    player.hand.unselect()
    return player
};

const playMinionAction = (state: any, { payload }: PayloadAction<any>) => {
    const player = new Player({ player: state })
    player.battlefield.addOnPostion(
        player.hand.playById(payload.card).entity as Minion,
        payload.index
    )
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
    initPlayerState: createAction<InitPlayerState>(`${player}_INIT_STATE`),
    drawCard: createAction(`${player}_DRAW_CARD`),
    selectEntity: createAction<number>(`${player}_SELECT_ENTITY`),
    takeDamage: createAction<any>(`${player}_TAKE_DAMAGE`),
    playMinion: createAction<any>(`${player}_PLAY_MINION`)
})

export const PlayerActions = Actions('PLAYER')
export const OponentActions = Actions('OPONENT')
