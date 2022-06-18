import React, { useEffect } from "react"
import { Game, Minion as MinionModel } from "models"
import { connect } from "react-redux";
import { selectEntity, attackEntity } from 'store/utils'
import styles from './styles.module.scss'
import { Entity } from "models/Entity";
import { Entities } from "constants/entities";
import { selectActiveEntity } from 'store/selectors'

interface Props {
    activeEntity: Entity,
    minion: MinionModel,
    dispatch: any,
    oponent?: boolean
}

const Minion = ({ activeEntity, dispatch, minion, oponent }: Props) => {

    const haddleClick = () => {
        if (!oponent && !minion.hasAttacked) selectEntity(dispatch, minion.getId())
        else if (activeEntity.type === Entities.MINION)
            attackEntity(dispatch, activeEntity as unknown as MinionModel, minion)
    }

    console.log(minion)

    return (
        <div
            className={`
                ${styles.minion} 
                ${minion.selected && styles.selected} 
                ${oponent && styles.enemyMinion}
                ${!minion.hasAttacked && styles.hasNotAttacked}
            `}
            onClick={haddleClick}
        >
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
