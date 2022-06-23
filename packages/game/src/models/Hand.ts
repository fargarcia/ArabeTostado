import { CardContainer } from './CardContainer';

export class Hand extends CardContainer {
  public playById = (removedCard: number) => {
    const card = this._cards.find((card) => card.id === removedCard);
    const index = card && this._cards.indexOf(card);
    if (index) this.cards.splice(index, 1);
    return card;
  };
}
