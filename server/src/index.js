"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http = require("http");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const servidor = http.createServer(app);
const io = new socket_io_1.Server(servidor, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
let connectCounter = 0;
io.on("connection", (socket) => {
    socket.on("conectado", () => {
        console.log(connectCounter);
        connectCounter++;
        if (connectCounter > 1) {
            io.emit("start", { message: '' });
            socket.broadcast.emit("startTurn", {
                mensaje: '',
            });
        }
    });
    socket.on("endShift", () => {
        socket.broadcast.emit("startTurn", {
            mensaje: '',
        });
    });
});
