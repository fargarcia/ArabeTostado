import { Hand as HandModel, Card as CardModel } from 'models';
import CardComponent from './components/card';
import OponentCard from './components/oponentCard';
import styles from './styles.module.scss';
import { getRelativePosition } from './utils';

interface Props {
  hand: HandModel;
  oponent?: boolean;
}

const HandComponent = ({ hand, oponent }: Props) => {
  const { cards } = hand;
  const { length } = cards;

  const renderCard = (card: CardModel, relativePosition: number) =>
    oponent ? (
      <OponentCard key={card.id} relativePosition={relativePosition} />
    ) : (
      <CardComponent key={card.id} card={card} relativePosition={relativePosition} />
    );

  return (
    <div className={oponent ? styles.oponentHand : styles.hand}>
      {cards.map((card, index) => renderCard(card, getRelativePosition(index, length)))}
    </div>
  );
};

export default HandComponent;
