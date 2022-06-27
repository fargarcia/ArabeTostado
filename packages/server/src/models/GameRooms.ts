import { GameRoom } from './GameRoom';

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
