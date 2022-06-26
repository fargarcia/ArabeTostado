import { connect } from 'react-redux';
import { Game, Player as PlayerModel } from 'models';
import { selectPlayer, selectOponent } from 'store/selectors';
import Battlefield from './components/battlefield';
import DragLayer from './components/DragLayer';
import EndGameScreen from './components/EndGameScreen';
import EndTurnButton from './components/endTurnButton';
import HandComponent from './components/hand';
import Player from './components/player';
import styles from './styles.module.scss';
import CoinContainer from './components/CoinContainer';

interface Props {
  oponent: PlayerModel;
  player: PlayerModel;
}

const GameBoardComponent = ({ oponent, player }: Props) => {
  return (
    <div className={styles.GameBoard}>
      <EndGameScreen />
      <DragLayer />
      <HandComponent oponent hand={oponent.hand} />
      <div className={styles.playersAndBattlefields}>
        <Player oponent player={oponent} />
        <Battlefield isOponent />
        <Battlefield />
        <Player player={player} />
      </div>
      <HandComponent hand={player.hand} />
      <CoinContainer />
      <EndTurnButton />
    </div>
  );
};

const mapStateToProps = (store: Game): { player: PlayerModel; oponent: PlayerModel } => ({
  player: selectPlayer(store),
  oponent: selectOponent(store),
});

export default connect(mapStateToProps)(GameBoardComponent);
