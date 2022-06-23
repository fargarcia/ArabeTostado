import { PlayerActions } from './player/playerReducer';
import { GameActions } from './game/gameReducer';

export const selectEntity = (dispatch: Function, id: number) => {
  dispatch(PlayerActions.selectEntity(id));
  dispatch(GameActions.selectEntity(id));
};
