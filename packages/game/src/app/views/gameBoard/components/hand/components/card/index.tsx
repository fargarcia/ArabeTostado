import React from "react"
import { Card as CardModel } from "models"
import styles from './styles.module.scss'
import { selectEntity } from 'store/utils'
import { connect } from "react-redux";

interface Props {
    card: CardModel,
    dispatch: any
}

const CardComponent = ({ card, dispatch }: Props) => {
    return (
        <div className={`${styles.card} ${card.isSelected && styles.selected}`} onClick={() => selectEntity(dispatch, card.id)}>
            <div>{card.name}</div>
            <div className={styles.cost}>{card.cost}</div>
        </div>
    )
}

export default connect()(CardComponent)