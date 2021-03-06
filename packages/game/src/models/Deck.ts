import { Card } from './Card';
import { CardContainer } from './CardContainer';

export class Deck extends CardContainer {
  public shuffle = () =>
    this._cards.forEach((element, index) => {
      const rand = Math.floor(Math.random() * this._cards.length);
      this._cards[index] = this._cards[rand];
      this._cards[rand] = element;
    });
  public draw = (newId: number): Card | undefined => {
    const card = this._cards.shift();
    if (card) {
      card.id = newId;
      return card;
    }
  };
}
