import React, { useEffect } from "react"
import { Game, GameState, Minion as MinionModel } from "models"
import { connect } from "react-redux";
import { selectEntity, attackEntity } from 'redux/utils'
import styles from './styles.module.scss'
import { Entity } from "models/Entity";
import { Entities } from "constants/entities";
import { selectActiveEntity } from 'redux/selectors'

interface Props {
    activeEntity: Entity,
    minion: MinionModel,
    dispatch: any,
    oponent?: boolean
}

const Minion = ({ activeEntity, dispatch, minion, oponent }: Props) => {

    const haddleClick = () => {
        if (!oponent) selectEntity(dispatch, minion.getId())
        else if (activeEntity.type === Entities.MINION)
            attackEntity(dispatch, activeEntity as unknown as MinionModel, minion)
    }

    return (
        <div className={`${styles.minion} ${minion.isSelected && styles.selected}`} onClick={haddleClick}>
            <div>{minion.getName()}</div>
            <div className={styles.stats}>
                <div>{minion.getAttack()}</div>
                <div>{minion.getHealth()}</div>
            </div>
        </div >
    )
}

const mapStateToProps = (state: Game): { activeEntity: Entity } => ({
    activeEntity: selectActiveEntity(state)
})

export default connect(mapStateToProps)(Minion);
