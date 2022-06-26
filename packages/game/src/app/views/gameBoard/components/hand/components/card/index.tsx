import { Card as CardModel, Game } from 'models';
import { connect } from 'react-redux';
import { DEFAULT_DEPTH } from './constants';
import { ENTITY_TYPES } from 'constants/entities';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { selectActivePlayer, selectPlayer } from 'store/selectors';
import { useDrag } from 'react-dnd';
import { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import CardLayer from './layer';
import styles from './styles.module.scss';

interface Props {
  activePlayer: boolean;
  card: CardModel;
  dispatch: Function;
  money: number;
  relativePosition: number;
}

const CardContainer = ({ activePlayer, card, money, relativePosition }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const canPlayCard = activePlayer && money >= card.cost;

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    item: card,
    type: ENTITY_TYPES.CARD,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    preview(getEmptyImage());
  }, []);

  const [{ rotateZ, x, y, scale, z }, api] = useSpring(() => ({
    config: { mass: 1, tension: 350, friction: 40 },
    rotateZ: 0,
    scale: 1,
    x: 0,
    y: DEFAULT_DEPTH,
    z: DEFAULT_DEPTH,
  }));

  useEffect(() => {
    api(
      isHovered
        ? {
            scale: 1,
            y: 0,
            z: 10000000,
            rotateZ: 0,
          }
        : {
            rotateZ: relativePosition * 10,
            scale: 1,
            x: -(relativePosition * 20),
            y: DEFAULT_DEPTH + Math.abs(relativePosition ** 4),
          }
    );
  }, [isHovered, relativePosition]);

  return (
    <animated.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={canPlayCard ? drag : undefined}
      className={`${isHovered && styles.topZ}`}
      style={{ x, y, scale, rotateZ, z }}
    >
      <CardLayer canPlayCard={canPlayCard} card={card} isDragging={isDragging} />
    </animated.div>
  );
};

const mapStateToProps = (store: Game): { activePlayer: boolean; money: number } => ({
  activePlayer: selectActivePlayer(store),
  money: selectPlayer(store).currentMoney,
});

export default connect(mapStateToProps)(CardContainer);
