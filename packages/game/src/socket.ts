import io from "socket.io-client";
import { executeGameAction } from "gameActions/gameActions";

const socket = io("http://localhost:5000");

const GAME_ACTION = 'gameAction'
const SEARCH_GAME = 'searchGame'
const SEND_MESSAGE = 'sendMessage'


export const SOCKET_EVENTS = {
    SEND_MESSAGE,
    SEARCH_GAME,
    GAME_ACTION
}

export const initializeSockets = (dispatch: any) => {
    socket.on(SEND_MESSAGE, message => console.log(message))
    socket.on(GAME_ACTION, action => executeGameAction(dispatch, action))
}

export const searchGame = (selectedCards?: number[]) => socket.emit(SEARCH_GAME, selectedCards);

export const sendAction = (action: any) => socket.emit(GAME_ACTION, action);

export default socket