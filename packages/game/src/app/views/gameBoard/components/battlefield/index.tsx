import { Game, MinionContainer } from 'models';
import { selectPlayer, selectOponent } from 'store/selectors';
import Minion from './components/minion';
import EnemyMinion from './components/EnemyMinion';
import styles from './styles.module.scss';
import SpaceBetween, { POSTION } from './components/SpaceBetween';
import { useTransition, animated } from 'react-spring';
import { connect } from 'react-redux';

interface Props {
  isOponent?: boolean;
  player: MinionContainer;
  oponent: MinionContainer;
}

interface RenderProps {
  style: any;
  item: any;
  t?: any;
  i?: any;
}

const Battlefield = ({ isOponent, player, oponent }: Props) => {
  const battlefield = isOponent ? oponent : player;

  const transitions = useTransition(
    battlefield.minions.map((minion) => minion.id),
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      delay: 200,
    }
  );

  const renderOponentMinion = ({ style, item: id }: RenderProps) => (
    <animated.div style={style} key={`enemyMinion:${id}`}>
      <EnemyMinion minion={battlefield.findById(id)} />
    </animated.div>
  );

  const renderMinion = ({ style, item: id, i }: RenderProps) => (
    <animated.div style={style} className={styles.container} key={`minion:${id}`}>
      <Minion minion={battlefield.findById(id)} />
      {i < battlefield.minionsCount() - 1 && <SpaceBetween position={POSTION.CENTER} index={i + 1} />}
    </animated.div>
  );

  const minionCount = battlefield.minionsCount();

  return isOponent ? (
    <div className={styles.battlefield}>
      {transitions((style, item) => renderOponentMinion({ style, item }))}
    </div>
  ) : (
    <div className={styles.battlefield}>
      <SpaceBetween position={POSTION.BORDER} index={0} />
      {transitions((style, item, t, i) => renderMinion({ style, item, t, i }))}
      <SpaceBetween position={POSTION.BORDER} index={minionCount} />
    </div>
  );
};

const mapStateToProps = (store: Game): { player: MinionContainer; oponent: MinionContainer } => ({
  player: selectPlayer(store).battlefield,
  oponent: selectOponent(store).battlefield,
});

export default connect(mapStateToProps)(Battlefield);
