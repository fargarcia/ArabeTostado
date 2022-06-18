import React, { useEffect } from 'react';
import './App.css';
import GameBoard from './components/gameBoard';
import { connect } from "react-redux";
import PreGame from './views/preGame';
import { initializeSockets } from 'socket';
import { Game, GameState, Player } from 'models';
import { isEmpty } from 'utils'

interface Props {
  dispatch: any
  player: Player
}

const App = ({ dispatch, player }: Props) => {

  useEffect(() => {
    initializeSockets(dispatch)
  }, [])

  return (
    <div className="App">
      {isEmpty(player) ? <PreGame /> : <GameBoard />}
    </div>
  )
};

const mapStateToProps = (state: Game): { player: Player } => ({
  player: state.player
})

export default connect(mapStateToProps)(App)
