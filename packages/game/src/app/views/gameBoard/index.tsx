import React, { useEffect } from "react";
import { Game as GameState } from "models";
import { connect, useDispatch } from "react-redux";
import HandComponent from "./components/hand";
import './styles.css';
import Battlefield from "./components/battlefield";
import { PlayerActions } from 'store/player/playerReducer'
import { GameActions } from 'store/game/gameReducer'
import PLayer from './components/player'

interface Props {
    gameState: GameState,
    dispatch: Function
}

const GameBoardComponent = ({ dispatch, gameState }: Props) => {

    return (
        <div className="GameBoard">
            <PLayer oponent player={gameState.oponent} />
            <HandComponent oponent hand={gameState.oponent.hand} />
            <Battlefield oponent minions={gameState.oponent.battlefield} />
            <Battlefield minions={gameState.player.battlefield} />
            <HandComponent hand={gameState.player.hand} />
            <PLayer player={gameState.player} />
            <button className="Button" onClick={() => dispatch(PlayerActions.drawCard())}>drawCard</button>
        </div>
    )
}

const mapStateToProps = (state: GameState): { gameState: GameState } => ({
    gameState: state
})

export default connect(mapStateToProps)(GameBoardComponent);