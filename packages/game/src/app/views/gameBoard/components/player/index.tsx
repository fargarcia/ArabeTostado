import React from 'react';
import { Game, Minion, Player as PlayerModel } from 'models';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import { ENTITY_TYPES } from 'constants/entities';
import { selectOponent } from 'store/selectors';
import { executeGameAction } from 'gameActions/gameActions';
import { GAME_ACTIONS } from 'shared/gameActions';
import { useDrop } from 'react-dnd';

interface Props {
  player: PlayerModel;
  dispatch: Function;
  oponent?: boolean;
  oponentId: number;
}

const Player = ({ dispatch, player, oponentId }: Props) => {
  const handleDrop = (attacker: React.MutableRefObject<Minion>) =>
    executeGameAction(dispatch, {
      type: GAME_ACTIONS.ATTACK,
      payload: {
        origin: {
          id: attacker.current.id,
          damageTaken: 0,
          attacker: true,
        },
        target: {
          id: oponentId,
          damageTaken: attacker.current.attack,
        },
      },
    });

  const [, drop] = useDrop(() => ({
    accept: ENTITY_TYPES.MINION,
    drop: handleDrop,
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={styles.player}>
      {player.health}
    </div>
  );
};

const mapStateToProps = (store: Game): { oponentId: number } => ({
  oponentId: selectOponent(store).id,
});

export default connect(mapStateToProps)(Player);
