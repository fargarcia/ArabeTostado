import React, { useEffect, useState } from "react"
import { Card, Entity, Game, Minion } from "models"
import styles from './styles.module.scss'
import { connect } from "react-redux";
import { selectActiveEntity } from 'store/selectors'
import { ENTITY_TYPES } from "constants/entities";
import { executeGameAction } from "gameActions/gameActions";
import { GAME_ACTIONS } from "shared/gameActions"
import { useDrop } from 'react-dnd'

interface Props {
    activeEntity: Entity,
    dispatch: Function,
    index: number,
    position: string
}

const SpaceBetween = ({ activeEntity, dispatch, index, position }: Props) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "card",
        drop: (card: Card) => executeGameAction(dispatch,
            {
                type: GAME_ACTIONS.PLAY_CARD,
                payload: {
                    origin: {
                        id: card.id,
                        cost: card.cost
                    },
                    target: index
                }
            }),
        collect: (monitor: any) => ({
            isOver: !!monitor.isOver()
        })
    }))


    return (
        <div
            className={styles.noSelected}
            /* onClick={onClick} */
            ref={drop}
        >
            {/*     <div className={styles.minion}>
                {minionSelected && (
                    <div>
                        <div>{minionSelected.name}</div>
                        <div className={styles.stats}>
                            <div>{minionSelected.attack}</div>
                            <div>{minionSelected.health}</div>
                        </div>
                    </div >
                )}
            </div> */}
        </div>
    )
}

const mapStateToProps = (store: Game): { activeEntity: Entity } => ({
    activeEntity: selectActiveEntity(store)
})

export default connect(mapStateToProps)(SpaceBetween)
export * from './constants'