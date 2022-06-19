import React, { useEffect } from "react"
import { Game, Minion as MinionModel } from "models"
import { connect } from "react-redux";
import { selectEntity } from 'store/utils'
import styles from './styles.module.scss'
import { Entity } from "models/Entity";
import { Entities } from "constants/entities";
import { selectActiveEntity } from 'store/selectors'
import { executeGameAction } from "gameActions/gameActions";
import { GAME_ACTIONS } from "shared/gameActions"


interface Props {
    activeEntity: Entity,
    minion: MinionModel,
    dispatch: any,
    oponent?: boolean
}

const Minion = ({ activeEntity, dispatch, minion, oponent }: Props) => {

    const haddleClick = () => {
        if (!oponent && !minion.hasAttacked) selectEntity(dispatch, minion.id)
        else if (activeEntity.type === Entities.MINION)
            executeGameAction(dispatch,
                {
                    type: GAME_ACTIONS.ATTACK,
                    payload: {
                        origin: {
                            id: activeEntity.id,
                            damageTaken: minion.attack,
                            attacker: true
                        },
                        target: {
                            id: minion.id,
                            damageTaken: (activeEntity as MinionModel).attack
                        }
                    }
                })
    }

    return (
        <div
            className={`
                ${styles.minion} 
                ${minion.isSelected && styles.selected} 
                ${oponent && styles.enemyMinion}
                ${!minion.hasAttacked && styles.hasNotAttacked}
            `}
            onClick={haddleClick}
        >
            <div>{minion.name}</div>
            <div className={styles.stats}>
                <div>{minion.attack}</div>
                <div>{minion.health}</div>
            </div>
        </div >
    )
}

const mapStateToProps = (state: Game): { activeEntity: Entity } => ({
    activeEntity: selectActiveEntity(state)
})

export default connect(mapStateToProps)(Minion);
