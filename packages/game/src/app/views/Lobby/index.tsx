import { Card as CardModel } from 'models';
import { playableCards } from 'constants/cards';
import { searchGame } from 'socket';
import { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import Coin from './components/coin';
import styles from './styles.module.scss';
import CardLayer from '../gameBoard/components/hand/components/card/layer';
import { shuffle } from 'utils';

const Lobby = () => {
  const MAX_DECK_SIZE = 10;
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCards, setSelectedCards] = useState<number[]>([2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

  const onSearchClick = () => {
    if (selectedCards.length === 10) {
      const shuffled = shuffle(selectedCards);
      console.log(shuffled);
      searchGame(shuffled);
      setLoading(true);
    }
  };

  const onCancelClick = () => {
    searchGame();
    setLoading(false);
  };

  const onClickCard = (id: number) =>
    selectedCards.includes(id)
      ? setSelectedCards(selectedCards.filter((cardId) => cardId != id))
      : selectedCards.length < MAX_DECK_SIZE
      ? setSelectedCards(selectedCards.concat(id))
      : null;

  const cardRederer = (card: CardModel, style: any) => (
    <animated.div style={style} onClick={() => onClickCard(card.id)} key={`card:${card.id}`}>
      <CardLayer card={card} canPlayCard={selectedCards.includes(card.id)} />
    </animated.div>
  );

  const transitions = useTransition(playableCards, {
    config: { mass: 1, tension: 350, friction: 40 },
    trail: 400 / playableCards.length,
    from: { rotateZ: 0, scale: 1.5, y: -2000 },
    enter: () => ({ y: 0, scale: 1, rotateZ: (Math.random() - 0.5) * 10 }),
    delay: 200,
  });

  return !loading ? (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <div
          onClick={onSearchClick}
          className={`${styles.searchButton} ${selectedCards.length === 10 && styles.searchButtonEnabled}`}
        >
          {selectedCards.length === 10 ? (
            'Buscar Partida'
          ) : (
            <div>
              <div>Elija las cartas para su maso</div>
              <div>{`${selectedCards.length} / ${MAX_DECK_SIZE}`}</div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.cardContainer}>{transitions((style, item) => cardRederer(item, style))}</div>
    </div>
  ) : (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingLabel}>Buscando partida</div>
      <Coin />
      <div onClick={onCancelClick} className={styles.loadingLabel}>
        Cancelar
      </div>
    </div>
  );
};

export default Lobby;
