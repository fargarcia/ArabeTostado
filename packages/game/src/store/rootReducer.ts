import { PLAYER, OPONENT } from 'constants/players';
import gameReducer from './game/gameReducer';
import playerReducer from './player/playerReducer';

export default {
  gameState: gameReducer,
  player: playerReducer(PLAYER),
  oponent: playerReducer(OPONENT),
};
