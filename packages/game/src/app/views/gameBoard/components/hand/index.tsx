import { Hand as HandModel, Card as CardModel } from "models";
import React from "react";
import CardComponent from "./components/card";
import OponentCard from "./components/oponentCard";
import styles from './styles.module.scss'

interface Props {
    hand: HandModel,
    oponent?: boolean
}

const HandComponent = ({ hand, oponent }: Props) => {
    const renderCard = (card: CardModel) => oponent ? <OponentCard key={card.id} card={card} /> : <CardComponent key={card.id} card={card} />

    return (
        <div className={styles.hand}>
            {hand.cards.map(renderCard)}
        </div>
    )
}

export default HandComponent