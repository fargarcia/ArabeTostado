import React, { useEffect } from "react"
import { Game, Minion as MinionModel, Player as PlayerModel } from "models"
import { connect } from "react-redux";
import { selectEntity } from 'store/utils'
import styles from './styles.module.scss'
import { Entity } from "models/Entity";
import { ENTITY_TYPES } from "constants/entities";
import { selectActiveEntity, selectOponent } from 'store/selectors'
import { executeGameAction } from "gameActions/gameActions";
import { GAME_ACTIONS } from "shared/gameActions"

interface Props {
    activeEntity: Entity
    player: PlayerModel,
    dispatch: Function,
    oponent?: boolean,
    oponentId: number
}

const Player = ({ activeEntity, dispatch, player, oponent, oponentId }: Props) => {

    const canBeTargeted = oponent && activeEntity.type === ENTITY_TYPES.MINION

    const haddleClick = () => {
        if (canBeTargeted)
            executeGameAction(dispatch,
                {
                    type: GAME_ACTIONS.ATTACK,
                    payload: {
                        origin: {
                            id: activeEntity.id,
                            damageTaken: 0,
                            attacker: true
                        },
                        target: {
                            id: oponentId,
                            damageTaken: (activeEntity as MinionModel).attack
                        }
                    }
                })
    }

    return (
        <div onClick={haddleClick} className={styles.container}>
            <div className={`
                ${styles[oponent ? 'oponent' : 'you']}
                ${canBeTargeted && styles.canBeTargeted}
            `}>
                <div>{oponent ? 'Oponente' : 'Vos'}</div>
                <div className={styles.stats}>
                    <div>{player.health}</div>
                    <div>{player.currentMoney}</div>
                </div>
            </div >
        </div >
    )
}

const mapStateToProps = (store: Game): { activeEntity: Entity, oponentId: number } => ({
    activeEntity: selectActiveEntity(store),
    oponentId: selectOponent(store).id
})

export default connect(mapStateToProps)(Player);
