import { Player } from './Player';
export class GameRoom {
  player1: Player;
  player2: Player;

  constructor(player1: string, player2: string) {
    this.player1 = new Player(player1);
    this.player2 = new Player(player2);
  }

  has = (player: string) => this.player1.is(player) || this.player2.is(player);
}
