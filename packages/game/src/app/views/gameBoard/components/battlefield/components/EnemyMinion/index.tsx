import { useEffect } from "react"
import { Game, Minion, Minion as MinionModel } from "models"
import { connect } from "react-redux";
import styles from './styles.module.scss'
import { Entity } from "models/Entity";
import { ENTITY_TYPES } from "constants/entities";
import { selectActiveEntity, selectActivePlayer } from 'store/selectors'
import { executeGameAction } from "gameActions/gameActions";
import { GAME_ACTIONS } from "shared/gameActions"
import { useDrop } from "react-dnd"
import { useMutableState } from "utils/hooks"

interface Props {
    minion?: MinionModel,
    dispatch: Function
}

const EnemyMinion = ({ dispatch, minion }: Props) => {
    const [minionRef, setMinion] = useMutableState()

    useEffect(() => {
        if (minion) setMinion(minion)
    }, [minion])

    const handleDrop = (attacker: React.MutableRefObject<Minion>) =>
        executeGameAction(dispatch,
            {
                type: GAME_ACTIONS.ATTACK,
                payload: {
                    origin: {
                        id: attacker.current.id,
                        damageTaken: minionRef.current?.attack,
                        attacker: true
                    },
                    target: {
                        id: minionRef.current?.id,
                        damageTaken: attacker.current.attack
                    }
                }
            })


    const [{ isOver }, drop] = useDrop(() => ({
        accept: ENTITY_TYPES.MINION,
        drop: handleDrop,
        collect: (monitor: any) => ({
            isOver: !!monitor.isOver()
        })
    }))

    return (
        <div
            ref={drop}
            className={styles.minionContainer}
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

const mapStateToProps = (store: Game): { activeEntity: Entity, activePlayer: boolean } => ({
    activeEntity: selectActiveEntity(store),
    activePlayer: selectActivePlayer(store)
})

export default connect(mapStateToProps)(EnemyMinion);
