import React, { useEffect } from "react";
import { Game } from "models";
import { connect } from "react-redux";
import styles from './styles.module.scss'
import { executeGameAction } from "gameActions/gameActions";
import { GAME_ACTIONS } from "shared/gameActions"
import { selectActivePlayer } from 'store/selectors'

interface Props {
    activePlayer: boolean,
    dispatch: Function
}

const EndTurnButton = ({ activePlayer, dispatch }: Props) => {

    return (
        <div
            className={activePlayer ? styles.onTurn : styles.offTurn}
            onClick={() => activePlayer && executeGameAction(dispatch, { type: GAME_ACTIONS.END_TURN })}
        >
            <div>{activePlayer ? 'Terminar turno' : 'Turno del oponente'}</div>
        </div>
    )
}

const mapStateToProps = (store: Game): { activePlayer: boolean } => ({
    activePlayer: selectActivePlayer(store)
})

export default connect(mapStateToProps)(EndTurnButton);