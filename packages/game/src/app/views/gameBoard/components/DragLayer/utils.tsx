import { Minion, Card } from 'models';
import { XYCoord } from 'react-dnd';
import { ENTITY_TYPES } from 'constants/entities';
import DragableCard from './components/Card';
import Bullseye from './components/Bullseye';

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

export const renderItem = (itemType: string, item: MinionRef | Card, offset: XYCoord) => {
  switch (itemType) {
    case ENTITY_TYPES.CARD:
      return <DragableCard card={item as Card} offset={offset} />;
    case ENTITY_TYPES.MINION:
      return <Bullseye />;
    default:
      return null;
  }
};
