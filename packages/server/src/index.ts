import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import { GameRooms } from './models/GameRooms';

const app = express();
app.use(cors());
const servidor = http.createServer(app);
const io = new Server(servidor, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

servidor.listen(5000, () => {
  console.log('Server listening at port %d', 5000);
});

interface Player {
  id: string;
  deck: number[];
}

let waitingList: Player[] = [];
const gameRooms: GameRooms = new GameRooms();

/* const {
    INIT_GAME,
    GAME_ACTION,
    CONNECT,
    SEND_MESSAGE,
    SEARCH_GAME
} = SOCKET_EVENTS */

const GAME_ACTION = 'gameAction';
const SEARCH_GAME = 'searchGame';
const SEND_MESSAGE = 'sendMessage';
const INIT_GAME = 'initGame';
const CONNECT = 'connection';
const HEALTH_CHECK = 'healthCheck';
const OPONENT_DISCONNECTED = 'oponentDisconnected';

io.on(CONNECT, (socket: any) => {
  const { id } = socket;

  const heatlhCheck = () => {
    socket.emit(HEALTH_CHECK);
    if (gameRooms.hasDisconected(id)) {
      socket.to(gameRooms.findOponent(id)).emit(OPONENT_DISCONNECTED);
      socket.to(gameRooms.findOponent(id)).emit(SEND_MESSAGE, 'Tu oponente se ha desconectado');
      gameRooms.deleteGameRoom(id);
      socket.off(CONNECT, () => undefined);
    } else setTimeout(heatlhCheck, 4000);
  };

  socket.on(HEALTH_CHECK, () => gameRooms.resetTtl(id));

  socket.emit(SEND_MESSAGE, 'Conectado al servidor');
  socket.on(SEARCH_GAME, (deck: number[]) => {
    socket.emit(SEND_MESSAGE, 'Buscando partida');
    if (!deck) waitingList = waitingList.filter((player) => player.id !== id);
    else if (waitingList.length === 0) waitingList.push({ id, deck });
    else {
      const player1 = waitingList.pop()!;
      const player2 = { id, deck };
      const opener = !!Math.round(Math.random());
      gameRooms.addGameRoom(player1.id, player2.id);

      socket.to(player1.id).emit(SEND_MESSAGE, 'Partida encontrada');
      socket.emit(SEND_MESSAGE, 'Partida encontrada');
      socket.to(player1.id).emit(GAME_ACTION, {
        type: INIT_GAME,
        payload: {
          player: player1,
          oponent: player2,
          opener,
        },
      });
      socket.emit(GAME_ACTION, {
        type: INIT_GAME,
        payload: {
          player: player2,
          oponent: player1,
          opener: !opener,
        },
      });
      heatlhCheck();
    }
  });

  socket.on(GAME_ACTION, (action: any) => {
    socket.to(gameRooms.findOponent(id)).emit(GAME_ACTION, action);
  });

  socket.on("disconnect", () => {
    socket.to(gameRooms.findOponent(id)).emit(OPONENT_DISCONNECTED);
    socket.to(gameRooms.findOponent(id)).emit(SEND_MESSAGE, 'Tu oponente se ha desconectado');
    gameRooms.deleteGameRoom(id);
  });
});
