import { Card } from "./Card"
import { CardContainer } from "./CardContainer";

export class Hand extends CardContainer {
    public playById = (removedCard: number) => {
        const index = this._cards.indexOf(
            this._cards.find(card => card.id === removedCard)!)
        const card = this._cards[index]
        this.cards.splice(index, 1)
        return card
    }
}