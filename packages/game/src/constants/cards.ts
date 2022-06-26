import { Card, Minion } from 'models';
import rawMinions from './minions';

export const playableMinions = rawMinions.map((rawMinion) => new Minion(rawMinion));

export const playableMinionsCards = playableMinions.map((minion) => new Card({ entity: minion }));

export const playableCards = playableMinionsCards;

const chunc = playableMinions.length / 6;

export const samples = {
  sampleMinions0: playableMinions.slice(0, chunc),
  sampleMinions1: playableMinions.slice(chunc, chunc * 2),
  sampleMinions2: playableMinions.slice(chunc * 2, chunc * 3),
  sampleMinions3: playableMinions.slice(chunc * 3, chunc * 4),
  sampleMinions4: playableMinions.slice(chunc * 4, chunc * 5),
  sampleMinions5: playableMinions.slice(chunc * 5, chunc * 6),
  sampleCards0: playableMinionsCards.slice(0, chunc),
  sampleCards1: playableMinionsCards.slice(chunc, chunc * 2),
  sampleCards2: playableMinionsCards.slice(chunc * 2, chunc * 3),
  sampleCards3: playableMinionsCards.slice(chunc * 3, chunc * 4),
  sampleCards4: playableMinionsCards.slice(chunc * 4, chunc * 5),
  sampleCards5: playableMinionsCards.slice(chunc * 5, chunc * 6),
};

export const getDeck = (ids: number[]): Card[] =>
  ids.map((id) => playableCards.find((card) => card.id === id)!);
