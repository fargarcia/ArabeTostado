import playerReducer, {PLAYER, OPONENT} from "./player/playerReducer";
import gameReducer from "./game/gameReducer";

export default {
    gameState: gameReducer,
    player: playerReducer(PLAYER),
    oponent: playerReducer(OPONENT),
};