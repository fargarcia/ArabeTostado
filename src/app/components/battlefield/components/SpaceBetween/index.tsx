import React, { Fragment, useEffect, useState } from "react"
import { Card, Card as CardModel, Entity, Game, Minion } from "models"
import styles from './styles.module.scss'
import { selectEntity } from 'redux/utils'
import { connect } from "react-redux";
import { selectActiveEntity } from 'redux/selectors'
import { Entities } from "constants/entities";
import { PlayerActions } from 'redux/player/playerReducer'

interface Props {
    activeEntity: Entity,
    dispatch: any,
    index: number,
    position: string
}

const SpaceBetween = ({ activeEntity, dispatch, index, position }: Props) => {
    const [minionSelected, setMinionSelected] = useState<Minion>()

    useEffect(() => {
        if ((activeEntity.type === Entities.CARD) && ((activeEntity as CardModel).getContainedType() === Entities.MINION)) {
            console.log({ activeEntity })
            setMinionSelected((activeEntity as Card).getContainedEntity() as Minion)
        }
    }, [activeEntity])

    const onClick = () => minionSelected && dispatch(PlayerActions.playMinion({ card: activeEntity, index }))

    return (
        <div className={styles[position]} onClick={onClick}>
            <div className={styles.minion}>
                {minionSelected && (
                    <div>
                        <div>{minionSelected.getName()}</div>
                        <div className={styles.stats}>
                            <div>{minionSelected.getAttack()}</div>
                            <div>{minionSelected.getHealth()}</div>
                        </div>
                    </div >
                )}
            </div>
        </div>
    )
}

const mapStateToProps = (state: Game): { activeEntity: Entity } => ({
    activeEntity: selectActiveEntity(state)
})

export default connect(mapStateToProps)(SpaceBetween)
export * from './constants'