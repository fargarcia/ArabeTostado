import { Game, Minion as MinionModel } from "models"
import { connect } from "react-redux";
import styles from './styles.module.scss'
import { ENTITY_TYPES } from "constants/entities";
import { selectActivePlayer } from 'store/selectors'
import { useDrag } from "react-dnd"
import { useEffect } from "react";
import { useMutableState } from "utils/hooks"

interface Props {
    activePlayer: boolean,
    minion?: MinionModel,
}

const Minion = ({ activePlayer, minion }: Props) => {
    const [minionRef, setMinion] = useMutableState()

    useEffect(() => {
        if (minion) setMinion(minion)
    }, [minion])

    const canAttack = activePlayer && minionRef.current?.canAttack
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ENTITY_TYPES.MINION,
        item: minionRef,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    return (
        <div
            ref={canAttack ? drag : undefined}
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

const mapStateToProps = (store: Game): { activePlayer: boolean } => ({
    activePlayer: selectActivePlayer(store)
})

export default connect(mapStateToProps)(Minion);
