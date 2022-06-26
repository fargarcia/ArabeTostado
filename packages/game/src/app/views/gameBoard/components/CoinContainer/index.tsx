import { connect } from 'react-redux';
import { Game } from 'models';
import { selectPlayer } from 'store/selectors';
import { useTransition, animated } from 'react-spring';
import Coin from './components/coin';
import styles from './styles.module.scss';

interface Props {
  currentMoney: number;
}

const CoinContainer = ({ currentMoney }: Props) => {
  const transitions = useTransition(Array.from(Array(currentMoney).keys()), {
    config: { mass: 1.43, tension: 350, friction: 40 },
    trail: 200,
    from: { y: -2000 },
    enter: { y: 0 },
    leave: { y: -2000 },
    delay: 100,
  });

  return (
    <div className={styles.container}>
      {transitions((style) => (
        <animated.div style={style} className={styles.coinContainer}>
          <Coin />
        </animated.div>
      ))}
    </div>
  );
};

const mapStateToProps = (store: Game): { currentMoney: number } => ({
  currentMoney: selectPlayer(store).currentMoney,
});

export default connect(mapStateToProps)(CoinContainer);
