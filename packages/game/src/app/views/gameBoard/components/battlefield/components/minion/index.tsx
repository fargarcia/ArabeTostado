import React, { useEffect } from "react"
import { Game, Minion as MinionModel } from "models"
import { connect } from "react-redux";
import { selectEntity } from 'store/utils'
import styles from './styles.module.scss'
import { Entity } from "models/Entity";
import { ENTITY_TYPES } from "constants/entities";
import { selectActiveEntity, selectActivePlayer } from 'store/selectors'
import { executeGameAction } from "gameActions/gameActions";
import { GAME_ACTIONS } from "shared/gameActions"


interface Props {
    activeEntity: Entity,
    activePlayer: boolean,
    minion: MinionModel,
    dispatch: Function,
    oponent?: boolean
}

const Minion = ({ activeEntity, activePlayer, dispatch, minion, oponent }: Props) => {
    const canAttack = !oponent && activePlayer && minion.canAttack
    const canBeTargeted = oponent && activeEntity.type === ENTITY_TYPES.MINION

    const haddleClick = () => {
        if (canAttack) selectEntity(dispatch, minion.id)
        else if (canBeTargeted)
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
                ${canAttack && !activeEntity.id && styles.canAttack}
                ${canBeTargeted && styles.canBeTargeted}
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

const mapStateToProps = (store: Game): { activeEntity: Entity, activePlayer: boolean } => ({
    activeEntity: selectActiveEntity(store),
    activePlayer: selectActivePlayer(store)
})

export default connect(mapStateToProps)(Minion);
