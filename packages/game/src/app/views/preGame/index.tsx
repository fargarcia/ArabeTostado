import { Card as CardModel } from 'models';
import { playableCards } from 'constants/cards';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { searchGame } from 'socket';
import Coin from './components/coin';

const PreGame = () => {
  const MAX_DECK_SIZE = 10;
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCards, setSelectedCards] = useState<number[]>([2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

  const onSearchClick = () => {
    searchGame(selectedCards);
    setLoading(true);
  };

  const onCancelClick = () => {
    searchGame();
    setLoading(false);
  };

  useEffect(() => {
    searchGame(selectedCards);
  }, []);

  const onClickCard = (id: number) =>
    selectedCards.includes(id)
      ? setSelectedCards(selectedCards.filter((cardId) => cardId != id))
      : selectedCards.length < MAX_DECK_SIZE
      ? setSelectedCards(selectedCards.concat(id))
      : null;

  const cardRederer = (card: CardModel) => (
    <div
      className={`${styles.card} ${selectedCards.includes(card.id) && styles.selected}`}
      onClick={() => onClickCard(card.id)}
      key={`card:${card.id}`}
    >
      <div>{card.name}</div>
      <div className={styles.cost}>{card.cost}</div>
    </div>
  );

  return !loading ? (
    <div className={styles.container}>
      <div>Elija las cartas para su maso</div>
      <div>{`${selectedCards.length} / ${MAX_DECK_SIZE}`}</div>
      <div className={styles.cardContainer}>{playableCards.map(cardRederer)}</div>
      <div onClick={onSearchClick} className={styles.button}>
        Buscar partida
      </div>
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

export default PreGame;
