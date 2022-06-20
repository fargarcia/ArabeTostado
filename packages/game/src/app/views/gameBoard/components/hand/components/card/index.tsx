import React from "react"
import { Card as CardModel, GameState, Player, Game, Entity, Minion } from "models"
import styles from './styles.module.scss'
import { selectEntity } from 'store/utils'
import { connect } from "react-redux";
import { selectActiveEntity, selectActivePlayer, selectPlayer } from 'store/selectors'
import { useDrag } from "react-dnd"
import { ENTITY_TYPES } from "constants/entities";

interface Props {
    activeEntity: Entity
    activePlayer: boolean
    card: CardModel
    dispatch: Function
    money: number
}

const CardComponent = ({ activeEntity, activePlayer, card, dispatch, money }: Props) => {
    const canPlayCard = activePlayer && money >= card.cost

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "card",
        item: card,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    const { attack, health } = card.entity as Minion

    return (
        <div
            ref={canPlayCard ? drag : undefined}
            className={`
            ${styles.cardContainer}
            ${canPlayCard && styles.canPlayCard}
            ${isDragging && styles.isDragging}
            `}
        >
            <div className={styles.photo}></div>
            <div className={styles.dataContainer}>
                <div className={styles.name}>{card.name}</div>
                <div className={styles.text}>Fue la mano de dios</div>
                <div className={styles.stats}>
                    {attack && (
                        <div className={styles.attack}>{attack}</div>
                    )}
                    <div className={styles.cost}>{card.cost}</div>
                    {health && (
                        <div className={styles.health}>{health}</div>
                    )}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (store: Game): {
    activeEntity: Entity,
    activePlayer: boolean,
    money: number
} => ({
    activeEntity: selectActiveEntity(store),
    activePlayer: selectActivePlayer(store),
    money: selectPlayer(store).currentMoney
})

export default connect(mapStateToProps)(CardComponent);
