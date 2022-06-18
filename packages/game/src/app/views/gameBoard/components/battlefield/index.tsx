import { Hand as HandModel, Card as CardModel, Minion as MinionModel, MinionContainer } from "models";
import React from "react";
import CardComponent from "../hand/components/card";
import OponentCard from "../hand/components/oponentCard";
import Minion from "./components/minion";
import styles from './styles.module.scss'
import SpaceBetween, { POSTION } from './components/SpaceBetween'

interface Props {
    minions: MinionContainer,
    oponent?: boolean
}

const Battlefield = ({ minions, oponent }: Props) => {
    const renderOponentMinion = (minion: MinionModel) => <Minion oponent={oponent} key={`minion:${minion.getId()}`} minion={minion} />
    const renderMinion = (minion: MinionModel, spaceBetween: boolean, index: number) => (
        <div className={styles.container}>
            <Minion oponent={oponent} key={`minion:${minion.getId()}`} minion={minion} />
            {spaceBetween && (<SpaceBetween position={POSTION.CENTER} index={index + 1} key={`spaceBetween:${index + 1}`} />)}
        </div>
    )
    return oponent ? (
        <div className={styles.battlefield}>
            {minions.getMinions().map(renderOponentMinion)}
        </div>
    ) : (
        <div className={styles.battlefield}>
            <SpaceBetween position={POSTION.LEFT} index={0} />
            {minions.getMinions().map((minion, index, array) => renderMinion(minion, index < (array.length - 1), index))}
            <SpaceBetween position={POSTION.RIGHT} index={minions.getMinions().length} />
        </div>
    )
}

export default Battlefield