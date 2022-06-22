import { Card, Minion } from "models"
import styles from './styles.module.scss'

interface Props {
    card: Card
    canPlayCard?: boolean
    isDragging?: boolean
}

const CardLayer = ({ card, canPlayCard, isDragging }: Props) => {

    const { attack, health } = card.entity as Minion

    return (
        <div
            className={`
            ${styles.cardContainer}
            ${canPlayCard && styles.canPlayCard}
            ${isDragging && styles.isDragging}
            `}
        >
            <div className={styles.photo}></div>
            <div className={styles.dataContainer}>
                <div className={styles.name}>{card.name}</div>
                <div className={styles.text}>Fue la mano de dios</div>
                <div className={styles.stats}>
                    {attack && (
                        <div className={styles.attack}>{attack}</div>
                    )}
                    <div className={styles.cost}>{card.cost}</div>
                    {health && (
                        <div className={styles.health}>{health}</div>
                    )}
                </div>
            </div>
        </div>
    )
}



export default CardLayer;
