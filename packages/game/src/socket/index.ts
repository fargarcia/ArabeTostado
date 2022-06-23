import io from 'socket.io-client';
import { executeGameAction } from 'gameActions/gameActions';
import { SOCKET_EVENTS } from 'shared/socket';

const socket = io('http://localhost:5000');

const { SEND_MESSAGE, SEARCH_GAME, GAME_ACTION } = SOCKET_EVENTS;

export const searchGame = (selectedCards?: number[]) => socket.emit(SEARCH_GAME, selectedCards);
export const sendAction = (action: any) => {
  socket.emit(GAME_ACTION, action);
};
export const initializeSockets = (dispatch: Function) => {
  socket.on(SEND_MESSAGE, (message) => console.log(message));
  socket.on(GAME_ACTION, (action) => executeGameAction(dispatch, action, true));
};

export default socket;
