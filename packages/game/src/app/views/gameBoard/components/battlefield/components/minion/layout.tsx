import { Minion } from "models"
import styles from './styles.module.scss'

interface Props {
    minionRef: React.MutableRefObject<Minion>
    canAttack?: boolean
    isDragging?: boolean
}

const MinionLayer = ({ minionRef, canAttack, isDragging }: Props) => {

    return (
        <div
            className={`
            ${styles.minionContainer}
            ${canAttack && styles.canPlayCard}
            ${isDragging && styles.isDragging}
            `}
        >
            <div className={styles.photo}></div>
            <div className={styles.dataContainer}>
                <div className={styles.name}>{minionRef.current?.name}</div>
                <div className={styles.stats}>
                    <div className={styles.attack}>{minionRef.current?.attack}</div>
                    <div className={styles.health}>{minionRef.current?.health}</div>
                </div>
            </div>
        </div>
    )
}


export default MinionLayer;
