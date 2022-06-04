import React, { useEffect } from "react"
import { Game, GameState, Minion as MinionModel, Player as PlayerModel } from "models"
import { connect } from "react-redux";
import { selectEntity, attackEntity } from 'redux/utils'
import styles from './styles.module.scss'
import { Entity } from "models/Entity";
import { Entities } from "constants/entities";
import { selectActiveEntity } from 'redux/selectors'

interface Props {
    player: PlayerModel,
    dispatch: any,
    oponent?: boolean
}

const Player = ({ dispatch, player, oponent }: Props) => {

    return (
        <div className={styles.container}>
            <div className={styles[oponent ? 'oponent' : 'you']} >
                <div>{oponent ? 'Oponente' : 'Vos'}</div>
                <div className={styles.stats}>
                    <div>{player.health}</div>
                    <div>{player.money}</div>
                </div>
            </div >
        </div>
    )
}

const mapStateToProps = (state: Game): { activeEntity: Entity } => ({
    activeEntity: selectActiveEntity(state)
})

export default connect(mapStateToProps)(Player);
