import { Player } from './index';

export type Game = {
  gameState: GameState;
  player: Player;
  oponent: Player;
};

interface Props {
  activePlayer?: boolean;
  gameState?: GameState;
}

export class GameState {
  public _activePlayer: boolean;

  public constructor(props: Props) {
    this._activePlayer = props.gameState?.activePlayer || props.activePlayer || false;
  }

  get activePlayer() {
    return this._activePlayer;
  }

  public switchActivePlayer = () => (this._activePlayer = !this._activePlayer);
}
