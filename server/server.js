//Servidor con express
const express = require("express");
const http = require("http");
const { method } = require("lodash");
const app = express();
const servidor = http.createServer(app);
const cors = require("cors");
app.use(cors());
//Inicializamos socketio
const {Server} = require("socket.io");
const io = new Server(servidor, {
    cors:{
        origin: "*",
        methods : ["GET", "POST"]
    } 
});
let connectCounter = 0;
//Funcionalidad de socket.io en el servidor
io.on("connection", (socket) => {
    socket.on("conectado", (message) => {
        console.log(connectCounter);
        connectCounter++;
        if(connectCounter>1){
            io.emit("start", { message : '' });
            socket.broadcast.emit("startTurn", {
                mensaje: '',
            });
        }
    });
    socket.on("endShift", (message) => {
        socket.broadcast.emit("startTurn", {
            mensaje: '',
        });
    });
});

servidor.listen(5000, () => console.log("Servidor inicializado"));