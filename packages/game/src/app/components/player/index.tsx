import React, { useEffect } from "react"
import { Game, GameState, Minion as MinionModel, Player as PlayerModel } from "models"
import { connect } from "react-redux";
import { selectEntity, attackEntity } from 'store/utils'
import styles from './styles.module.scss'
import { Entity } from "models/Entity";
import { Entities } from "constants/entities";
import { selectActiveEntity } from 'store/selectors'

interface Props {
    activeEntity: Entity
    player: PlayerModel,
    dispatch: any,
    oponent?: boolean,
}

const Player = ({ activeEntity, dispatch, player, oponent }: Props) => {

    const haddleClick = () => {
       /*  if (activeEntity.type === Entities.MINION)
            attackEntity(dispatch, activeEntity as unknown as MinionModel, minion) */
    }

    return (
        <div onClick={haddleClick} className={styles.container}>
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
