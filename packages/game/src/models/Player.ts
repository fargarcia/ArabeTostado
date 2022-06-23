import { Deck, Hand, MinionContainer } from './index';
import { getDeck } from 'constants/cards';
import { Entity } from './Entity';
import { ENTITY_TYPES } from 'constants/entities';

interface Props {
  cards?: number[];
  id?: number;
  maxMoney?: number;
  player?: Player;
}

export class Player extends Entity {
  private _battlefield: MinionContainer;
  private _currentId: number;
  private _currentMoney: number;
  private _deck: Deck;
  private _hand: Hand;
  private _health: number;
  private _maxMoney: number;

  constructor(props: Props) {
    super();
    const { cards, id, maxMoney, player } = props;
    this._battlefield = new MinionContainer(player?.battlefield || []);
    this._currentId = player?.currentId || this.id;
    this._currentMoney = player?.currentMoney || maxMoney || 0;
    this._deck = new Deck(player ? player.deck : cards ? getDeck(cards) : []);
    this._hand = new Hand(player?.hand || []);
    this._health = player?.health || 1;
    this._id = player?.id || id || 0;
    this._maxMoney = player?.maxMoney || maxMoney || 0;
    this._type = ENTITY_TYPES.PLAYER;
  }

  get attack() {
    return 0;
  }
  get battlefield() {
    return this._battlefield;
  }
  get currentId() {
    return this._currentId;
  }
  get currentMoney() {
    return this._currentMoney;
  }
  get deck() {
    return this._deck;
  }
  get hand() {
    return this._hand;
  }
  get health() {
    return this._health;
  }
  get maxMoney() {
    return this._maxMoney;
  }

  substractMoney = (amount: number) => (this._currentMoney -= amount);
  unselect = () => {
    this._battlefield.unselect();
    this._hand.unselect();
  };
  updateCurrentId = (): number => (this._currentId += 2);
  draw = () => this._hand.addCard(this._deck.draw(this.updateCurrentId()));
  initTurn = () => {
    this.draw();
    if (this._maxMoney < 10) this._maxMoney++;
    this._currentMoney = this._maxMoney;
    this.battlefield.enableAttack();
  };
  findById = (id: number): Entity | undefined => {
    if (id <= 2) return this;
    return this._battlefield.findById(id) || this._hand.findById(id);
  };
  takeDamage = (damage: number) => (this._health -= damage);
  isDead = (): boolean => this._health <= 0;
}
