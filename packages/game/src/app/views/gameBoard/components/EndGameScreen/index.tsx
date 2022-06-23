import { Game } from 'models';
import { connect } from 'react-redux';
import { winnerSelector } from 'store/selectors';
import styles from './styles.module.scss';
import { PLAYER } from 'constants/players';

interface Props {
  winner: string | undefined;
  dispatch: Function;
}

const EndGameScreen = ({ dispatch, winner }: Props) => {
  return winner ? (
    <div className={styles.container}>
      {winner === PLAYER ? (
        <div className={styles.victory}>
          <div className={styles.victoryLabel}>Victoria</div>
        </div>
      ) : (
        <div className={styles.defeat}>
          <div className={styles.vicroryLabel}>Derrota</div>
        </div>
      )}
    </div>
  ) : null;
};

const mapStateToProps = (store: Game): { winner: string | undefined } => ({
  winner: winnerSelector(store),
});

export default connect(mapStateToProps)(EndGameScreen);
