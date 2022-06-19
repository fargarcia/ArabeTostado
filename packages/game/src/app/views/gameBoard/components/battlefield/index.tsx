import { Hand as HandModel, Minion as MinionModel, MinionContainer } from "models";
import React from "react";
import CardComponent from "../hand/components/card";
import OponentCard from "../hand/components/oponentCard";
import Minion from "./components/minion";
import styles from './styles.module.scss'
import SpaceBetween, { POSTION } from './components/SpaceBetween'

interface Props {
    minionContainer: MinionContainer,
    oponent?: boolean
}

const Battlefield = ({ minionContainer, oponent }: Props) => {
    const { minions } = minionContainer

    const renderOponentMinion = (minion: MinionModel) => <Minion oponent={oponent} key={`minion:${minion.id}`} minion={minion} />
    const renderMinion = (minion: MinionModel, spaceBetween: boolean, index: number) => (
        <div className={styles.container} key={`minion:${minion.id}`}>
            <Minion oponent={oponent} minion={minion} />
            {spaceBetween && (<SpaceBetween position={POSTION.CENTER} index={index + 1} key={`spaceBetween:${index + 1}`} />)}
        </div>
    )
    return oponent ? (
        <div className={styles.battlefield}>
            {minions.map(renderOponentMinion)}
        </div>
    ) : (
        <div className={styles.battlefield}>
            <SpaceBetween position={POSTION.LEFT} index={0} />
            {minions.map((minion, index, array) => renderMinion(minion, index < (array.length - 1), index))}
            <SpaceBetween position={POSTION.RIGHT} index={minions.length} />
        </div>
    )
}

export default Battlefield