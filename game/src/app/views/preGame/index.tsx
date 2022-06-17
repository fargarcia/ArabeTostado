import { Hand as HandModel, Card as CardModel, Minion as MinionModel, MinionContainer } from "models";
import { playableCards } from 'constants/cards';
import styles from './styles.module.scss'
import { useEffect, useState } from "react";
import Socket from "socketConfig";

const PreGame = () => {

    const MAX_DECK_SIZE = 10;
    const [selectedCards, setSelectedCards] = useState<number[]>([])

    const searchGame = () => {
        console.log('conectado')
        Socket.emit('conectado', { message: selectedCards });
    }

    useEffect(() => {
        Socket.on('start', () => {
            console.log('start')
        });
        return () => { Socket.off() }
    });

    useEffect(() => {
        Socket.on('startTurn', () => {
            console.log('startTurn')
        });
        return () => { Socket.off() }
    });

    const doAction = () => {
        console.log('doAction')
        Socket.emit('doAction', { message: { type: 'algo', origin: 0, target: 1 } });
    }


    const onClickCard = (id: number) => selectedCards.includes(id)
        ? setSelectedCards(selectedCards.filter(cardId => cardId != id))
        : selectedCards.length < MAX_DECK_SIZE
            ? setSelectedCards(selectedCards.concat(id))
            : null

    const cardRederer = (card: CardModel) =>
        <div
            className={`${styles.card} ${selectedCards.includes(card.id) && styles.selected}`}
            onClick={() => onClickCard(card.id)}
        >
            <div>{card.name}</div>
            <div className={styles.cost}>{card.cost}</div>
        </div>

    return (
        <div className={styles.container}>
            <div>Elija las cartas para su maso</div>
            <div>{`${selectedCards.length} / ${MAX_DECK_SIZE}`}</div>
            <div className={styles.cardContainer}>
                {playableCards.map(cardRederer)}
            </div>
            <div onClick={searchGame} className={styles.button} >Buscar partida</div>
            <div onClick={doAction} className={styles.button} >Mandar accion</div>
        </div>
    )

}



export default PreGame