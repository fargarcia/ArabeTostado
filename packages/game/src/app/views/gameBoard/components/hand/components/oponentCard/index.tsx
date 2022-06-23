import { Card as CardModel } from 'models';
import styles from './styles.module.scss';

interface Props {
  card: CardModel;
}

const OponentCard = ({ card }: Props) => {
  return (
    <div className={styles.card} key={card.id}>
      <div>?</div>
    </div>
  );
};

export default OponentCard;
