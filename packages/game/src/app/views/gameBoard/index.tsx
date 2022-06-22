import React, { useEffect } from "react";
import { Game, Player as PlayerModel } from "models";
import { connect } from "react-redux";
import HandComponent from "./components/hand";
import Battlefield from "./components/battlefield";
import Player from './components/player'
import EndTurnButton from './components/endTurnButton'
import { selectPlayer, selectOponent } from 'store/selectors'
import styles from './styles.module.scss'
import DragLayer from './components/DragLayer'

interface Props {
    oponent: PlayerModel
    player: PlayerModel
}

const GameBoardComponent = ({ oponent, player }: Props) => {

    return (
        <div className={styles.GameBoard}>
            <DragLayer />
            {/* <HandComponent oponent hand={oponent.hand} /> */}
            <div className={styles.playersAndBattlefields}>
                <Player oponent player={oponent} />
                <Battlefield isOponent />
                <Battlefield />
                <Player player={player} />
            </div>
            {<HandComponent hand={player.hand} />}
            <EndTurnButton />
        </div>
    )
}

const mapStateToProps = (store: Game): { player: PlayerModel, oponent: PlayerModel } => ({
    player: selectPlayer(store),
    oponent: selectOponent(store)
})

export default connect(mapStateToProps)(GameBoardComponent);