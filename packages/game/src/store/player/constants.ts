export const ACTIONS = (player: string) => ({
  PLAYER_DRAW_CARD: `${player}_DRAW_CARD`,
  PLAYER_INIT_STATE: `${player}_INIT_STATE`,
  PLAYER_PLAY_MINION: `${player}_PLAY_MINION`,
  PLAYER_SELECT_ENTITY: `${player}_SELECT_ENTITY`,
  PLAYER_START_TURN: `${player}_START_TURN`,
  PLAYER_TAKE_DAMAGE: `${player}_TAKE_DAMAGE`,
});

export interface InitPlayerState {
  deck: number[];
  isPlayer?: boolean;
  opener?: boolean;
}

export interface TakeDamageAction {
  attacker: boolean;
  damageTaken: number;
  id: number;
}

export interface PlayMinion {
  cost: number;
  id: number;
  index: number;
}
