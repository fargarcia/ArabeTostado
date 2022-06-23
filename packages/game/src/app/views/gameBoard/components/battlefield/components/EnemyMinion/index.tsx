import { connect } from 'react-redux';
import { ENTITY_TYPES } from 'constants/entities';
import { executeGameAction } from 'gameActions/gameActions';
import { GAME_ACTIONS } from 'shared/gameActions';
import { Game, Minion, Minion as MinionModel } from 'models';
import { selectActivePlayer } from 'store/selectors';
import { useDrop } from 'react-dnd';
import { useEffect } from 'react';
import { useMutableState } from 'utils/hooks';
import MinionLayout from '../minion/layout';

interface Props {
  dispatch: Function;
  minion?: MinionModel;
}

const EnemyMinion = ({ dispatch, minion }: Props) => {
  const [minionRef, setMinion] = useMutableState();

  useEffect(() => {
    if (minion) setMinion(minion);
  }, [minion]);

  const handleDrop = (attacker: React.MutableRefObject<Minion>) =>
    executeGameAction(dispatch, {
      type: GAME_ACTIONS.ATTACK,
      payload: {
        origin: {
          id: attacker.current.id,
          damageTaken: minionRef.current?.attack,
          attacker: true,
        },
        target: {
          id: minionRef.current?.id,
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
    <div ref={drop}>
      <MinionLayout minionRef={minionRef} />
    </div>
  );
};

const mapStateToProps = (store: Game): { activePlayer: boolean } => ({
  activePlayer: selectActivePlayer(store),
});

export default connect(mapStateToProps)(EnemyMinion);
