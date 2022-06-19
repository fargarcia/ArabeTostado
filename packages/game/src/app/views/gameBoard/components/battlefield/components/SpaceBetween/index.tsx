import React, { Fragment, useEffect, useState } from "react"
import { Card,  Entity, Game, Minion } from "models"
import styles from './styles.module.scss'
import { selectEntity } from 'store/utils'
import { connect } from "react-redux";
import { selectActiveEntity } from 'store/selectors'
import { Entities } from "constants/entities";
import { PlayerActions } from 'store/player/playerReducer'
import { executeGameAction } from "gameActions/gameActions";
import { GAME_ACTIONS } from "shared/gameActions"


interface Props {
    activeEntity: Entity,
    dispatch: any,
    index: number,
    position: string
}

const SpaceBetween = ({ activeEntity, dispatch, index, position }: Props) => {
    const [minionSelected, setMinionSelected] = useState<Minion>()

    useEffect(() => {
        if ((activeEntity as Card)?.entity?.type === Entities.MINION)
            setMinionSelected((activeEntity as Card).entity as Minion)
        else setMinionSelected(undefined)
    }, [activeEntity])

    const onClick = () => minionSelected && executeGameAction(dispatch,
        {
            type: GAME_ACTIONS.PLAY_CARD,
            payload: { origin: activeEntity.id, target: index }
        })

    return (
        <div className={minionSelected ? styles[position] : styles.noSelected} onClick={onClick}>
            <div className={styles.minion}>
                {minionSelected && (
                    <div>
                        <div>{minionSelected.name}</div>
                        <div className={styles.stats}>
                            <div>{minionSelected.attack}</div>
                            <div>{minionSelected.health}</div>
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