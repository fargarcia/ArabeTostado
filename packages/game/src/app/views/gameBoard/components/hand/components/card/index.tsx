import { Card as CardModel, Game } from "models"
import { connect } from "react-redux";
import { selectActivePlayer, selectPlayer } from 'store/selectors'
import { useDrag } from "react-dnd"
import { ENTITY_TYPES } from "constants/entities"
import { getEmptyImage } from 'react-dnd-html5-backend'
import { useEffect } from "react";
import CardLayer from './layer'

interface Props {
    activePlayer: boolean
    card: CardModel
    dispatch: Function
    money: number
}

const CardContainer = ({ activePlayer, card, dispatch, money }: Props) => {
    const canPlayCard = activePlayer && money >= card.cost

    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ENTITY_TYPES.CARD,
        item: card,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    useEffect(() => {
        preview(getEmptyImage())
    }, [])

    return (
        <div ref={canPlayCard ? drag : undefined}>
            <CardLayer
                card={card}
                canPlayCard={canPlayCard}
                isDragging={isDragging}
            />
        </div>
    )
}

const mapStateToProps = (store: Game): { activePlayer: boolean, money: number } => ({
    activePlayer: selectActivePlayer(store),
    money: selectPlayer(store).currentMoney
})

export default connect(mapStateToProps)(CardContainer);
