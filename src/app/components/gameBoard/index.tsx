import React, { useEffect, useState } from "react";
import { Game as GameState } from "models";
import { connect, useDispatch } from "react-redux";
import HandComponent from "../hand";
import './styles.css';
import Battlefield from "../battlefield";
import { PlayerActions } from 'redux/player/playerReducer'
import { GameActions } from 'redux/game/gameReducer'
import PLayer from '../player'
import socket from './../Socket';

interface Props {
    gameState: GameState,
    dispatch: Function,
}

const GameBoardComponent = ({ dispatch, gameState}: Props) => {
    const [name, setName] = useState('');
    const [start, setStart] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [turn, setTurn] = useState(false);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        socket.emit('conectado', {message: name});
        setLoading(true);
    };
    useEffect(()=>{
        socket.on('start', () =>{
            setStart(true)
        });
        return () => {socket.off()}
    });
    useEffect(()=>{
        socket.on('startTurn', () =>{
            setStart(true)
        });
        return () => {socket.off()}
    });
    return (
        start ?
            <div className="GameBoard">
                <PLayer oponent player={gameState.oponent} />
                <HandComponent oponent hand={gameState.oponent.hand} />
                <Battlefield oponent minions={gameState.oponent.battlefield} />
                <Battlefield minions={gameState.player.battlefield} />
                <HandComponent hand={gameState.player.hand} />
                <PLayer player={gameState.player} />
                <button className="Button" onClick={() => dispatch(PlayerActions.drawCard())}>drawCard</button>
            </div>
            :
            <div className="App">
                {loading ?
                    <div>
                        <div className="spinner"></div>
                        <h4>Esperando Oponente</h4>
                    </div>
                    :<div>
                        <input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)}/>
                        <button onClick={handleClick}>Enviar</button>
                    </div>
                }
            </div>
    )
}

const mapStateToProps = (state: GameState): { gameState: GameState } => ({
    gameState: state
})

export default connect(mapStateToProps)(GameBoardComponent);