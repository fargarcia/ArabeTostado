import { Player } from './index';

export type Game = {
  gameState: GameState;
  oponent: Player;
  player: Player;
};

interface Props {
  activePlayer?: boolean;
  gameState?: GameState;
}

export class GameState {
  _activePlayer: boolean;
  _oponentDisconnected: boolean;

  public constructor(props: Props) {
    this._activePlayer = props.gameState?.activePlayer || props.activePlayer || false;
    this._oponentDisconnected = false;
  }

  get activePlayer() {
    return this._activePlayer;
  }
  get oponentDisconnected() {
    return this._oponentDisconnected;
  }

  oponentHasDisconnected = () => (this._oponentDisconnected = true);

  public switchActivePlayer = () => (this._activePlayer = !this._activePlayer);
}
