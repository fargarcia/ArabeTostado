import { Card } from "./Card";
import { CardContainer } from "./CardContainer";

export class Deck extends CardContainer {
    public shuffle = () => this.cards.forEach((element, index) => {
        const rand = Math.floor(Math.random() * this.cards.length)
        this.cards[index] = this.cards[rand]
        this.cards[rand] = element
    });

    public draw = (): Card | undefined => this.cards.shift()
    public copy = (): Deck => new Deck(this.cards.map(card => card.copy()))

}
