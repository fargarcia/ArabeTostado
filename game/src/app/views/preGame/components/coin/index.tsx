import styles from './styles.module.scss'

const Coin = () => (
  <div className={styles.coin}>
    <div className={`${styles.front} ${styles.jump}`}>
      <div className={styles.star}></div>
      <span className={styles.currency}>$</span>
      <div className={styles.shapes}>
        <div className={styles.shape_l}></div>
        <div className={styles.shape_r}></div>
        <span className={styles.top}>ARABE</span>
        <span className={styles.bottom}>TOSTADO</span>
      </div>
    </div>
    <div className={styles.shadow}></div>
  </div>
)

export default Coin
