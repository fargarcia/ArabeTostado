import { Card, Minion } from 'models';
import rawMinions from './minions';

export const playableMinions = rawMinions.map((rawMinion) => new Minion(rawMinion));

export const playableMinionsCards = playableMinions.map((minion) => new Card({ entity: minion }));

export const playableCards = playableMinionsCards;

export const getDeck = (ids: number[]): Card[] =>
  ids.map((id) => playableCards.find((card) => card.id === id)!);
