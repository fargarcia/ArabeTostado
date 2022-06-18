
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from 'http';
import { GameRooms } from "./GameRooms";

const app = express();
app.use(cors());
const servidor = http.createServer(app);
const io = new Server(servidor, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

servidor.listen(5000, () => {
    console.log('Server listening at port %d', 5000);
});

interface Player {
    id: string
    deck: number[]
}

let waitingList: Player[] = []
const gameRooms: GameRooms = new GameRooms()

const INIT_GAME = 'initGame'

const GAME_ACTION = 'gameAction'
const CONNECT = 'connection'
// const DISCONNECT = 'disconnect'
const SEND_MESSAGE = "sendMessage"
const SEARCH_GAME = "searchGame"

io.on(CONNECT, socket => {
    const { id } = socket

    socket.emit(SEND_MESSAGE, "Conectado al servidor");

    socket.on(SEARCH_GAME, deck => {
        socket.emit(SEND_MESSAGE, 'Buscando partida');
        if (!deck) waitingList = waitingList.filter(player => player.id !== id)
        else if (waitingList.length == 0) waitingList.push({ id, deck })
        else {
            const player1 = waitingList.pop()!
            const player2 = { id, deck }
            const newGameRoom = ({ player1: player1.id, player2: id })
            const opener: boolean = !!Math.round(Math.random())
            gameRooms.addGameRoom(newGameRoom)

            socket.to(player1.id).emit(SEND_MESSAGE, "Partida encontrada");
            socket.emit(SEND_MESSAGE, "Partida encontrada");
            socket.to(player1.id).emit(GAME_ACTION, {
                type: INIT_GAME,
                payload: {
                    player: player1,
                    oponent: player2,
                    opener
                }
            })
            socket.emit(GAME_ACTION, {
                type: INIT_GAME,
                payload: {
                    player: player2,
                    oponent: player1,
                    opener: !opener
                }
            })
        }
    })
})

