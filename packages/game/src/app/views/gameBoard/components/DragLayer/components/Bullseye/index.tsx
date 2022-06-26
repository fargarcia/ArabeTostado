import { ReactComponent as BullseyeIcon } from 'assets/bullseye.svg';
import styles from './styles.module.scss';

const Bullseye = () => (
  <div className={styles.container}>
    <BullseyeIcon className={styles.bullseye} />
  </div>
);

export default Bullseye;
