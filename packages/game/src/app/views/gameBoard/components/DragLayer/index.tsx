import { connect } from 'react-redux';
import { Game } from 'models';
import { getItemStyles, renderItem } from './utils';
import { selectActivePlayer, selectPlayer } from 'store/selectors';
import { useDragLayer } from 'react-dnd';
import styles from './styles.module.scss';

const DragLayer = () => {
  const { itemType, item, initialOffset, offset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    offset: monitor.getSourceClientOffset(),
  }));

  return (
    <div className={styles.layer} style={getItemStyles(initialOffset, offset)}>
      {renderItem(itemType as string, item, offset || initialOffset!)}
    </div>
  );
};

const mapStateToProps = (store: Game): { activePlayer: boolean; money: number } => ({
  activePlayer: selectActivePlayer(store),
  money: selectPlayer(store).currentMoney,
});

export default connect(mapStateToProps)(DragLayer);
