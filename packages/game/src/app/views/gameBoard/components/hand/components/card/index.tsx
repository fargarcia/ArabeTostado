import React from "react"
import { Card as CardModel, GameState, Player, Game, Entity } from "models"
import styles from './styles.module.scss'
import { selectEntity } from 'store/utils'
import { connect } from "react-redux";
import { selectActiveEntity, selectActivePlayer, selectPlayer } from 'store/selectors'

interface Props {
    activeEntity: Entity
    activePlayer: boolean
    card: CardModel
    dispatch: Function
    money: number
}

const CardComponent = ({ activeEntity, activePlayer, card, dispatch, money }: Props) => {
    const canPlayCard = activePlayer && money >= card.cost
    return (
        <div
            className={`
            ${styles.card} 
            ${canPlayCard && !activeEntity.id && styles.canBePlayed}
            ${card.isSelected && styles.selected}
            `}
            onClick={() => canPlayCard && selectEntity(dispatch, card.id)}
        >
            <div>{card.name}</div>
            <div className={styles.cost}>{card.cost}</div>
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
