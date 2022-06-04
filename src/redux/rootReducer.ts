import playerReducer from "./player/playerReducer";
import gameReducer from "./game/gameReducer";
export default {
    state: gameReducer,
    player: playerReducer('PLAYER'),
    oponent: playerReducer('OPONENT'),
};