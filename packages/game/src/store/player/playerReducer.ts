import { ACTIONS, InitPlayerState, PlayMinion, TakeDamageAction } from './constants';
import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { ENTITY_TYPES } from 'constants/entities';
import { Player, Minion } from 'models';
import { PLAYER, OPONENT } from 'constants/players';

const initPlayerStateAction = (player: any, { payload }: PayloadAction<InitPlayerState>) => {
  const newPlayer = new Player({
    id: payload.opener ? 1 : 2,
    cards: payload.deck,
    maxMoney: payload.opener ? 1 : 0,
  });
  return newPlayer;
};

const drawCardAction = (player: any) => {
  const newPlayer = new Player({ player });
  newPlayer.draw();
  return newPlayer;
};

const selectEntityAction = (player: any, { payload }: PayloadAction<number | undefined>) => {
  const newPlayer = new Player({ player });
  if (payload) {
    const target = newPlayer.findById(payload)!;
    if (!target?.isSelected) newPlayer.unselect();
    target.select();
  } else newPlayer.unselect();
  return newPlayer;
};

const takeDamageAction = (player: any, { payload }: PayloadAction<TakeDamageAction>) => {
  const newPlayer = new Player({ player });
  const entity = newPlayer.findById(payload.id);
  if (entity && entity.type === ENTITY_TYPES.PLAYER) {
    (entity as Player).takeDamage(payload.damageTaken);
  } else {
    (entity as Minion).takeDamage(payload.damageTaken, payload.attacker);
    if ((entity as Minion).isDead()) newPlayer.battlefield.removeMinion(entity as Minion);
  }
  newPlayer.unselect();
  return newPlayer;
};

const playMinionAction = (player: any, { payload }: PayloadAction<PlayMinion>) => {
  const newPlayer = new Player({ player });
  newPlayer.substractMoney(payload.cost);
  const minion = newPlayer.hand.playById(payload.id)?.entity;
  minion && newPlayer.battlefield.addOnPostion(minion as Minion, payload.index);
  return newPlayer;
};

const startTurnAction = (player: any) => {
  const newPlayer = new Player({ player });
  newPlayer.initTurn();
  return newPlayer;
};

export default (player: string) =>
  createReducer(
    {},
    {
      [ACTIONS(player).PLAYER_INIT_STATE]: initPlayerStateAction,
      [ACTIONS(player).PLAYER_DRAW_CARD]: drawCardAction,
      [ACTIONS(player).PLAYER_SELECT_ENTITY]: selectEntityAction,
      [ACTIONS(player).PLAYER_TAKE_DAMAGE]: takeDamageAction,
      [ACTIONS(player).PLAYER_PLAY_MINION]: playMinionAction,
      [ACTIONS(player).PLAYER_START_TURN]: startTurnAction,
    }
  );

const Actions = (player: string) => ({
  initPlayerState: createAction<InitPlayerState>(ACTIONS(player).PLAYER_INIT_STATE),
  drawCard: createAction(ACTIONS(player).PLAYER_DRAW_CARD),
  selectEntity: createAction<number | undefined>(ACTIONS(player).PLAYER_SELECT_ENTITY),
  takeDamage: createAction<TakeDamageAction>(ACTIONS(player).PLAYER_TAKE_DAMAGE),
  playMinion: createAction<PlayMinion>(ACTIONS(player).PLAYER_PLAY_MINION),
  startTurn: createAction(ACTIONS(player).PLAYER_START_TURN),
});

export const PlayerActions = Actions(PLAYER);
export const OponentActions = Actions(OPONENT);
export * from './constants';
