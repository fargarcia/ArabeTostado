import { Card } from "./Card"

export class CardContainer {
    cards: Card[]

    public constructor(cards: Card[]) {
        this.cards = cards || []
    }

    public addCard = (card?: Card) => {
        if (card) this.cards.push(card)
    }
    public getCards = (): Card[] => this.cards
    public findById = (id: number) => this.cards.find(card => card.id === id)
    public removeCard = (removedCard: Card) =>
        this.cards.splice(this.cards.indexOf(this.cards.find(card => card.id === removedCard.id)!), 1)
    public copy = (): CardContainer => new CardContainer(this.cards.map(card => card.copy()))
    public unselect = () => this.cards.find(card => card.isSelected())?.select()
}