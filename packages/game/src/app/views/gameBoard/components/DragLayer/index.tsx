import { Game } from "models"
import styles from './styles.module.scss'
import { connect } from "react-redux";
import { selectActivePlayer, selectPlayer } from 'store/selectors'
import { useDragLayer } from "react-dnd"
import { useEffect } from "react";
import { getItemStyles, renderItem } from './utils'
import { useSpring, animated } from 'react-spring'

const DragLayer = () => {

    const { itemType, item, initialOffset, offset } =
        useDragLayer((monitor) => ({
            item: monitor.getItem(),
            itemType: monitor.getItemType(),
            initialOffset: monitor.getInitialSourceClientOffset(),
            offset: monitor.getSourceClientOffset()
        }))

    const [{ rotateX, rotateY }, api] = useSpring(
        () => ({
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 1,
            zoom: 0,
            x: 0,
            y: 0,
            config: { mass: 5, tension: 350, friction: 40 },
        })
    )

    useEffect(() => {
        const y = offset && initialOffset ? offset.x - initialOffset.x : 0
        const x = offset && initialOffset ? initialOffset.y - offset.y : 0
        api({
            rotateX: x / 15,
            rotateY: y / 15,
            scale: 10,
        })

    }, [offset])

    return (
        <div className={styles.layer} style={getItemStyles(initialOffset, offset)}>
            <animated.div style={{
                rotateX,
                rotateY
            }}>
                {renderItem(itemType as string, item)}
            </animated.div>

        </div>
    )
}

const mapStateToProps = (store: Game): { activePlayer: boolean, money: number } => ({
    activePlayer: selectActivePlayer(store),
    money: selectPlayer(store).currentMoney
})

export default connect(mapStateToProps)(DragLayer);
