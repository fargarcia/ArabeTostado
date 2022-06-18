interface GameRoom {
    player1: string
    player2: string
}

export class GameRooms {
    private gameRooms: GameRoom[]

    public constructor() {
        this.gameRooms = []
    }

    public addGameRoom = (newGameRoom: GameRoom) => this.gameRooms.push(newGameRoom)
    public findOponent = (player: string) => {
        const { player1, player2 } = this.gameRooms.find(gameRoom => gameRoom.player1 === player || gameRoom.player2 === player)!
        return player1 === player ? player2 : player1
    }
    public deleteGameRoom = (player: string) =>
        this.gameRooms = this.gameRooms.filter(gameRoom => gameRoom.player1 !== player || gameRoom.player2 !== player)
}