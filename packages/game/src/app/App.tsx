import './App.css';
import { connect } from 'react-redux';
import { Game, GameState } from 'models';
import { initializeSockets } from 'socket';
import { isEmpty } from 'utils';
import { selectGameState } from 'store/selectors';
import { useEffect } from 'react';
import GameBoard from './views/gameBoard';
import Lobby from './views/Lobby';

interface Props {
  dispatch: Function;
  gameState: GameState;
}

const App = ({ dispatch, gameState }: Props) => {
  useEffect(() => {
    initializeSockets(dispatch);
  }, []);
  return <div className="App">{isEmpty(gameState) ? <Lobby /> : <GameBoard />}</div>;
};

const mapStateToProps = (store: Game): { gameState: GameState } => ({
  gameState: selectGameState(store),
});

export default connect(mapStateToProps)(App);
