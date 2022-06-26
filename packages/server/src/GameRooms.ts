class Player {
  private _id: string;
  private _ttl: number;

  constructor(id: string) {
    this._id = id;
    this._ttl = 2;
  }

  get id() {
    return this._id;
  }

  reduceTtl = () => this._ttl--;
  resetTtl = () => (this._ttl = 2);
  hasTtl = (): boolean => this._ttl > 0;
  is = (id: string) => this._id === id;
}

class GameRoom {
  player1: Player;
  player2: Player;

  constructor(player1: string, player2: string) {
    this.player1 = new Player(player1);
    this.player2 = new Player(player2);
  }

  has = (player: string) => this.player1.is(player) || this.player2.is(player);
  reduceTtl = (playerId: string): boolean => {
    const player = this.player1.is(playerId) ? this.player1 : this.player2;
    player.reduceTtl();
    return !player.hasTtl();
  };
  resetTtl = (playerId: string) => {
    const player = this.player1.is(playerId) ? this.player1 : this.player2;
    player.resetTtl();
  };
}

export class GameRooms {
  private gameRooms: GameRoom[];

  constructor() {
    this.gameRooms = [];
  }

  private findGameRoom = (player: string): GameRoom | undefined =>
    this.gameRooms.find((gameRoom) => gameRoom.has(player));
  addGameRoom = (player1: string, player2: string) => this.gameRooms.push(new GameRoom(player1, player2));
  findOponent = (player: string): string | undefined => {
    const { player1, player2 } = this.findGameRoom(player) || {};
    return !player1 || !player2 ? undefined : player1.is(player) ? player2.id : player1.id;
  };
  deleteGameRoom = (player: string) =>
    (this.gameRooms = this.gameRooms.filter((gameRoom) => !gameRoom.has(player)));
  hasDisconected = (player: string): boolean => !!this.findGameRoom(player)?.reduceTtl(player);
  resetTtl = (player: string) => this.findGameRoom(player)?.resetTtl(player);
}
