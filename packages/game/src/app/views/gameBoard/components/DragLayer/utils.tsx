import { Minion, Card } from 'models';
import { XYCoord } from 'react-dnd';
import { ENTITY_TYPES } from 'constants/entities';
import CardLayer from '../hand/components/card/layer';
import MinionLayout from '../battlefield/components/minion/layout';

type MinionRef = React.MutableRefObject<Minion>;

export const getItemStyles = (initialOffset: XYCoord | null, currentOffset: XYCoord | null) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
    width: '1px',
    height: '1px',
    background: '#FF0000',
  };
};

export const renderItem = (itemType: string, item: MinionRef | Card) => {
  switch (itemType) {
    case ENTITY_TYPES.CARD:
      return <CardLayer card={item as Card} />;
    case ENTITY_TYPES.MINION:
      return <MinionLayout minionRef={item as MinionRef} />;
    default:
      return null;
  }
};

export const getRotation = (newPosition: XYCoord | null, prevPostition: XYCoord | null) => {
  const rotation = {
    rotateX: 0,
    rotateY: 0,
  };

  if (newPosition && prevPostition) {
    const rotateY = (newPosition.x - prevPostition.x) / 1.5;
    const rotateX = (newPosition.y - prevPostition.y) / 1.5;
    rotation.rotateY = rotateY > 40 ? 40 : rotateY < -40 ? -40 : rotateY;
    rotation.rotateX = rotateX > 40 ? 40 : rotateX < -40 ? -40 : rotateX;
  }
  return rotation;
};

export const areDistant = (newPosition: XYCoord | null, prevPostition: XYCoord | null) =>
  newPosition &&
  prevPostition &&
  Math.abs(newPosition.x - prevPostition.x) + Math.abs(newPosition.y - prevPostition.y) > 5;
