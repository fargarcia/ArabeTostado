import React, { useEffect, useRef, useState } from "react"
import { Card, Entity, Game, Minion } from "models"
import styles from './styles.module.scss'
import { connect } from "react-redux";
import { selectActiveEntity } from 'store/selectors'
import { ENTITY_TYPES } from "constants/entities";
import { executeGameAction } from "gameActions/gameActions";
import { GAME_ACTIONS } from "shared/gameActions"
import { useDrop } from 'react-dnd'
import { POSTION } from './constants'
import { useMutableState } from "utils/hooks"

interface Props {
    dispatch: Function,
    index: number,
    position: string
}

const SpaceBetween = ({ dispatch, index, position }: Props) => {
    const [indexRef, setIndex] = useMutableState()

    useEffect(() => {
        setIndex(index)
    }, [index])

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ENTITY_TYPES.CARD,
        drop: (card: Card) => {
            executeGameAction(dispatch,
                {
                    type: GAME_ACTIONS.PLAY_CARD,
                    payload: {
                        origin: {
                            id: card.id,
                            cost: card.cost
                        },
                        target: indexRef.current
                    }
                })
        },
        collect: (monitor: any) => ({
            isOver: !!monitor.isOver()
        })
    }))

    return (
        <div
            className={`
            ${styles[position]}
            ${position === POSTION.CENTER && isOver && styles.expand}
            `}
            ref={drop}
        />

    )
}

const mapStateToProps = (store: Game): { activeEntity: Entity } => ({
    activeEntity: selectActiveEntity(store)
})

export default connect(mapStateToProps)(SpaceBetween)
export * from './constants'