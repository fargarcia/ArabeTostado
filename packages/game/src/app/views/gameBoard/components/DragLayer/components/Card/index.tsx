import { connect } from 'react-redux';
import { Game } from 'models';
import { Card } from 'models';
import { selectActivePlayer, selectPlayer } from 'store/selectors';
import { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { XYCoord } from 'react-dnd';
import CardLayer from '../../../hand/components/card/layer';
import { getRotation, areDistant } from './utils';

interface Props {
  card: Card;
  offset: XYCoord;
}

const DragableCard = ({ offset, card }: Props) => {
  const [prevPostition, setPrevPostion] = useState<XYCoord>({ x: 0, y: 0 });

  const [{ rotateX, rotateY }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    zoom: 0,
    x: 0,
    y: 0,
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  useEffect(() => {
    api({ ...getRotation(prevPostition, offset) });
    if (areDistant(prevPostition, offset)) setTimeout(() => setPrevPostion(offset as XYCoord), 50);
  }, [offset, prevPostition]);

  return (
    <animated.div
      style={{
        rotateX,
        rotateY,
      }}
    >
      <CardLayer card={card} />;
    </animated.div>
  );
};

const mapStateToProps = (store: Game): { activePlayer: boolean; money: number } => ({
  activePlayer: selectActivePlayer(store),
  money: selectPlayer(store).currentMoney,
});

export default connect(mapStateToProps)(DragableCard);
