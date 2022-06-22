import { Game, Minion as MinionModel } from "models"
import { connect } from "react-redux";
import { ENTITY_TYPES } from "constants/entities";
import { selectActivePlayer } from 'store/selectors'
import { useDrag } from "react-dnd"
import { useEffect } from "react"
import { useMutableState } from "utils/hooks"
import { getEmptyImage } from 'react-dnd-html5-backend'
import MinionLayout from './layout'

interface Props {
    activePlayer: boolean,
    minion?: MinionModel,
}

const MinionContainer = ({ activePlayer, minion }: Props) => {
    const [minionRef, setMinion] = useMutableState()

    useEffect(() => {
        if (minion) setMinion(minion)
    }, [minion])

    const canAttack = activePlayer && minionRef.current?.canAttack
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ENTITY_TYPES.MINION,
        item: minionRef,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    useEffect(() => {
        preview(getEmptyImage())
    }, [])

    return (
        <div ref={canAttack ? drag : undefined}>
            <MinionLayout
                minionRef={minionRef}
                canAttack={canAttack}
                isDragging={isDragging}
            />
        </div>
    )
}

const mapStateToProps = (store: Game): { activePlayer: boolean } => ({
    activePlayer: selectActivePlayer(store)
})

export default connect(mapStateToProps)(MinionContainer);
