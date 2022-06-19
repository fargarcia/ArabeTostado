import { Card } from "./Card"

export class CardContainer {
    protected _cards: Card[]

    constructor(cards?: Card[] | CardContainer) {
        this._cards = !cards
            ? []
            : Array.isArray(cards)
                ? cards
                : cards.cards.map(card => new Card(card))
    }

    public addCard = (card?: Card) => card && this._cards.push(card)
    public findById = (id: number) => this._cards.find(card => card.id === id)
    public removeCard = (removedCard: Card) =>
        this.cards.splice(this._cards.indexOf(
            this._cards.find(card => card.id === removedCard.id)!), 1)
    public unselect = () => this.cards.find(card => card.isSelected)?.select()

    get cards() { return this._cards }
}