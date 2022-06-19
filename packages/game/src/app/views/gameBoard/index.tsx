import React, { useEffect } from "react";
import { Game, Player as PlayerModel } from "models";
import { connect } from "react-redux";
import HandComponent from "./components/hand";
import './styles.css';
import Battlefield from "./components/battlefield";
import Player from './components/player'
import EndTurnButton from './components/endTurnButton'
import { selectPlayer, selectOponent } from 'store/selectors'


interface Props {
    oponent: PlayerModel
    player: PlayerModel
}

const GameBoardComponent = ({ oponent, player }: Props) => {

    return (
        <div className="GameBoard">
            <Player oponent player={oponent} />
            <HandComponent oponent hand={oponent.hand} />
            <Battlefield oponent minionContainer={oponent.battlefield} />
            <Battlefield minionContainer={player.battlefield} />
            <HandComponent hand={player.hand} />
            <Player player={player} />
            <EndTurnButton />
        </div>
    )
}

const mapStateToProps = (store: Game): { player: PlayerModel, oponent: PlayerModel } => ({
    player: selectPlayer(store),
    oponent: selectOponent(store)
})

export default connect(mapStateToProps)(GameBoardComponent);