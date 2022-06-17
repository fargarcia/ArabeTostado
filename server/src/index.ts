import express from "express";
import cors from "cors";
import {Server} from "socket.io";
const http = require("http");
const app = express();
app.use(cors());
const servidor = http.createServer(app);
const io = new Server(servidor, {
    cors:{
        origin: "*",
        methods : ["GET", "POST"]
    } 
});
let connectCounter = 0;
io.on("connection", (socket) => {
    socket.on("conectado", () => {
        console.log(connectCounter);
        connectCounter++;
        if(connectCounter>1){
            io.emit("start", { message : '' });
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
servidor.listen(5000, () => console.log("Servidor inicializado"));
//servidor.listen(5000, () => console.log("Servidor inicializado"));