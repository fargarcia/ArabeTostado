import { Game } from 'models';
import { XYCoord } from 'react-dnd';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { selectActivePlayer, selectPlayer } from 'store/selectors';
import { useDragLayer } from 'react-dnd';
import { useEffect, useState } from 'react';
import { getItemStyles, renderItem, getRotation, areDistant } from './utils';
import { useSpring, animated } from 'react-spring';

const DragLayer = () => {
  const [prevPostition, setPrevPostion] = useState<XYCoord>({ x: 0, y: 0 });

  const { itemType, item, initialOffset, offset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    offset: monitor.getSourceClientOffset(),
  }));

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
    <div className={styles.layer} style={getItemStyles(initialOffset, offset)}>
      <animated.div
        style={{
          rotateX,
          rotateY,
        }}
      >
        {renderItem(itemType as string, item)}
      </animated.div>
    </div>
  );
};

const mapStateToProps = (store: Game): { activePlayer: boolean; money: number } => ({
  activePlayer: selectActivePlayer(store),
  money: selectPlayer(store).currentMoney,
});

export default connect(mapStateToProps)(DragLayer);
